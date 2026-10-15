import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const packageRoot = path.join(root, 'node_modules/@neural-ui/core');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const read = file => fs.readFileSync(file, 'utf8');
const json = file => JSON.parse(read(file));
const policy = json(path.join(root, 'evidence/upstream-policy.json'));
const printer = ts.createPrinter({ removeComments: true });
const print = node => printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile()).trim();
const internal = node => ts.getJSDocTags(node).some(tag => tag.tagName.text === 'internal');
const hidden = node => internal(node) || node.modifiers?.some(m => [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword].includes(m.kind));

function bindings(node) {
  if (!node || !ts.isTypeLiteralNode(node)) return [];
  return node.members.filter(ts.isPropertySignature).map(member => {
    const name = member.name.text;
    if (ts.isLiteralTypeNode(member.type)) return { name, alias: member.type.literal.text };
    const props = new Map(member.type.members?.map(m => [m.name.text, m.type]) ?? []);
    return { name, alias: props.get('alias')?.literal?.text ?? name, required: props.get('required')?.literal?.kind === ts.SyntaxKind.TrueKeyword };
  });
}

export function inventory(dir = packageRoot) {
  const pkg = json(path.join(dir, 'package.json'));
  const entries = Object.entries(pkg.exports).filter(([key, value]) => value.types && !policy.internalEntrypoints.includes(key));
  const program = ts.createProgram(entries.map(([,value]) => path.join(dir, value.types)), { skipLibCheck: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext });
  const checker = program.getTypeChecker();
  const result = { schemaVersion: 1, package: pkg.name, version: pkg.version, entrypoints: {}, tokens: [] };
  for (const [key, value] of entries.sort(([a],[b]) => a.localeCompare(b))) {
    const source = program.getSourceFile(path.join(dir, value.types));
    const moduleSymbol = checker.getSymbolAtLocation(source);
    if (!moduleSymbol) throw Error(`Cannot inspect ${key}`);
    const symbols = [];
    for (let symbol of checker.getExportsOfModule(moduleSymbol).sort((a,b) => a.name.localeCompare(b.name))) {
      const name = symbol.name;
      if (name.startsWith('ɵ') || policy.internalDeclarations.includes(`${key}#${name}`)) continue;
      if (symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
      const declarations = (symbol.declarations ?? []).filter(d => !hidden(d));
      if (!declarations.length) continue;
      const declaration = declarations[0];
      const contract = { name, kind: ts.SyntaxKind[declaration.kind] };
      if (ts.isClassDeclaration(declaration)) {
        const meta = declaration.members.find(m => ['ɵcmp','ɵdir'].includes(m.name?.getText()));
        const args = meta?.type?.typeArguments;
        if (args) {
          contract.selector = args[1]?.literal?.text;
          contract.inputs = bindings(args[3]);
          contract.outputs = bindings(args[4]);
          for (const binding of [...contract.inputs,...contract.outputs]) {
            const member = declaration.members.find(m => m.name?.getText() === binding.name);
            binding.type = member?.type ? print(member.type) : '(generated model output)';
          }
        }
        const allowed = new Set([...(policy.publicMembers[name] ?? []), ...(policy.publicImperativeMembers[name] ?? [])]);
        contract.members = declaration.members.filter(m => !hidden(m) && allowed.has(m.name?.getText())).map(print);
      } else if (ts.isInterfaceDeclaration(declaration)) {
        const cleaned = ts.factory.updateInterfaceDeclaration(declaration, declaration.modifiers, declaration.name, declaration.typeParameters, declaration.heritageClauses, declaration.members.filter(m => !hidden(m)));
        contract.declaration = print(cleaned);
      } else {
        contract.declaration = print(declaration);
      }
      symbols.push(contract);
    }
    result.entrypoints[key === '.' ? pkg.name : pkg.name + key.slice(1)] = { types: value.types, sha256: hash(read(path.join(dir, value.types))), symbols };
  }
  result.tokens = json(path.join(dir, 'token-manifest.json')).tokens.filter(t => t.public).map(t => ({ name: t.token, category: t.category, default: t.default }));
  result.assets = Object.fromEntries(['styles.scss','styles/_tokens.scss','token-manifest.json'].map(file => [file,hash(read(path.join(dir,file)))]));
  return result;
}

export function artifacts(api) {
  const files = new Map();
  const index = [`# Public API — ${api.package}@${api.version}`, '', 'Generated from the installed npm declarations, filtered by the reviewed upstream support policy. Read only the relevant entrypoint. Angular metadata and private implementation methods are excluded.', '', '| Entrypoint | Exports |', '| --- | ---: |'];
  for (const [entry, contract] of Object.entries(api.entrypoints)) {
    const name = entry === api.package ? 'core' : entry.split('/').at(-1);
    index.push(`| [${entry}](${name}.md) | ${contract.symbols.length} |`);
    const lines = [`# ${entry}`, '', `Verified against ${api.package}@${api.version}. Generated; do not edit.`, '', 'Types below are package contracts, not complete application examples. Referenced Angular/internal declaration types do not authorize imports from internal entrypoints.', ''];
    for (const s of contract.symbols) {
      lines.push(`## ${s.name}`, '');
      if (s.selector) {
        lines.push(`Selector: \`${s.selector}\``, '', '| Input | Required | Type |', '| --- | --- | --- |');
        for (const b of s.inputs) lines.push(`| ${b.alias} | ${b.required ? 'yes' : 'no'} | \`${b.type.replaceAll('|','\\|')}\` |`);
        lines.push('', '| Output | Type |', '| --- | --- |');
        for (const b of s.outputs) lines.push(`| ${b.alias} | \`${b.type.replaceAll('|','\\|')}\` |`);
        lines.push('');
      }
      if (s.declaration) lines.push('```typescript', s.declaration, '```', '');
      if (s.members?.length) lines.push('Supported imperative members:', '', '```typescript', ...s.members, '```', '');
    }
    files.set(`skills/neural-ui/references/api/${name}.md`, lines.join('\n')+'\n');
  }
  index.push('', '[Public design tokens](tokens.md)', '');
  files.set('skills/neural-ui/references/api/index.md',index.join('\n'));
  files.set('skills/neural-ui/references/api/tokens.md', ['# Public design tokens', '', `Generated from ${api.package}@${api.version}/token-manifest.json.`, '', '| Token | Category | Default |', '| --- | --- | --- |', ...api.tokens.map(t=>`| \`${t.name}\` | ${t.category} | \`${String(t.default).replaceAll('|','\\|')}\` |`), ''].join('\n'));
  files.set('evidence/api.json',JSON.stringify(api,null,2)+'\n');
  return files;
}

export function compareApi(before, after) {
  const changes = [];
  for (const [entry, contract] of Object.entries(before.entrypoints)) {
    const next = after.entrypoints[entry];
    if (!next) { changes.push(`Removed entrypoint: ${entry}`); continue; }
    for (const symbol of contract.symbols) {
      const other = next.symbols.find(s=>s.name===symbol.name);
      if (!other) changes.push(`Removed export: ${entry}#${symbol.name}`);
      else if (JSON.stringify(symbol)!==JSON.stringify(other)) changes.push(`Changed contract: ${entry}#${symbol.name}`);
    }
    for (const symbol of next.symbols) if (!contract.symbols.some(s=>s.name===symbol.name)) changes.push(`Added export: ${entry}#${symbol.name}`);
    if (contract.sha256 !== next.sha256) changes.push(`Declaration changed: ${entry}`);
  }
  for (const entry of Object.keys(after.entrypoints)) if (!before.entrypoints[entry]) changes.push(`Added entrypoint: ${entry}`);
  return changes;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const api = inventory(process.env.NEURAL_PACKAGE_DIR ?? packageRoot);
  const expected = json(path.join(root,'package.json')).devDependencies['@neural-ui/core'];
  if (api.version !== expected) throw Error(`Expected ${expected}; got ${api.version}. Update reviewed version policy first.`);
  const files = artifacts(api);
  const generatedDir = path.join(root,'skills/neural-ui/references/api');
  const obsolete = fs.existsSync(generatedDir) ? fs.readdirSync(generatedDir).filter(file=>file.endsWith('.md') && !files.has(`skills/neural-ui/references/api/${file}`)) : [];
  if (process.argv.includes('--write')) {
    for (const file of obsolete) fs.unlinkSync(path.join(generatedDir,file));
    for (const [file,content] of files) { fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true}); fs.writeFileSync(path.join(root,file),content); }
    console.log(`Generated ${files.size} artifacts from ${Object.keys(api.entrypoints).length} supported entrypoints; ${api.tokens.length} public tokens.`);
  } else {
    const stale = [...files].filter(([file,content])=>!fs.existsSync(path.join(root,file)) || read(path.join(root,file))!==content).map(([file])=>file).concat(obsolete);
    if (stale.length) {
      if (fs.existsSync(path.join(root,'evidence/api.json'))) console.error(compareApi(json(path.join(root,'evidence/api.json')),api).join('\n'));
      throw Error(`Stale or missing generated artifacts: ${stale.join(', ')}`);
    }
    console.log(`API snapshot and ${files.size-1} generated references match installed package ${api.version}.`);
  }
}
