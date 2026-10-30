import ts from 'typescript';
import { BindingType, CssSelector, DomElementSchemaRegistry, SelectorMatcher, parseTemplate } from '@angular/compiler';

// Shared by repository verification and the MCP. Parses strings only: no resolver,
// compilation, filesystem access, eval, imports of submitted code, or execution.
export function analyzeSource(text, api, filename = 'example.ts') {
  const errors = [];
  const warnings = [];
  let templatesChecked = 0;
  const source = ts.createSourceFile(filename,text,ts.ScriptTarget.Latest,true);
  for (const diagnostic of source.parseDiagnostics) errors.push(`TypeScript syntax TS${diagnostic.code}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText,' ')}`);
  const available = new Map();
  const componentNames = new Set();
  let hasFormField = false;
  const isNative = api.package === '@neural-ui/native';
  function entryFor(specifier) {
    if (!isNative && /neural.*native|neural-native/.test(specifier)) errors.push(`Neural Native import forbidden: ${specifier}`);
    if (isNative && (specifier === '@neural-ui/core' || specifier.startsWith('@neural-ui/core/'))) errors.push(`Neural Web import forbidden in Native: ${specifier}`);
    if (specifier !== api.package && !specifier.startsWith(api.package + '/')) return null;
    const entry = api.entrypoints[specifier];
    if (!entry) errors.push(`Unsupported public entrypoint: ${specifier}`);
    return entry ?? null;
  }
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const specifier = node.moduleSpecifier.text;
    const elements = node.importClause?.namedBindings?.elements ?? [];
    if (specifier==='@angular/forms/signals') hasFormField ||= elements.some(item=>(item.propertyName?.text ?? item.name.text)==='FormField');
    if (specifier==='@angular/core') for (const item of elements) if ((item.propertyName?.text ?? item.name.text)==='Component') componentNames.add(item.name.text);
    const entry = entryFor(specifier);
    if (!entry) continue;
    if (node.importClause?.name || (node.importClause?.namedBindings && !ts.isNamedImports(node.importClause.namedBindings))) errors.push(`Use explicit named Neural imports: ${specifier}`);
    for (const item of elements) {
      const name = item.propertyName?.text ?? item.name.text;
      const contract = entry.symbols.find(s=>s.name===name);
      if (!contract) errors.push(`Unknown public export: ${specifier}#${name}`);
      else available.set(item.name.text,contract);
    }
  }
  const matcher = new SelectorMatcher();
  const dom = new DomElementSchemaRegistry();
  for (const contract of available.values()) if (contract.selector) matcher.addSelectables(CssSelector.parse(contract.selector),contract);
  const nativeEvents = new Set(isNative ? [] : ['click','keydown','keyup','keypress','focus','blur','focusin','focusout','change','input','pointerdown','pointerup','mousedown','mouseup','mouseenter','mouseleave']);
  function checkElements(nodes) {
    for (const element of nodes ?? []) {
      const tag = element.name ?? element.tagName;
      if (tag) {
        if (isNative && ['div','span','button','input','textarea','select','form','section','article','h1','p'].includes(tag)) errors.push(`Web DOM element is not a native primitive: ${tag}`);
        const selector = new CssSelector();
        selector.setElement(tag);
        for (const attribute of [...(element.attributes ?? []),...(element.inputs ?? [])]) selector.addAttribute(attribute.name,typeof attribute.value==='string' ? attribute.value : '');
        const matches = [];
        matcher.match(selector,(_selector,contract)=>matches.push(contract));
        if (tag.startsWith('neu-') && !matches.length) errors.push(`Unknown or unimported Neural selector: ${tag}`);
        if (matches.length) {
          const inputs = new Set(matches.flatMap(contract=>contract.inputs.map(b=>b.alias)));
          const outputs = new Set(matches.flatMap(contract=>contract.outputs.map(b=>b.alias)));
          for (const input of element.inputs ?? []) if(input.type===BindingType.Property && !inputs.has(input.name) && !(isNative ? ['style','class'].includes(input.name) : dom.hasProperty(tag,input.name,[])) && !(hasFormField && input.name==='formField')) errors.push(`Unknown input: ${tag}.${input.name}`);
          for (const output of element.outputs ?? []) if(!outputs.has(output.name) && !nativeEvents.has(output.name.split('.')[0])) errors.push(`Unknown output: ${tag}.${output.name}`);
          const supplied = new Set([...(element.inputs??[]),...(element.attributes??[])].map(attribute=>attribute.name));
          for (const contract of matches) for (const input of contract.inputs) if(input.required && !supplied.has(input.alias)) errors.push(`Missing required input: ${tag}.${input.alias}`);
          if (['ngModel','formControl','formControlName'].some(name=>supplied.has(name))) errors.push('CVA binding on a Neural signal control');
          const models = matches.flatMap(contract=>contract.inputs.filter(input=>input.type?.includes('ModelSignal<')).map(input=>input.alias));
          if (supplied.has('formField') && models.some(name=>supplied.has(name))) errors.push('Conflicting form and model owners');
        }
      }
      checkElements(element.children);
      checkElements(element.branches);
      checkElements(element.cases);
      if(element.empty) checkElements(element.empty.children);
    }
  }
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.kind===ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
      const specifier = node.arguments[0].text;
      entryFor(specifier);
      if (specifier === api.package || specifier.startsWith(api.package + '/')) warnings.push('Dynamic Neural imports are not checked for named exports or template scope');
    }
    if (ts.isCallExpression(node) && componentNames.has(node.expression.getText(source))) {
      const object = node.arguments[0];
      const template = object?.properties?.find(p=>p.name?.getText(source)==='template')?.initializer;
      const templateUrl = object?.properties?.some(p=>p.name?.getText(source)==='templateUrl');
      if (template && (ts.isNoSubstitutionTemplateLiteral(template)||ts.isStringLiteral(template))) {
        templatesChecked++;
        const parsed = parseTemplate(template.text,filename);
        for (const error of parsed.errors ?? []) errors.push(String(error));
        checkElements(parsed.nodes);
      } else if (template || templateUrl) warnings.push('External or computed template not analyzed; provide a literal inline template or run the Angular compiler');
    }
    ts.forEachChild(node,visit);
  }
  visit(source);
  return { errors:[...new Set(errors)], warnings:[...new Set(warnings)], templatesChecked };
}

export function validateSource(text,api,filename = 'example.ts') {
  return analyzeSource(text,api,filename).errors;
}
