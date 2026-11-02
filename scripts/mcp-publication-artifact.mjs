import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createHash } from 'node:crypto';

export function expectedPublishedHash(root, name, version) {
  const artifact = join(root, 'dist/mcp/release-manifest.json');
  if (existsSync(artifact)) {
    const manifest = JSON.parse(readFileSync(artifact, 'utf8'));
    assert.equal(manifest.name, name);
    assert.equal(manifest.version, version);
    assert.equal(manifest.tag, `mcp-v${version}`);
    assert.match(manifest.commit, /^[a-f0-9]{40}$/);
    assert.match(manifest.sha256, /^[a-f0-9]{64}$/);
    assert.equal(basename(manifest.file), manifest.file);
    assert.equal(manifest.file, `${name}-${version}.tgz`);
    const bytes = readFileSync(join(root, 'dist/mcp', manifest.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), manifest.sha256, 'Downloaded CI artifact was modified');
    return manifest.sha256;
  }
  const release = JSON.parse(readFileSync(join(root, `evidence/mcp/release-${version}.json`), 'utf8'));
  assert.equal(release.package ?? release.name, name);
  assert.equal(release.version, version);
  assert.match(release.sha256, /^[a-f0-9]{64}$/);
  return release.sha256;
}
