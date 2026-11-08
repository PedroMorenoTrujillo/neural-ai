import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { inventory, root } from './api.mjs';
import { CHARTS_VERSION } from './release-state.mjs';
import { localLinks, validateSkill, validateSource } from './validate.mjs';

const name = '@neural-charts/native';
const registry = 'https://registry.npmjs.org/';
const skill = join(root, 'skills/neural-charts-native');
const output = join(root, 'evidence/charts-native-api.json');
const repo = 'git+https://github.com/PedroMorenoTrujillo/neural-charts-native-library.git';
const policy = { internalEntrypoints: [], internalDeclarations: [], publicMembers: {}, publicImperativeMembers: {} };
const angular = '22.2.3';
const tarball = process.argv.find(argument => argument.startsWith('--tarball='))?.slice('--tarball='.length);
const args = [tarball ? resolve(tarball) : `${name}@${CHARTS_VERSION}`, ...['common', 'compiler', 'compiler-cli', 'core'].map(pkg => `@angular/${pkg}@${angular}`),
  '@ng-native/components@0.19.1', '@ng-native/platform@0.19.1', 'typescript@6.0.3'];

const temporary = mkdtempSync(join(tmpdir(), 'neural-charts-native-api-'));
try {
  writeFileSync(join(temporary, 'package.json'), '{"type":"module","private":true}\n');
  execFileSync('npm', ['install', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund', '--registry=' + registry, ...args],
    { cwd: temporary, stdio: 'pipe', timeout: 120_000 });
  const pkgDir = join(temporary, 'node_modules', name);
  const manifest = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
  assert.equal(manifest.name, name);
  assert.equal(manifest.version, CHARTS_VERSION);
  assert.equal(manifest.repository?.url, repo);
  assert.deepEqual(Object.keys(manifest.exports).sort(), ['.', './interaction', './plan']);

  const api = inventory(pkgDir, { policy, inheritedBindings: true, tokens: [], assets: {} });
  const components = api.entrypoints[name].symbols;
  assert.ok(components.some(symbol => symbol.name === 'NativeDataChart' && symbol.selector?.includes('neu-c-chart')));
  assert.ok(components.some(symbol => symbol.name === 'NativeChartTooltipTemplate' && symbol.selector === 'ng-template[neuChartTooltip]'));
  assert.ok(api.entrypoints[name + '/plan'].symbols.some(symbol => symbol.name === 'planNativeChart'));

  const entry = join(skill, 'SKILL.md');
  const entrySource = readFileSync(entry, 'utf8');
  const references = readdirSync(join(skill, 'references')).filter(file => file.endsWith('.md'));
  const errors = [...validateSkill(entrySource, 'neural-charts-native'), ...localLinks(entry, entrySource)];
  for (const file of references) {
    const path = join(skill, 'references', file);
    errors.push(...localLinks(path, readFileSync(path, 'utf8')));
  }
  const examples = readdirSync(join(skill, 'examples')).filter(file => file.endsWith('.ts')).sort();
  assert.ok(examples.length > 0);
  for (const file of examples) {
    const source = join(skill, 'examples', file);
    errors.push(...validateSource(readFileSync(source, 'utf8'), api, file).map(error => `${file}: ${error}`));
    copyFileSync(source, join(temporary, file));
  }
  assert.deepEqual(errors, [], 'Invalid Charts Native skill or examples');

  writeFileSync(join(temporary, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { target: 'ES2022', module: 'NodeNext', strict: true, skipLibCheck: true, noEmit: true },
    angularCompilerOptions: { strictTemplates: true },
    files: examples,
  }));
  execFileSync(process.execPath, [join(temporary, 'node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js'), '-p', 'tsconfig.json'],
    { cwd: temporary, stdio: 'inherit', timeout: 60_000 });

  const content = JSON.stringify(api, null, 2) + '\n';
  if (process.argv.includes('--write')) writeFileSync(output, content);
  else assert.equal(readFileSync(output, 'utf8'), content, 'Charts Native public declarations changed');
  console.log(`Charts Native ${api.version}: ${Object.keys(api.entrypoints).length} entrypoints and ${examples.length} strict Angular examples verified`);
} catch (error) {
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
