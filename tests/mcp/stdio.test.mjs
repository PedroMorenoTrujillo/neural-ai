import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { cli } from './helpers.mjs';

test('stdout contains JSON-RPC only, supports legacy clients, and exits on EOF', { timeout: 15000 }, async () => {
  const child = spawn(process.execPath, [cli], { stdio: ['pipe', 'pipe', 'pipe'] });
  let stdout = '', stderr = '';
  child.stdout.on('data', bytes => { stdout += bytes; });
  child.stderr.on('data', bytes => { stderr += bytes; });
  const exits = once(child, 'exit');
  try {
    // A readiness window also catches accidental banners and console.log calls.
    await new Promise(resolve => setTimeout(resolve, 400));
    assert.equal(stdout, '');
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {
      protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'legacy-smoke', version: '1.0.0' },
    } }) + '\n');
    for (let i = 0; !stdout.includes('"id":1') && i < 100; i++) await new Promise(resolve => setTimeout(resolve, 20));
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: {
      name: 'validate_usage', arguments: { source: "console.log('SECRET_STDOUT'); throw new Error('SECRET_STDERR');" },
    } }) + '\n');
    for (let i = 0; !stdout.includes('"id":2') && i < 100; i++) await new Promise(resolve => setTimeout(resolve, 20));
    const messages = stdout.trim().split('\n').map(line => JSON.parse(line));
    assert.equal(messages.length, 2);
    assert.ok(messages.every(message => message.jsonrpc === '2.0' && [1, 2].includes(message.id) && !message.error));
    assert.equal(messages[0].result.protocolVersion, '2025-11-25');
    assert.equal(messages[1].result.structuredContent.data.valid, true);
    assert.ok(!stdout.includes('SECRET_STDOUT'));
    assert.equal(stderr, '');
    child.stdin.end();
    const [code, signal] = await exits;
    assert.equal(code, 0);
    assert.equal(signal, null);
  } finally { if (child.exitCode === null) child.kill('SIGKILL'); }
});
test('CLI version/invalid arguments keep stdout empty', () => {
  for (const [args, code] of [[['--version'], 0], [['--http'], 1]]) {
    const child = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
    assert.equal(child.status, code);
    assert.equal(child.stdout, '');
    assert.ok(child.stderr.length > 0);
  }
});
test('stdio server exits gracefully on SIGTERM', { timeout: 5000 }, async () => {
  const child = spawn(process.execPath, [cli], { stdio: ['pipe', 'pipe', 'pipe'] });
  const exit = once(child, 'exit');
  const ready = once(child.stdout, 'data');
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {
    protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'signal-smoke', version: '1.0.0' },
  } }) + '\n');
  await ready;
  child.kill('SIGTERM');
  const [code, signal] = await exit;
  assert.equal(code, 0);
  assert.equal(signal, null);
});
