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
  assert.equal(response.structuredContent.version, '2.0.1');
  assert.deepEqual(JSON.parse(response.content[0].text), response.structuredContent);
  return response.structuredContent.data;
}
