import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { inventory, artifacts, root } from './api.mjs';

const dir = path.join(root, 'node_modules/@neural-ui/native');
const read = file => fs.readFileSync(file, 'utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const policy = { internalEntrypoints: [], internalDeclarations: [], publicMembers: {
  NeuThemeComponent: ['resolvedTokens'], NeuModalComponent: ['close'],
  NeuBottomSheetComponent: ['close'], NeuImageViewerComponent: ['close'],
  NeuStepperComponent: ['goTo'], NeuVirtualListComponent: ['scrollToIndex', 'scrollToTop'],
}, publicImperativeMembers: {} };

// Interpret only package-authored literal token objects, never execute package code.
export function tokenDefaults(source) {
  const file = ts.createSourceFile('tokens.js', source, ts.ScriptTarget.Latest, true);
  const objects = {};
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const name = declaration.name.getText(file);
      if (!['NEU_LIGHT_TOKENS', 'NEU_DARK_TOKENS'].includes(name)) continue;
      const init = declaration.initializer;
      if (!ts.isCallExpression(init) || init.expression.getText(file) !== 'Object.freeze' || !ts.isObjectLiteralExpression(init.arguments[0])) throw Error('Unsupported token declaration');
      const values = {};
      for (const member of init.arguments[0].properties) {
        if (ts.isSpreadAssignment(member) && ts.isIdentifier(member.expression) && objects[member.expression.text]) Object.assign(values, objects[member.expression.text]);
        else if (ts.isPropertyAssignment(member) && (ts.isStringLiteral(member.initializer) || ts.isNumericLiteral(member.initializer))) values[member.name.getText(file)] = ts.isNumericLiteral(member.initializer) ? Number(member.initializer.text) : member.initializer.text;
        else throw Error('Nonliteral token value requires review');
      }
      objects[name] = values;
    }
  }
  return objects;
}

export function nativeInventory() {
  const pkg = JSON.parse(read(path.join(dir, 'package.json')));
  if (pkg.version !== '0.1.0-beta.2') throw Error('Review the Native version before regenerating');
  const defaults = tokenDefaults(read(path.join(dir, 'dist/foundation/index.js')));
  const assets = Object.fromEntries(['dist/foundation/index.js', 'dist/foundation/index.d.ts'].map(file => [file, hash(read(path.join(dir, file)))]));
  const api = inventory(dir, { policy, inheritedBindings: true, tokens: [], assets });
  const declaration = api.entrypoints['@neural-ui/native/foundation'].symbols.find(s => s.name === 'NeuTokens').declaration;
  const file = ts.createSourceFile('tokens.d.ts', declaration, ts.ScriptTarget.Latest, true);
  api.tokens = file.statements[0].members.map(member => {
    const name = member.name.getText(file);
    return { name, type: member.type.getText(file), optional: Boolean(member.questionToken), category: 'theme',
      default: defaults.NEU_LIGHT_TOKENS[name] ?? 'resolved from theme surfaces',
      darkDefault: defaults.NEU_DARK_TOKENS[name] ?? 'resolved from theme surfaces' };
  });
  return api;
}

export function generateNative(write = false) {
  const api = nativeInventory();
  const files = artifacts(api, { skill: 'neural-native', evidence: 'evidence/native-api.json', tokenSource: 'dist/foundation (NeuTokens and literal defaults)' });
  files.set('skills/neural-native/references/api/tokens.md', [
    '# Native theme tokens', '', `Generated from ${api.package}@${api.version}, NeuTokens and the literal light/dark defaults.`,
    'Apply typed overrides through neu-theme. Optional semantic inks resolve from surfaces when not supplied; these are not the Web v2 CSS token catalogue.', '',
    '| Token | Type | Optional | Light default | Dark default |', '| --- | --- | --- | --- | --- |',
    ...api.tokens.map(t => `| \`${t.name}\` | \`${t.type.replaceAll('|','\\|')}\` | ${t.optional ? 'yes' : 'no'} | \`${t.default}\` | \`${t.darkDefault}\` |`), '',
  ].join('\n'));
  for (const [file, text] of files) if (file.endsWith('.md')) files.set(file, text.trimEnd() + '\n');
  const stale = [];
  for (const [file, text] of files) {
    const target = path.join(root, file);
    if (write) { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); }
    else if (!fs.existsSync(target) || read(target) !== text) stale.push(file);
  }
  const generated = path.join(root, 'skills/neural-native/references/api');
  if (fs.existsSync(generated)) for (const name of fs.readdirSync(generated)) {
    const relative = `skills/neural-native/references/api/${name}`;
    if (name.endsWith('.md') && !files.has(relative)) {
      if (write) fs.unlinkSync(path.join(generated,name)); else stale.push(relative);
    }
  }
  if (stale.length) throw Error(`Native API reference drift: ${stale.join(', ')}`);
  console.log(`Native ${write ? 'generated' : 'verified'}: ${Object.keys(api.entrypoints).length} entrypoints, ${api.tokens.length} theme tokens; inherited inputs and outputs included.`);
  return api;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateNative(process.argv.includes('--write'));
