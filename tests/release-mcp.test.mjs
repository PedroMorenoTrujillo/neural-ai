import test from 'node:test';
import assert from 'node:assert/strict';
import { assertReleaseActor, releaseIdentity } from '../scripts/release-mcp.mjs';

test('contributors and third-party reruns cannot authorize MCP publication', () => {
  assert.doesNotThrow(() => assertReleaseActor('PedroMorenoTrujillo', 'PedroMorenoTrujillo'));
  for (const [actor, retry] of [
    ['contributor', 'contributor'], ['PedroMorenoTrujillo', 'contributor'],
    ['contributor', 'PedroMorenoTrujillo'], ['github-actions[bot]', 'PedroMorenoTrujillo'],
    [undefined, undefined], ['PedroMorenoTrujillo', undefined],
  ]) assert.throws(() => assertReleaseActor(actor, retry));
});

test('only the matching MCP version tag selects its publication channel', () => {
  assert.equal(releaseIdentity('mcp-v0.2.3', '0.2.3').channel, 'latest');
  assert.equal(releaseIdentity('mcp-v0.3.0-beta.1', '0.3.0-beta.1').channel, 'beta');
  for (const tag of ['main', 'v0.2.3', 'neural-native-v0.2.3', 'mcp-v0.2.4', 'mcp-v0.2.3; echo bad', undefined]) assert.throws(() => releaseIdentity(tag, '0.2.3'));
});
