import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { main as verify } from './release-mcp.mjs';
import { compareVersions } from './upstream-release-policy.mjs';

await verify('verify');
const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'dist/mcp/release/release-manifest.json'), 'utf8'));
const file = resolve(root, 'dist/mcp/release', manifest.file);
const expected = createHash('sha512').update(readFileSync(file)).digest('base64');
const url = 'https://registry.npmjs.org/neural-ui-mcp';
async function metadata() {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, 200);
  return response.json();
}
const before = await metadata();
const latest = before['dist-tags']?.[manifest.channel];
assert.ok(!latest || compareVersions(latest, manifest.version) <= 0, 'Refusing to roll back a published npm channel');
if (!before.versions?.[manifest.version]) {
  execFileSync('npm', ['publish', file, '--access', 'public', '--tag', manifest.channel, '--provenance'], { cwd: root, stdio: 'inherit' });
}
for (let attempt = 0; attempt < 24; attempt++) {
  const published = (await metadata()).versions?.[manifest.version];
  if (published) {
    assert.equal(published.dist.integrity, 'sha512-' + expected, 'Published version contains a different archive; bump the MCP version');
    const response = await fetch(published.dist.tarball, { signal: AbortSignal.timeout(20_000) });
    assert.equal(response.status, 200);
    assert.equal(createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex'), manifest.sha256);
    console.log(`Verified exact public MCP ${manifest.version}; SHA-256 ${manifest.sha256}`);
    process.exit(0);
  }
  await new Promise(resolve => setTimeout(resolve, 15_000));
}
throw new Error('The exact MCP archive did not become visible in the public registry');
