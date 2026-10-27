import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { connect, call, assertConsumer } from '../tests/mcp/helpers.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const name = 'neural-ui-mcp';
const current = process.argv.includes('--current');
const version = current ? JSON.parse(readFileSync(join(root,'packages/mcp/package.json'),'utf8')).version : '0.1.0';
const registry = 'https://registry.npmjs.org/';
const response = await fetch(`${registry}${name}/${version}?verify=${Date.now()}`, { signal: AbortSignal.timeout(15000) });
assert.equal(response.status, 200, 'Published version is not available yet; do not install the temporary staging placeholder');
const metadata = await response.json();
assert.equal(metadata.name, name);
assert.equal(metadata.version, version);
const url = new URL(metadata.dist.tarball);
assert.equal(url.origin, new URL(registry).origin);
const archiveResponse = await fetch(url, { signal: AbortSignal.timeout(30000) });
assert.equal(archiveResponse.status, 200);
const bytes = Buffer.from(await archiveResponse.arrayBuffer());
const sha256 = createHash('sha256').update(bytes).digest('hex');
const ci = JSON.parse(readFileSync(join(root, 'evidence/mcp/ci.json'), 'utf8'));
const expectedHash = current ? JSON.parse(readFileSync(join(root, `evidence/mcp/release-${version}.json`),'utf8')).sha256 : ci.localArchiveSha256;
assert.equal(sha256, expectedHash, 'Registry must serve the exact tarball authorized for publication');
assert.equal(metadata.dist.integrity, 'sha512-' + createHash('sha512').update(bytes).digest('base64'));

const consumer = mkdtempSync(join(tmpdir(), 'neural-mcp-registry-'));
let connection;
async function assertNative(client) {
  if (!current) return;
  const scope={library:'native',version:'0.1.0-beta.2'};
  assert.ok((await call(client,'list_components',{...scope})).total>0);
  assert.equal((await call(client,'get_api',{...scope,entrypoint:'@neural-ui/native/button',symbol:'NeuButtonComponent'})).contract.selector,'neu-button');
  const docs=await call(client,'search_documentation',{...scope,query:'safe area'});
  assert.ok((await client.readResource({uri:docs.results[0].uri})).contents[0].text.length>0);
  for(const id of ['forms','collections','navigation','overlays','theme']) {
    const example=await call(client,'get_example',{...scope,id});
    assert.equal((await call(client,'validate_usage',{...scope,source:example.text})).valid,true);
  }
}
try {
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true }));
  execFileSync('npm', ['install', `${name}@${version}`, '--registry=' + registry, '--ignore-scripts', '--no-audit', '--no-fund', '--cache=' + join(consumer, 'cache')], { cwd: consumer, stdio: 'pipe', timeout: 120000 });
  const lock = JSON.parse(readFileSync(join(consumer, 'package-lock.json'), 'utf8'));
  assert.equal(lock.packages['node_modules/' + name].version, version);
  assert.equal(lock.packages['node_modules/' + name].integrity, metadata.dist.integrity);
  const bin = join(consumer, 'node_modules/.bin/' + name);
  const cli = join(consumer, 'node_modules/' + name + '/dist/cli.js');
  connection = await connect(cli, { command: bin, args: [], cwd: consumer });
  await assertConsumer(connection.client);
  await assertNative(connection.client);
  assert.equal(connection.stderr(), '');
  await connection.client.close();
  connection = undefined;
  // Exercise the documented npx command with no local installation or existing cache.
  const launch = join(consumer, 'npx-only');
  mkdirSync(launch);
  connection = await connect(cli, { command: 'npx', args: ['--yes', '--registry=' + registry, '--cache=' + join(consumer, 'npx-cache'), `${name}@${version}`], cwd: launch });
  await assertConsumer(connection.client);
  await assertNative(connection.client);
  assert.equal(connection.stderr(), '');
  await connection.client.close();
  connection = undefined;
  const report = { verifiedAt: new Date().toISOString(), package: name, version,
    url: 'https://www.npmjs.com/package/' + name, registry, tarball: metadata.dist.tarball,
    sha256, integrity: metadata.dist.integrity, exactVerifiedTarball: true,
    installedFromRegistry: true, npmBin: true, npx: true, officialSdkClient: '2.3.1',
    protocol: '2026-07-28', allFiveTools: true, resources: true, stderrEmpty: true,
    publishedToNpm: true, nativeAllFiveTools: current, hostAgentSessionsTested: [] };
  mkdirSync(join(root, 'evidence/mcp'), { recursive: true });
  writeFileSync(join(root, current ? 'evidence/mcp/publication.json' : 'evidence/mcp/publication-0.1.0.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`npm ${name}@${version}: exact verified tarball, clean registry install, installed bin and npx passed`);
} finally {
  if (connection) await connection.client.close();
  rmSync(consumer, { recursive: true, force: true });
}
