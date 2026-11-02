import test from 'node:test';
import assert from 'node:assert/strict';
import { selectUpstream, verifyProducer, compareVersions, apiDiff } from '../scripts/upstream-release-policy.mjs';

const owner = 'PedroMorenoTrujillo';
function pack(name, versions, tags) {
  const short = name.split('/')[1];
  return { name, 'dist-tags': tags, versions: Object.fromEntries(versions.map(version => [version, {
    name, version, dist: { integrity: 'sha512-' + Buffer.alloc(64).toString('base64'), tarball: `https://registry.npmjs.org/@neural-ui/${short}/-/${short}-${version}.tgz` },
  }])) };
}
test('the Web skill selects stable v2, never npm latest v1/v3 or Native', () => {
  const source = pack('@neural-ui/core', ['1.99.0', '2.0.4', '2.0.10', '2.1.0-next.1', '3.0.0'], { latest: '3.0.0' });
  assert.equal(selectUpstream('web', source, '2.0.4').version, '2.0.10');
  assert.throws(() => selectUpstream('web', source, '1.15.2'));
  assert.throws(() => selectUpstream('web', { ...source, name: '@neural-ui/native' }, '2.0.4'));
});
test('Native follows its active beta channel and can progress to stable without switching frameworks', () => {
  const source = pack('@neural-ui/native', ['0.1.0-beta.5', '0.1.0-beta.6', '0.1.0'], { latest: '0.1.0-beta.5', beta: '0.1.0-beta.6' });
  assert.equal(selectUpstream('native', source, '0.1.0-beta.5').version, '0.1.0-beta.6');
  source['dist-tags'].latest = '0.1.0';
  assert.equal(selectUpstream('native', source, '0.1.0-beta.5').version, '0.1.0');
});
test('neither a stale channel nor a deprecated release can cause a downgrade', () => {
  const source = pack('@neural-ui/native', ['0.1.0-beta.4', '0.1.0-beta.5', '0.1.0-beta.6'], { latest: '0.1.0-beta.4', beta: '0.1.0-beta.6' });
  source.versions['0.1.0-beta.6'].deprecated = 'withdrawn';
  assert.equal(selectUpstream('native', source, '0.1.0-beta.5').version, '0.1.0-beta.5');
  assert.equal(compareVersions('0.1.0-beta.10', '0.1.0-beta.9'), 1);
});
test('only a successful owner-triggered official producer can update a baseline', () => {
  const repo = owner + '/neural-ui-workspace';
  const run = { repository: { full_name: repo }, event: 'push', status: 'completed', conclusion: 'success', path: '.github/workflows/publish.yml', head_branch: 'v2.0.5', head_sha: 'a'.repeat(40), actor: { login: owner }, triggering_actor: { login: owner } };
  verifyProducer(run, repo, '2.0.5', 'a'.repeat(40));
  for (const change of [{ conclusion: 'failure' }, { event: 'pull_request' }, { actor: { login: 'outsider' } }, { triggering_actor: { login: 'outsider' } }, { path: '.github/workflows/unrelated.yml' }, { repository: { full_name: 'fork/neural-ui-workspace' } }, { head_sha: 'b'.repeat(40) }]) assert.throws(() => verifyProducer({ ...run, ...change }, repo, '2.0.5', 'a'.repeat(40)));
});
test('API reports distinguish added optional bindings from removals and new required inputs', () => {
  const old = { package: '@neural-ui/core', entrypoints: { '@neural-ui/core/button': { symbols: [{ name: 'Button', kind: 'ClassDeclaration', selector: 'button[neu-button]', inputs: [{ name: 'size', alias: 'size', required: false, type: 'Size' }], outputs: [], members: [] }] } } };
  const next = structuredClone(old);
  next.entrypoints['@neural-ui/core/button'].symbols[0].inputs.push({ name: 'label', alias: 'label', required: false, type: 'string' });
  assert.deepEqual(apiDiff(old, next).breaking, []);
  next.entrypoints['@neural-ui/core/button'].symbols[0].inputs[1].required = true;
  assert.ok(apiDiff(old, next).breaking.some(value => value.includes('required')));
  delete next.entrypoints['@neural-ui/core/button'];
  assert.ok(apiDiff(old, next).breaking.some(value => value.includes('Removed entrypoint')));
});
