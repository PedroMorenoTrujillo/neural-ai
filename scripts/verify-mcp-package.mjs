import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { connect, call, assertConsumer } from '../tests/mcp/helpers.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const target = join(root, 'dist/mcp');
mkdirSync(target, { recursive: true });
// Pack never rebuilds silently: verify expected generated files before packing.
assert.ok(readFileSync(join(root, 'packages/mcp/dist/cli.js'), 'utf8').startsWith('#!/usr/bin/env node'));
const [packed] = JSON.parse(execFileSync('npm', ['pack', './packages/mcp', '--json', '--pack-destination', target, '--ignore-scripts'], { cwd: root, encoding: 'utf8' }));
assert.equal(packed.name, 'neural-ui-mcp');
for (const file of packed.files) {
  assert.ok(/^(dist\/|data\/|README\.md$|LICENSE$|package\.json$)/.test(file.path), `Unexpected packed file: ${file.path}`);
  assert.ok(!/node_modules|\.env|package-lock/.test(file.path));
}
for (const path of ['dist/cli.js', 'dist/server.js', 'dist/server.d.ts', 'dist/usage-validator.mjs', 'data/catalog.json', 'data/sha256', 'data/native-catalog.json', 'data/native-sha256', 'README.md', 'LICENSE']) {
  assert.ok(packed.files.some(file => file.path === path), `Missing ${path}`);
}
const archive = join(target, packed.filename);
const sha256 = createHash('sha256').update(readFileSync(archive)).digest('hex');
writeFileSync(join(target, 'SHA256SUMS'), `${sha256}  ${packed.filename}\n`);
const consumer = mkdtempSync(join(tmpdir(), 'neural-mcp-consumer-'));
let connection;
try {
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true }));
  execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', archive], { cwd: consumer, stdio: 'pipe', timeout: 120000 });
  const installed = join(consumer, 'node_modules/neural-ui-mcp');
  assert.equal(statSync(join(consumer, 'node_modules/.bin/neural-ui-mcp')).isFile(), true);
  assert.ok((statSync(join(installed, 'dist/cli.js')).mode & 0o111) !== 0);
  // Crash on any runtime network attempt; not just the happy path being offline.
  const guard = join(consumer, 'deny-network.cjs');
  writeFileSync(guard, `const deny=()=>{throw new Error('RUNTIME_NETWORK_FORBIDDEN')};for(const m of ['node:http','node:https']){const x=require(m);x.request=deny;x.get=deny;}require('node:net').Socket.prototype.connect=deny;globalThis.fetch=deny;`);
  connection = await connect(join(installed, 'dist/cli.js'), { command: join(consumer, 'node_modules/.bin/neural-ui-mcp'), args: [], cwd: consumer, env: { PATH: process.env.PATH, NODE_OPTIONS: `--require=${guard}` } });
  const { client } = connection;
  await assertConsumer(client);
  const nativeScope = { library: 'native', version: '0.1.0-beta.2' };
  assert.equal((await call(client, 'get_api', { ...nativeScope, entrypoint: '@neural-ui/native/button', symbol: 'NeuButtonComponent' })).contract.selector, 'neu-button');
  assert.ok((await call(client, 'list_components', { ...nativeScope })).total > 0);
  assert.ok((await call(client, 'search_documentation', { ...nativeScope, query: 'safe area' })).results.length > 0);
  for (const id of ['forms', 'collections', 'navigation', 'overlays', 'theme']) {
    const example = await call(client, 'get_example', { ...nativeScope, id });
    assert.equal((await call(client, 'validate_usage', { ...nativeScope, source: example.text })).valid, true);
  }
  assert.ok((await client.readResource({ uri: 'neural-native://docs/references/forms' })).contents[0].text.length > 0);
  assert.equal(connection.stderr(), '');
  await client.close();
  connection = undefined;
  // Corrupt packaged data: fail closed, never leak paths or output banners.
  const original = readFileSync(join(installed, 'data/catalog.json'));
  writeFileSync(join(installed, 'data/catalog.json'), 'corrupted');
  const { spawnSync } = await import('node:child_process');
  const broken = spawnSync(process.execPath, [join(installed, 'dist/cli.js')], { cwd: consumer, encoding: 'utf8' });
  assert.equal(broken.status, 1);
  assert.equal(broken.stdout, '');
  assert.ok(broken.stderr.includes('startup failed') && !broken.stderr.includes(consumer));
  writeFileSync(join(installed, 'data/catalog.json'), original);
  mkdirSync(join(root, 'evidence/mcp'), { recursive: true });
  const report = { testedAt: new Date().toISOString(), package: packed.name, version: packed.version,
    filename: packed.filename, sha256, packedFiles: packed.files.length, unpackedBytes: packed.unpackedSize,
    cleanInstall: true, installedBinExecuted: true, officialSdkClient: '2.3.1', protocol: '2026-07-28', allFiveTools: true, resources: true,
    runtimeNetworkBlocked: true, stdoutProtocolOnly: true, corruptDataFailsClosed: true,
    nativeCatalogue: '0.1.0-beta.2', nativeAllFiveTools: true,
    publishedToNpm: false, hostAgentSessionsTested: [] };
  writeFileSync(join(root, 'evidence/mcp/package-verification.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Packed package verified: ${packed.filename}; ${packed.files.length} files, ${packed.unpackedSize} bytes; isolated client + network denial + integrity tests passed`);
} finally {
  if (connection) await connection.client.close();
  rmSync(consumer, { recursive: true, force: true });
}
