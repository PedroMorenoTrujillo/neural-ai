import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { parseTemplate } from '@angular/compiler';
import { parse as parseYaml } from 'yaml';
import { root, inventory } from './api.mjs';

export function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => {
    if (['node_modules','.git','.angular','dist','.cache','test-results','playwright-report'].includes(entry.name)) return [];
    const file = path.join(dir,entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

export function validateSkill(text, directoryName = 'neural-ui') {
  const errors = [];
  const front = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!front) return ['SKILL.md requires YAML frontmatter'];
  let data;
  try { data = parseYaml(front[1], { uniqueKeys: true }); } catch(error) { return [error.message]; }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return ['Frontmatter must be a mapping'];
  const allowed = new Set(['name','description','license','compatibility','metadata','allowed-tools']);
  for (const key of Object.keys(data)) if (!allowed.has(key)) errors.push(`Unsupported portable frontmatter: ${key}`);
  if (typeof data.name !== 'string' || data.name.length>64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name) || data.name!==directoryName) errors.push('Invalid or mismatched skill name');
  if (typeof data.description!=='string' || !data.description.trim() || data.description.length>1024) errors.push('Description must contain 1..1024 characters');
  if (data.compatibility !== undefined && (typeof data.compatibility!=='string' || data.compatibility.length>500)) errors.push('Invalid compatibility');
  for (const field of ['license','allowed-tools']) if (data[field]!==undefined && typeof data[field]!=='string') errors.push(`${field} must be a string`);
  if (data.metadata!==undefined && (!data.metadata || Array.isArray(data.metadata) || typeof data.metadata!=='object' || Object.values(data.metadata).some(v=>typeof v!=='string'))) errors.push('Metadata values must be strings');
  if (!text.slice(front[0].length).trim()) errors.push('Empty skill instructions');
  if (/\b(?:TODO|TBD|PLACEHOLDER)\b/.test(text)) errors.push('Unfinished scaffold');
  if (text.split('\n').length>500) errors.push('Entrypoint exceeds progressive disclosure budget');
  return errors;
}

