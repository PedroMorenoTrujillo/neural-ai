import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const cli = fileURLToPath(new URL('../../packages/mcp/dist/cli.js', import.meta.url));
export async function connect(path = cli, options = {}) {
  const client = new Client({ name: 'neural-ai-verification', version: '0.1.0' }, { versionNegotiation: { mode: 'auto' } });
  const transport = new StdioClientTransport({ command: process.execPath, args: [path], stderr: 'pipe', ...options });
  let stderr = '';
  transport.stderr?.on('data', data => { stderr += data.toString(); });
  await client.connect(transport);
  return { client, transport, stderr: () => stderr };
}
export async function call(client, name, args) {
  const response = await client.callTool({ name, arguments: args });
  assert.equal(response.isError, undefined, JSON.stringify(response.content));
  assert.equal(response.structuredContent.version, args?.library === 'native' ? '0.1.0-beta.2' : '2.0.1');
  assert.deepEqual(JSON.parse(response.content[0].text), response.structuredContent);
  return response.structuredContent.data;
}

export async function assertConsumer(client) {
  assert.equal(client.getNegotiatedProtocolVersion(), '2026-07-28');
  assert.equal((await client.listTools()).tools.length, 5);
  assert.ok((await call(client, 'list_components', {})).total > 0);
  assert.equal((await call(client, 'get_api', { entrypoint: '@neural-ui/core/button', symbol: 'NeuButtonComponent' })).contract.selector, 'button[neu-button]');
  assert.ok((await call(client, 'search_documentation', { query: 'SSR' })).results.length > 0);
  for (const id of ['forms', 'table', 'navigation', 'overlays', 'theme']) {
    const example = await call(client, 'get_example', { id });
    assert.equal((await call(client, 'validate_usage', { source: example.text })).valid, true);
  }
  assert.ok((await client.readResource({ uri: 'neural-ui://docs/references/forms' })).contents[0].text.length > 0);
}
