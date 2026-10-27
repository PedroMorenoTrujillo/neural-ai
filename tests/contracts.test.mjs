import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { inventory, compareApi, root } from '../scripts/api.mjs';
import { validateSource, validateSkill, validateAuthored, localLinks, walk } from '../scripts/validate.mjs';

const api = inventory();
const validSkill = fs.readFileSync(path.join(root,'skills/neural-ui/SKILL.md'),'utf8');
test('portable frontmatter validates and rejects nonportable or malformed metadata', () => {
  assert.deepEqual(validateSkill(validSkill),[]);
  assert.ok(validateSkill(validSkill.replace('name: neural-ui','name: Invalid_Name')).length);
  assert.ok(validateSkill(validSkill.replace('license: MIT','context: fork')).length);
  assert.ok(validateSkill(validSkill.replace('version: "0.1.1"','version: 123')).length);
});
test('all shipped example imports and templates are valid', () => {
  for (const file of walk(path.join(root,'skills/neural-ui/examples'))) assert.deepEqual(validateSource(fs.readFileSync(file,'utf8'),api,file),[]);
});
test('invalid exports, deep imports and Neural Native imports are rejected', () => {
  for (const text of ["import { Imaginary } from '@neural-ui/core/input';", "import { NeuInputComponent } from '@neural-ui/core/input/private';", "import { Anything } from '@neural-native/core';"]) assert.ok(validateSource(text,api).length);
});
test('legacy install instructions, wrong documentation versions and invented tokens fail', () => {
  const tokens = new Set(api.tokens.map(token=>token.name));
  assert.deepEqual(validateAuthored('npm install @neural-ui/core@2.0.3; --neu-bg',api.version,tokens),[]);
  for(const text of ['npm install @neural-ui/core@^1.0.0','https://ui.neuralui.org/v1/en/components','--neu-imaginary-background']) assert.ok(validateAuthored(text,api.version,tokens).length);
  for(const entry of ['organization-chart','scheduler-gantt']) assert.ok(validateSource(`import { Imaginary } from '@neural-ui/core/${entry}';`,api).length);
});
test('supported public surface excludes physically exported internal entrypoints', () => {
  for (const entry of ['internal','internal-state','icon-outlet-internal','menu-shared','menu-tiered']) assert.equal(api.entrypoints[`@neural-ui/core/${entry}`],undefined);
  assert.ok(validateSource("import { Any } from '@neural-ui/core/internal';",api).length);
});
test('unknown selector, input and output fail before publication', () => {
  const base = "import { Component } from '@angular/core'; import { NeuInputComponent } from '@neural-ui/core/input'; @Component({imports:[NeuInputComponent],template:`<neu-input [value]=\"name\" />`}) class Demo {}";
  assert.deepEqual(validateSource(base,api),[]);
  for (const text of [base.replace('neu-input','neu-imaginary'), base.replace('[value]','[invented]'),base.replace('[value]=\"name\"','(invented)=\"save()\"')]) assert.ok(validateSource(text,api).length);
});
test('removed component and entrypoint are reported as breaking API drift', () => {
  const next = structuredClone(api);
  delete next.entrypoints['@neural-ui/core/input'];
  next.entrypoints['@neural-ui/core/button'].symbols = [];
  const changes = compareApi(api,next);
  assert.ok(changes.some(x=>x==='Removed entrypoint: @neural-ui/core/input'));
  assert.ok(changes.some(x=>x.includes('Removed export: @neural-ui/core/button#NeuButtonComponent')));
});
test('removed input and changed payload are contract changes', () => {
  const next = structuredClone(api);
  next.entrypoints['@neural-ui/core/input'].symbols.find(s=>s.name==='NeuInputComponent').inputs.pop();
  assert.ok(compareApi(api,next).some(x=>x==='Changed contract: @neural-ui/core/input#NeuInputComponent'));
});
test('broken references are rejected', () => {
  assert.ok(localLinks(path.join(root,'README.md'),'[bad](missing-reference.md)').length);
});
test('installable skill remains self-contained when copied into each agent directory', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'neural-ai-install-'));
  try {
    for (const folder of ['.agents/skills','.claude/skills']) {
      const destination = path.join(temporary,folder,'neural-ui');
      fs.cpSync(path.join(root,'skills/neural-ui'),destination,{recursive:true,errorOnExist:true});
      assert.deepEqual(validateSkill(fs.readFileSync(path.join(destination,'SKILL.md'),'utf8')),[]);
      for (const file of walk(destination).filter(f=>f.endsWith('.md'))) assert.deepEqual(localLinks(file,fs.readFileSync(file,'utf8')),[]);
    }
  } finally { fs.rmSync(temporary,{recursive:true,force:true}); }
});
