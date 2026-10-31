import test from 'node:test';
import assert from 'node:assert/strict';
import { connect, call } from './helpers.mjs';

test('official MCP SDK client interoperates over real stdio: all tools and resources', { timeout: 30000 }, async () => {
  const { client, stderr } = await connect();
  try {
    assert.deepEqual(client.getServerVersion(), { name: 'neural-ui-mcp', version: '0.2.2' });
    assert.equal(client.getProtocolEra(), 'modern');
    assert.equal(client.getNegotiatedProtocolVersion(), '2026-07-28');
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(item => item.name).sort(), ['get_api', 'get_example', 'list_components', 'search_documentation', 'validate_usage']);
    assert.ok(tools.tools.every(item => item.annotations.readOnlyHint && !item.annotations.openWorldHint));
    const list = await call(client, 'list_components', { query: 'button', limit: 1 });
    assert.ok(list.total > 0);
    assert.equal(list.items.length, 1);
    const api = await call(client, 'get_api', { entrypoint: '@neural-ui/core/button', symbol: 'NeuButtonComponent' });
    assert.equal(api.contract.selector, 'button[neu-button]');
    assert.ok(api.contract.outputs.some(item => item.alias === 'neuClick'));
    const dialog = await call(client, 'get_api', { library: 'web', version: '2.0.4', entrypoint: '@neural-ui/core/modal', symbol: 'NeuDialogComponent' });
    assert.ok(dialog.contract.inputs.some(item => item.alias === 'closeLabel'));
    const localizedDialog = await call(client, 'validate_usage', { library: 'web', version: '2.0.4', source: `import { Component, signal } from '@angular/core';
import { NeuDialogComponent } from '@neural-ui/core/modal';
@Component({ standalone: true, imports: [NeuDialogComponent], template: '<neu-dialog [open]="open()" title="Confirmar" closeLabel="Cerrar diálogo">Contenido</neu-dialog>' })
export class LocalizedDialog { readonly open = signal(true); }` });
    assert.equal(localizedDialog.valid, true);
    const exports = await call(client, 'get_api', { entrypoint: '@neural-ui/core/button' });
    assert.ok(exports.exports.some(item => item.name === 'NeuButtonTone'));
    const docs = await call(client, 'search_documentation', { query: 'Signal Forms', limit: 3 });
    assert.ok(docs.results.length > 0);
    const resource = await client.readResource({ uri: docs.results[0].uri });
    assert.ok(resource.contents[0].text.includes(docs.results[0].excerpt));
    for (const id of ['forms', 'table', 'navigation', 'overlays', 'theme']) {
      const example = await call(client, 'get_example', { id });
      const report = await call(client, 'validate_usage', { source: example.text });
      assert.equal(report.valid, true, id);
      assert.equal(report.compilationChecked, false);
      assert.ok(report.templatesChecked > 0);
    }
    const resources = await client.listResources();
    assert.equal(resources.resources.filter(item => item.uri.startsWith('neural-ui://')).length, 112);
    assert.ok(resources.resources.some(item => item.uri === 'neural-native://docs/references/forms'));
    assert.equal(stderr(), '');
  } finally { await client.close(); }
});

test('security: bounded schemas, allowlisted resources, parse-only source and recoverable errors', { timeout: 30000 }, async () => {
  const { client, stderr } = await connect();
  try {
    for (const [name, args] of [
      ['list_components', { version: '1.0.0' }], ['list_components', { limit: 50000 }],
      ['list_components', { library: 'web', version: '2.0.3' }],
      ['search_documentation', { query: 'a'.repeat(201) }], ['search_documentation', { query: ' ', limit: 1 }],
      ['get_api', { entrypoint: '@neural-ui/core/internal' }], ['get_api', { entrypoint: '__proto__' }],
      ['get_api', { entrypoint: '@neural-ui/core/button', symbol: 'NeuInventedComponent' }],
      ['get_example', { id: '../../.env' }], ['validate_usage', { source: 'x'.repeat(65537) }],
      ['validate_usage', { source: '/*' + '💣'.repeat(17000) + '*/' }],
      ['validate_usage', { source: 'const x = 1;', filename: '../secret.ts' }],
      ['validate_usage', { source: 'const x = 1;', path: '/etc/passwd' }],
    ]) assert.equal((await client.callTool({ name, arguments: args })).isError, true, name + JSON.stringify(args).slice(0, 150));
    for (const uri of ['file:///etc/passwd', 'https://example.com', 'neural-ui://docs/../../.env']) {
      await assert.rejects(client.readResource({ uri }));
    }
    await assert.rejects(client.callTool({ name: 'execute', arguments: { command: 'ls' } }));
    const injected = await call(client, 'validate_usage', { source: "throw new Error('DO_NOT_EXECUTE'); console.log('DO_NOT_LOG'); import('node:fs').then(fs=>fs.writeFileSync('/should-not-write','bad'));" });
    assert.equal(injected.valid, true); // Parses code; it never runs or trusts it.
    assert.equal(injected.templatesChecked, 0);
    const invalid = await call(client, 'validate_usage', { source: "import { NeuGone } from '@neural-ui/core/button';" });
    assert.equal(invalid.valid, false);
    assert.match(invalid.errors.join(), /Unknown public export/);
    assert.equal(stderr(), '');
    assert.ok((await call(client, 'list_components', {})).total > 0);
  } finally { await client.close(); }
});
