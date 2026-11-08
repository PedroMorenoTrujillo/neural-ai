import { WEB_VERSION, NATIVE_VERSION, CHARTS_VERSION } from '../../scripts/release-state.mjs';
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
  const versions = { web: WEB_VERSION, native: NATIVE_VERSION, 'charts-native': CHARTS_VERSION };
  assert.equal(response.structuredContent.version, args?.version ?? versions[args?.library ?? 'web']);
  assert.deepEqual(JSON.parse(response.content[0].text), response.structuredContent);
  return response.structuredContent.data;
}

export async function assertChartsNative(client) {
  const scope = { library: 'charts-native', version: CHARTS_VERSION };
  const chart = (name, args = {}) => call(client, name, { ...scope, ...args });
  const list = await chart('list_components');
  assert.ok(list.items.some(item => item.name === 'NativeDataChart' && item.selector.includes('neu-c-chart')));
  const api = await chart('get_api', { entrypoint: '@neural-charts/native', symbol: 'NativeDataChart' });
  assert.ok(api.contract.inputs.some(input => input.alias === 'data' && input.required));
  assert.ok(api.contract.outputs.some(output => output.alias === 'interactionChange'));
  assert.equal((await chart('get_api', { entrypoint: '@neural-charts/native/plan', symbol: 'planNativeChart' })).contract.name, 'planNativeChart');
  const docs = await chart('search_documentation', { query: 'heatmap colour' });
  assert.ok(docs.results[0].uri.startsWith('neural-charts-native://'));
  assert.ok((await client.readResource({ uri: docs.results[0].uri })).contents[0].text.includes(docs.results[0].excerpt));
  for (const id of ['line', 'customization', 'heatmap', 'panels', 'drilldown']) {
    const example = await chart('get_example', { id });
    const result = await chart('validate_usage', { source: example.text });
    assert.equal(result.valid, true, id);
    assert.equal(result.compilationChecked, false);
    assert.ok(result.templatesChecked > 0);
  }
  const example = await chart('get_example', { id: 'customization' });
  const missingDirective = await chart('validate_usage', { source: example.text.replaceAll('NativeChartTooltipTemplate, ', '') });
  assert.ok(missingDirective.errors.some(error => error.includes('neuChartTooltip')));
  const webImport = await chart('validate_usage', { source: "import { NeuButtonComponent } from '@neural-ui/core/button';" });
  assert.equal(webImport.valid, false);
  for (const [name, args] of [
    ['get_api', { ...scope, entrypoint: '@neural-ui/native/button' }],
    ['get_api', { library: 'web', entrypoint: '@neural-charts/native' }],
    ['list_components', { ...scope, version: NATIVE_VERSION }],
    ['get_example', { ...scope, id: 'forms' }],
  ]) assert.equal((await client.callTool({ name, arguments: args })).isError, true);
}

export async function assertConsumer(client, webVersion = WEB_VERSION) {
  const webCall = (name, args = {}) => call(client, name, { version: webVersion, ...args });
  assert.equal(client.getNegotiatedProtocolVersion(), '2026-07-28');
  assert.equal((await client.listTools()).tools.length, 5);
  assert.ok((await webCall('list_components')).total > 0);
  assert.equal((await webCall('get_api', { entrypoint: '@neural-ui/core/button', symbol: 'NeuButtonComponent' })).contract.selector, 'button[neu-button]');
  assert.ok((await webCall('search_documentation', { query: 'SSR' })).results.length > 0);
  for (const id of ['forms', 'table', 'navigation', 'overlays', 'theme']) {
    const example = await webCall('get_example', { id });
    assert.equal((await webCall('validate_usage', { source: example.text })).valid, true);
  }
  assert.ok((await client.readResource({ uri: 'neural-ui://docs/references/forms' })).contents[0].text.length > 0);
}
