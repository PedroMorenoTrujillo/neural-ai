import assert from 'node:assert/strict';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { selectUpstream, verifyProducer, apiDiff } from './upstream-release-policy.mjs';

const root = resolve(import.meta.dirname, '..');
const json = file => JSON.parse(readFileSync(resolve(root, file), 'utf8'));
const write = (file, value) => writeFileSync(resolve(root, file), JSON.stringify(value, null, 2) + '\n');
const npm = args => execFileSync('npm', args, { cwd: root, stdio: 'inherit' });
const node = args => execFileSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
const pkg = json('package.json');
const beforeFramework = Object.fromEntries(Object.entries(pkg.devDependencies).filter(([name]) => /^@angular\/|^@ng-native\//.test(name)));
const definitions = {
  web: { name: '@neural-ui/core', repo: 'PedroMorenoTrujillo/neural-ui-workspace', path: 'projects/ui-core/package.json', sources: 'evidence/sources.json', api: 'evidence/api.json', skill: 'skills/neural-ui/SKILL.md' },
  native: { name: '@neural-ui/native', repo: 'PedroMorenoTrujillo/neural-native', path: 'packages/native/package.json', sources: 'evidence/native-sources.json', api: 'evidence/native-api.json', skill: 'skills/neural-native/SKILL.md' },
};
async function get(url, github = false) {
  const response = await fetch(url, { headers: github && process.env.GH_TOKEN ? { Authorization: `Bearer ${process.env.GH_TOKEN}` } : {}, signal: AbortSignal.timeout(30_000) });
  assert.ok(response.ok, `${new URL(url).pathname}: HTTP ${response.status}`);
  return response;
}
const scopes = Object.keys(definitions);
const concurrency = 4;
const metadata = await Promise.all(scopes.map(async scope => {
  const definition = definitions[scope];
  const packument = await (await get(`https://registry.npmjs.org/${encodeURIComponent(definition.name)}`)).json();
  return [scope, selectUpstream(scope, packument, pkg.devDependencies[definition.name])];
}));
const selected = Object.fromEntries(metadata);
const changed = scopes.filter(scope => selected[scope].version !== pkg.devDependencies[definitions[scope].name]);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed.length > 0}\nweb=${selected.web.version}\nnative=${selected.native.version}\n`);
console.log(`Published baselines: Web ${selected.web.version}; Native ${selected.native.version}; changed=${changed.join(',') || 'none'} (network concurrency bounded to ${concurrency})`);
if (process.argv.includes('--detect') || !changed.length) process.exit(0);
assert.ok(process.argv.includes('--apply'), 'Use --detect or --apply');
const evidence = {};
for (const scope of changed) {
  const definition = definitions[scope], target = selected[scope];
  const api = `https://api.github.com/repos/${definition.repo}`;
  let object = (await (await get(`${api}/git/ref/tags/v${target.version}`, true)).json()).object;
  for (let depth = 0; object?.type === 'tag' && depth < 4; depth++) object = (await (await get(`${api}/git/tags/${object.sha}`, true)).json()).object;
  assert.equal(object?.type, 'commit');
  const runs = await (await get(`${api}/actions/workflows/publish.yml/runs?branch=v${target.version}&event=push&status=success&per_page=20`, true)).json();
  const producer = runs.workflow_runs?.find(run => run.head_sha === object.sha);
  verifyProducer(producer, definition.repo, target.version, object.sha);
  const source = await (await get(`https://raw.githubusercontent.com/${definition.repo}/${object.sha}/${definition.path}`)).json();
  assert.equal(source.name, definition.name); assert.equal(source.version, target.version);
  const bytes = Buffer.from(await (await get(target.dist.tarball)).arrayBuffer());
  assert.equal('sha512-' + createHash('sha512').update(bytes).digest('base64'), target.dist.integrity);
  const record = json(definition.sources);
  record.package = { name: definition.name, version: target.version, tarball: target.dist.tarball, integrity: target.dist.integrity, shasum: target.dist.shasum };
  record.source.commit = object.sha;
  if (scope === 'web') record.source.version = target.version;
  record.verifiedOn = new Date().toISOString().slice(0, 10);
  record.publicationRun = String(producer.id);
  if (scope === 'web') write('evidence/upstream-policy.json', await (await get(`https://raw.githubusercontent.com/${definition.repo}/${object.sha}/projects/ui-core/public-contract.policy.json`)).json());
  evidence[scope] = { record, oldApi: json(definition.api), producer: producer.html_url };
}
npm(['install', '--save-dev', '--save-exact', '--package-lock-only', '--ignore-scripts', '--strict-peer-deps', '--no-audit', '--no-fund', ...changed.map(scope => `${definitions[scope].name}@${selected[scope].version}`)]);
npm(['ci', '--strict-peer-deps', '--no-audit', '--no-fund']);
const installed = json('package.json');
assert.deepEqual(Object.fromEntries(Object.entries(installed.devDependencies).filter(([name]) => /^@angular\/|^@ng-native\//.test(name))), beforeFramework, 'Framework versions must never be aligned automatically');
const patch = version => { const parts = version.split('.'); assert.equal(parts.length, 3); assert.match(parts[2], /^\d+$/); parts[2] = String(Number(parts[2]) + 1); return parts.join('.'); };
for (const scope of changed) {
  const definition = definitions[scope];
  const old = pkg.devDependencies[definition.name], next = selected[scope].version;
  let text = readFileSync(resolve(root, definition.skill), 'utf8');
  const oldSkill = /^  version:\s*["']([^"']+)["']\s*$/m.exec(text)?.[1];
  assert.ok(oldSkill);
  const nextSkill = patch(oldSkill);
  text = text.replace(/^  version:.*$/m, `  version: "${nextSkill}"`).replaceAll(old, next);
  writeFileSync(resolve(root, definition.skill), text);
  if (scope === 'web') npm(['version', nextSkill, '--no-git-tag-version', '--ignore-scripts']);
  write(definition.sources, evidence[scope].record);
  npm(['run', scope === 'web' ? 'api:generate' : 'api:native:generate']);
}
const mcp = json('packages/mcp/package.json');
npm(['--prefix', 'packages/mcp', 'version', patch(mcp.version), '--no-git-tag-version', '--ignore-scripts']);
node(['scripts/generate-mcp-versions.mjs']);
write('evidence/release-sync-plan.json', {
  scopes: changed, frameworkVersionsChanged: false,
  updates: Object.fromEntries(changed.map(scope => [scope, { package: definitions[scope].name, from: pkg.devDependencies[definitions[scope].name], to: selected[scope].version,
    publication: evidence[scope].producer, api: apiDiff(evidence[scope].oldApi, json(definitions[scope].api)) }])),
});
console.log('Prepared independent skill/MCP versions and verified API references. Owner review and full CI are required before publication.');
