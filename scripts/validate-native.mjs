import fs from 'node:fs';
import path from 'node:path';
import { root } from './api.mjs';
import { generateNative } from './native-api.mjs';
import { validateSkill, localLinks, walk } from './validate.mjs';
import { analyzeSource } from '../shared/usage-validator.mjs';

const api = generateNative();
const dir = path.join(root, 'skills/neural-native');
const errors = validateSkill(fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8'), 'neural-native');
const source = JSON.parse(fs.readFileSync(path.join(root, 'evidence/native-sources.json')));
const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json')));
if (source.package.version !== api.version || source.package.integrity !== lock.packages['node_modules/@neural-ui/native'].integrity) errors.push('Native npm provenance drift');
for (const file of walk(dir)) {
  const text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.md')) errors.push(...localLinks(file, text).map(e => `${file}: ${e}`));
  if (file.endsWith('.ts')) errors.push(...analyzeSource(text, api).errors.map(e => `${file}: ${e}`));
}
if (errors.length) throw Error(errors.join('\n'));
console.log('Native skill structure, links, npm integrity and example usage passed.');
