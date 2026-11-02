import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { expectedPublishedHash } from '../scripts/mcp-publication-artifact.mjs';

test('first publication verifies the exact CI artifact before a release record exists', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'neural-mcp-artifact-'));
  try {
    const directory = path.join(root, 'dist/mcp'); fs.mkdirSync(directory, { recursive: true });
    const bytes = Buffer.from('authorized archive');
    const manifest = { name: 'neural-ui-mcp', version: '0.2.3', tag: 'mcp-v0.2.3', commit: 'a'.repeat(40), file: 'neural-ui-mcp-0.2.3.tgz', sha256: createHash('sha256').update(bytes).digest('hex') };
    const record = path.join(directory, 'release-manifest.json');
    fs.writeFileSync(path.join(directory, manifest.file), bytes);
    fs.writeFileSync(record, JSON.stringify(manifest));
    assert.equal(expectedPublishedHash(root, manifest.name, manifest.version), manifest.sha256);
    for (const change of [{ version: '0.2.4' }, { tag: 'mcp-v0.2.4' }, { name: 'other-package' }, { file: '../outside.tgz' }]) {
      fs.writeFileSync(record, JSON.stringify({ ...manifest, ...change }));
      assert.throws(() => expectedPublishedHash(root, manifest.name, manifest.version));
    }
    fs.writeFileSync(record, JSON.stringify(manifest));
    fs.writeFileSync(path.join(directory, manifest.file), 'modified archive');
    assert.throws(() => expectedPublishedHash(root, manifest.name, manifest.version));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('later registry checks can use the recorded release checksum', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'neural-mcp-record-'));
  try {
    fs.mkdirSync(path.join(root, 'evidence/mcp'), { recursive: true });
    fs.writeFileSync(path.join(root, 'evidence/mcp/release-0.2.3.json'), JSON.stringify({ package: 'neural-ui-mcp', version: '0.2.3', sha256: 'a'.repeat(64) }));
    assert.equal(expectedPublishedHash(root, 'neural-ui-mcp', '0.2.3'), 'a'.repeat(64));
    assert.throws(() => expectedPublishedHash(root, 'different-name', '0.2.3'));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