export function validateSource(text, api, filename = 'example.ts') {
  const errors = [];
  const source = ts.createSourceFile(filename,text,ts.ScriptTarget.Latest,true);
  const available = new Map();
  let hasFormField = false;
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const specifier = node.moduleSpecifier.text;
    if (/neural.*native|neural-native/.test(specifier)) errors.push(`Neural Native import forbidden: ${specifier}`);
    if (specifier==='@angular/forms/signals') hasFormField = !!node.importClause?.namedBindings?.elements?.some(x=>x.name.text==='FormField') || hasFormField;
    if (!specifier.startsWith('@neural-ui/core')) continue;
    const entry = api.entrypoints[specifier];
    if (!entry) { errors.push(`Unsupported public entrypoint: ${specifier}`); continue; }
    if (node.importClause?.name || (node.importClause?.namedBindings && !ts.isNamedImports(node.importClause.namedBindings))) errors.push(`Use explicit named Neural imports: ${specifier}`);
    for (const item of node.importClause?.namedBindings?.elements ?? []) {
      const name = item.propertyName?.text ?? item.name.text;
      const contract = entry.symbols.find(s=>s.name===name);
      if (!contract) errors.push(`Unknown public export: ${specifier}#${name}`);
      else available.set(item.name.text, contract);
    }
  }
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(source)==='Component') {
      const object = node.arguments[0];
      const template = object?.properties?.find(p=>p.name?.getText(source)==='template')?.initializer;
      if (template && (ts.isNoSubstitutionTemplateLiteral(template)||ts.isStringLiteral(template))) {
        const parsed = parseTemplate(template.text,filename);
        for (const error of parsed.errors ?? []) errors.push(String(error));
        function elements(nodes) {
          for (const element of nodes ?? []) {
            if (element.name?.startsWith('neu-')) {
              const contract = [...available.values()].find(s=>s.selector===element.name);
              if (!contract) errors.push(`Unknown or unimported Neural selector: ${element.name}`);
              else {
                const inputs = new Set(contract.inputs.map(b=>b.alias));
                const outputs = new Set(contract.outputs.map(b=>b.alias));
                for (const input of element.inputs ?? []) if (!inputs.has(input.name) && !(hasFormField && input.name==='formField') && !['class','style','attribute'].includes(String(input.type).toLowerCase()) && !/^(aria-|data-)/.test(input.name)) errors.push(`Unknown input: ${element.name}.${input.name}`);
                for (const output of element.outputs ?? []) if (!outputs.has(output.name) && !['click','keydown','focus','blur','change','input'].includes(output.name)) errors.push(`Unknown output: ${element.name}.${output.name}`);
                const supplied = new Set([...(element.inputs??[]),...(element.attributes??[])].map(x=>x.name));
                for (const input of contract.inputs) if(input.required && !supplied.has(input.alias)) errors.push(`Missing required input: ${element.name}.${input.alias}`);
                if ((element.inputs??[]).some(x=>['ngModel','formControl','formControlName'].includes(x.name))) errors.push('CVA binding on a Neural signal control');
                if (supplied.has('formField') && supplied.has('value')) errors.push('Conflicting form and model owners');
              }
            }
            elements(element.children); elements(element.branches);
          }
        }
        elements(parsed.nodes);
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(source);
  return errors;
}

export function localLinks(file, text) {
  const errors = [];
  for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const link = match[1];
    if (/^(?:https?:|mailto:)/.test(link)) continue;
    const [pathname, fragment] = link.split('#');
    const target = pathname ? path.resolve(path.dirname(file),decodeURIComponent(pathname)) : file;
    if (!fs.existsSync(target)) { errors.push(`Broken local link: ${link}`); continue; }
    if (fragment && target.endsWith('.md')) {
      const headings = fs.readFileSync(target,'utf8').split('\n').filter(l=>/^#+ /.test(l)).map(l=>l.replace(/^#+ /,'').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-'));
      if (!headings.includes(fragment)) errors.push(`Broken local anchor: ${link}`);
    }
  }
  return errors;
}

export function validateAuthored(text, version, knownTokens) {
  const errors = [];
  for (const match of text.matchAll(/@neural-ui\/core@(?:[~^])?(\d+\.\d+\.\d+)/g)) if(match[1]!==version) errors.push(`Stale package version ${match[1]}`);
  if (/https?:\/\/ui\.neuralui\.org\/(?!v2\/)/.test(text)) errors.push('Unversioned or v1 documentation URL');
  for (const match of text.matchAll(/--neu-[a-z0-9-]+/g)) if(!knownTokens.has(match[0])) errors.push(`Unknown public token ${match[0]}`);
  return errors;
}

export function validateRepository() {
  const api = inventory();
  const errors = [];
  const skillDir = path.join(root,'skills/neural-ui');
  const skill = fs.readFileSync(path.join(skillDir,'SKILL.md'),'utf8');
  errors.push(...validateSkill(skill));
  const version = JSON.parse(fs.readFileSync(path.join(root,'package.json'))).devDependencies['@neural-ui/core'];
  const sources = JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json')));
  const lock = JSON.parse(fs.readFileSync(path.join(root,'package-lock.json')));
  if (sources.package.version!==version || api.version!==version || !skill.includes(`neural-ui-version: "${version}"`)) errors.push('Version metadata drift');
  const releaseVersion = JSON.parse(fs.readFileSync(path.join(root,'package.json'))).version;
  const metadata = parseYaml(/^---\r?\n([\s\S]*?)\r?\n---/.exec(skill)?.[1] ?? '')?.metadata;
  if(metadata?.version!==releaseVersion) errors.push('Skill release version differs from package.json');
  if (lock.packages['node_modules/@neural-ui/core'].integrity!==sources.package.integrity) errors.push('npm integrity differs from reviewed package');
  const config = ts.readConfigFile(path.join(root,'tests/integration/tsconfig.json'),ts.sys.readFile).config;
  if(config?.compilerOptions?.strict!==true || config?.angularCompilerOptions?.strictTemplates!==true) errors.push('Integration fixture must retain explicit strict TypeScript and Angular template checks');
  const knownTokens = new Set(api.tokens.map(t=>t.name));
  for (const file of walk(root)) {
    if (!/\.(md|ts|scss)$/.test(file)) continue;
    const text = fs.readFileSync(file,'utf8');
    if (file.endsWith('.md')) errors.push(...localLinks(file,text).map(e=>`${path.relative(root,file)}: ${e}`));
    if (file.endsWith('.ts') && (file.includes('/examples/')||file.includes('/integration/src/'))) errors.push(...validateSource(text,api,file).map(e=>`${path.relative(root,file)}: ${e}`));
    if (file.startsWith(skillDir) && !file.includes('/api/')) {
      errors.push(...validateAuthored(text,version,knownTokens).map(error=>`${file}: ${error}`));
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const errors = validateRepository();
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Portable skill structure, versions, integrity, local links, public imports, selectors, bindings and tokens passed.');
}
