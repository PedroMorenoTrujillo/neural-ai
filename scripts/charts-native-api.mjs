import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { inventory, root } from './api.mjs';
import { CHARTS_VERSION, NATIVE_VERSION } from './release-state.mjs';
import { localLinks, validateSkill, validateSource } from './validate.mjs';

const name = '@neural-charts/native';
const registry = 'https://registry.npmjs.org/';
const skill = join(root, 'skills/neural-charts-native');
const output = join(root, 'evidence/charts-native-api.json');
const repo = 'git+https://github.com/PedroMorenoTrujillo/neural-charts-native-library.git';
const policy = { internalEntrypoints: [], internalDeclarations: [], publicMembers: {}, publicImperativeMembers: {} };
const framework = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).devDependencies['@ng-native/components'];
// Use the locked graph of the tested native application. Resolving a new Expo
// host here lets unrelated optional web peers change between local and CI runs.
const fixture = join(root, 'tests/charts-native-consumer');
const host = JSON.parse(readFileSync(join(fixture, 'package.json'), 'utf8'));
assert.equal(host.dependencies[name], CHARTS_VERSION, 'Refresh the Charts consumer baseline');
assert.equal(host.dependencies['@neural-ui/native'], NATIVE_VERSION, 'Refresh the joint Native baseline');
for (const [name, version] of Object.entries(host.dependencies).filter(([name]) => name.startsWith('@ng-native/'))) assert.equal(version, framework, name);
const tarball = process.argv.find(argument => argument.startsWith('--tarball='))?.slice('--tarball='.length);

const temporary = mkdtempSync(join(tmpdir(), 'neural-charts-native-api-'));
try {
  copyFileSync(join(fixture, 'package.json'), join(temporary, 'package.json'));
  copyFileSync(join(fixture, 'package-lock.json'), join(temporary, 'package-lock.json'));
  if (tarball) {
    const candidate = {...host, dependencies: {...host.dependencies, [name]: 'file:' + resolve(tarball)}};
    const lock = JSON.parse(readFileSync(join(temporary, 'package-lock.json'), 'utf8'));
    lock.packages[''].dependencies = candidate.dependencies;
    delete lock.packages['node_modules/' + name];
    writeFileSync(join(temporary, 'package.json'), JSON.stringify(candidate, null, 2) + '\n');
    writeFileSync(join(temporary, 'package-lock.json'), JSON.stringify(lock, null, 2) + '\n');
  }
  execFileSync('npm', [tarball ? 'install' : 'ci', '--prefer-online', '--ignore-scripts', '--strict-peer-deps', '--no-audit', '--no-fund', '--registry=' + registry],
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
