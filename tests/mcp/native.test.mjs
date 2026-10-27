import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { connect, call, root } from './helpers.mjs';
import { loadCatalog, components, search } from '../../packages/mcp/dist/catalog.js';
import { analyzeSource } from '../../shared/usage-validator.mjs';
import { tokenDefaults } from '../../scripts/native-api.mjs';

const catalog = loadCatalog('native');
test('Native catalogue has exact npm-derived bindings, tokens and canonical references', () => {
  assert.deepEqual(catalog.api, JSON.parse(readFileSync(root+'evidence/native-api.json')));
  assert.equal(Object.keys(catalog.api.entrypoints).length,67);
  assert.equal(catalog.api.tokens.length,28);
  for(const doc of [...catalog.documents,...catalog.examples]) assert.equal(doc.text,readFileSync(root+doc.source,'utf8'));
  const input=catalog.api.entrypoints['@neural-ui/native/input'].symbols.find(x=>x.name==='NeuInputComponent');
  assert(input.inputs.some(x=>x.alias==='value'&&x.type.includes('ModelSignal<string>')));
  assert(input.outputs.some(x=>x.alias==='valueChange'));
  assert(!input.members.some(x=>x.includes('activate')||x.includes('ɵ')));
  assert.equal(components(catalog,'NeuButtonComponent').length,1);
  assert.equal(components(catalog,'NeuButtonComponent')[0].selector,'neu-button');
  assert(search(catalog,'safe area',3).every(x=>x.uri.startsWith('neural-native://docs/')));
});
test('Native validator rejects Web APIs and events, includes inherited models and keeps form ownership explicit',()=>{
  const prefix="import { Component } from '@angular/core'; import { NeuButtonComponent } from '@neural-ui/native/button'; import { NeuInputComponent } from '@neural-ui/native/input';";
  const source=template=>`${prefix} @Component({template:\`${template}\`}) class Demo {}`;
  assert.deepEqual(analyzeSource(source('<neu-input label="Name" [(value)]="name"/><neu-button label="Save" (pressed)="save()"/>'),catalog.api).errors,[]);
  for(const [template,pattern] of [
    ['<neu-button label="Save" (click)="save()"/>',/Unknown output/],
    ['<neu-button/>',/Missing required input/],
    ['<neu-input [imaginary]="1"/>',/Unknown input/],
    ['<neu-button label="Save" [title]="hint"/>',/Unknown input/],
    ['<button neu-button>Save</button>',/Web DOM/],
  ])assert.match(analyzeSource(source(template),catalog.api).errors.join(),pattern);
  assert.match(analyzeSource("import '@neural-ui/core/button';",catalog.api).errors.join(),/Web import forbidden/);
  assert.match(analyzeSource("import '@neural-ui/native/dist/foundation/mobile.js';",catalog.api).errors.join(),/Unsupported public entrypoint/);
  assert.match(analyzeSource(`${prefix} import { FormField } from '@angular/forms/signals'; @Component({template:'<neu-input [formField]="field" [value]="name"/>'}) class Demo {}`,catalog.api).errors.join(),/Conflicting form/);
});
test('Native tokens are read as literals and never executed',()=>{
  assert.throws(()=>tokenDefaults('export const NEU_LIGHT_TOKENS=Object.freeze({accent:process.exit()});'),/Nonliteral/);
  assert.deepEqual(tokenDefaults('export const NEU_LIGHT_TOKENS=Object.freeze({accent:"red"});').NEU_LIGHT_TOKENS,{accent:'red'});
});
test('real MCP client selects Native on every tool and keeps Web defaults isolated',{timeout:30000},async()=>{
  const {client,stderr}=await connect();
  try{
    const scope={library:'native',version:'0.1.0-beta.2'};
    const list=await call(client,'list_components',{...scope,query:'NeuButtonComponent'});
    assert.equal(list.total,1);
    assert.equal(list.items[0].entrypoint,'@neural-ui/native/button');
    const api=await call(client,'get_api',{...scope,entrypoint:'@neural-ui/native/input',symbol:'NeuInputComponent'});
    assert(api.contract.inputs.some(x=>x.alias==='value'));
    const docs=await call(client,'search_documentation',{...scope,query:'safe area'});
    const resource=await client.readResource({uri:docs.results[0].uri});
    assert(resource.contents[0].text.includes(docs.results[0].excerpt));
    for(const id of ['forms','collections','navigation','overlays','theme']){
      const example=await call(client,'get_example',{...scope,id});
      const report=await call(client,'validate_usage',{...scope,source:example.text});
      assert.equal(report.valid,true,JSON.stringify(report));
      assert.equal(report.compilationChecked,false);
    }
    for(const args of [
      {library:'native',version:'2.0.3'}, {library:'web',version:'0.1.0-beta.2'},
      {library:'web',version:'2.0.1'},
      {library:'../../.env'}, {library:'native',version:'0.1.0-beta.999'},
    ])assert.equal((await client.callTool({name:'list_components',arguments:args})).isError,true);
    for(const args of [
      {library:'native',entrypoint:'@neural-ui/core/button'},
      {entrypoint:'@neural-ui/native/button'},
      {library:'native',entrypoint:'__proto__'},
    ])assert.equal((await client.callTool({name:'get_api',arguments:args})).isError,true);
    await assert.rejects(client.readResource({uri:'neural-native://docs/../../.env'}));
    assert.equal((await call(client,'get_api',{entrypoint:'@neural-ui/core/button',symbol:'NeuButtonComponent'})).contract.selector,'button[neu-button]');
    assert.equal(stderr(),'');
  }finally{await client.close();}
});
