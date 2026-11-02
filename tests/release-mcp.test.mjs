import test from 'node:test';
import assert from 'node:assert/strict';
import { releaseIdentity } from '../scripts/release-mcp.mjs';

test('only the matching MCP version tag selects its publication channel', () => {
  assert.equal(releaseIdentity('mcp-v0.2.3', '0.2.3').channel, 'latest');
  assert.equal(releaseIdentity('mcp-v0.3.0-beta.1', '0.3.0-beta.1').channel, 'beta');
  for (const tag of ['main', 'v0.2.3', 'neural-native-v0.2.3', 'mcp-v0.2.4', 'mcp-v0.2.3; echo bad', undefined]) assert.throws(() => releaseIdentity(tag, '0.2.3'));
});
