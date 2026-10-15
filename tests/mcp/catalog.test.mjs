import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadCatalog, components, search } from '../../packages/mcp/dist/catalog.js';
import { analyzeSource } from '../../shared/usage-validator.mjs';
import { root } from './helpers.mjs';

const catalog = loadCatalog();
test('packaged catalogue equals the canonical API and every reference/example', () => {
  assert.deepEqual(catalog.api, JSON.parse(readFileSync(root + 'evidence/api.json', 'utf8')));
  assert.equal(catalog.documents.length, 107);
  assert.equal(catalog.examples.length, 5);
  for (const doc of [...catalog.documents, ...catalog.examples]) assert.equal(doc.text, readFileSync(root + doc.source, 'utf8'));
  assert.equal(readFileSync(root + 'shared/usage-validator.mjs', 'utf8'), readFileSync(root + 'packages/mcp/dist/usage-validator.mjs', 'utf8'));
});
test('component discovery derives kinds/selectors/imports from declarations', () => {
  const result = components(catalog, 'NeuButtonComponent');
  assert.equal(result.length, 1);
  assert.equal(result[0].selector, 'button[neu-button]');
  assert.equal(result[0].entrypoint, '@neural-ui/core/button');
  assert.equal(components(catalog, '', 'directive').every(item => item.kind === 'directive'), true);
  assert.equal(components(catalog, 'NativeImaginaryThing').length, 0);
});
test('search returns bounded deterministic snippets from existing references', () => {
  const hits = search(catalog, 'Signal Forms', 3);
  assert.equal(hits.length, 3);
  assert.ok(hits.some(item => item.id === 'references/forms'));
  assert.ok(hits.every(item => item.excerpt.length <= 1800 && catalog.documents.some(doc => doc.id === item.id && doc.text.includes(item.excerpt))));
  assert.deepEqual(search(catalog, '!!!'), []);
  assert.deepEqual(search(catalog, 'xyznosuchcomponent123'), []);
});
test('all five real compiler-tested examples pass the same shared static validator', () => {
  for (const example of catalog.examples) {
    const report = analyzeSource(example.text, catalog.api);
    assert.deepEqual(report.errors, [], example.id);
    assert.ok(report.templatesChecked > 0);
  }
});
const prefix = "import { Component } from '@angular/core'; import { NeuButtonComponent } from '@neural-ui/core/button';";
const component = template => `${prefix}\n@Component({imports:[NeuButtonComponent],template:\`${template}\`}) export class Demo {}`;
test('static validation checks selector contracts, aliases, types and scope limits', () => {
  assert.deepEqual(analyzeSource(component('<button neu-button (neuClick)="go()">OK</button>'), catalog.api).errors, []);
  assert.match(analyzeSource(component('<button neu-button [invented]="true"></button>'), catalog.api).errors.join(), /Unknown input/);
  assert.match(analyzeSource(component('<button neu-button (invented)="go()"></button>'), catalog.api).errors.join(), /Unknown output/);
  assert.match(analyzeSource(component('<neu-imaginary/>'), catalog.api).errors.join(), /Unknown or unimported/);
  assert.match(analyzeSource("import { Ghost } from '@neural-ui/core/button'", catalog.api).errors.join(), /Unknown public export/);
  assert.match(analyzeSource("import '@neural-ui/core/internal'", catalog.api).errors.join(), /Unsupported public entrypoint/);
  assert.match(analyzeSource("import '@neural-ui/native'", catalog.api).errors.join(), /Native import forbidden/);
  assert.match(analyzeSource(component('<button neu-button formControlName="name"></button>'), catalog.api).errors.join(), /CVA binding/);
  assert.match(analyzeSource(`${prefix} @Component({templateUrl:'secret.html'}) class Demo {}`, catalog.api).warnings.join(), /External or computed/);
  assert.match(analyzeSource('const broken = ;', catalog.api).errors.join(), /TypeScript syntax/);
  const alias = "import { Component as C } from '@angular/core'; import { NeuButtonComponent as B } from '@neural-ui/core/button'; @C({imports:[B],template:'<button neu-button [invented]=\"1\"></button>'}) class X {}";
  assert.match(analyzeSource(alias, catalog.api).errors.join(), /Unknown input/);
  assert.deepEqual(analyzeSource(component('<button neu-button [title]="tip" [type]="kind"></button>'), catalog.api).errors, []);
});
test('form ownership, required inputs and template directives use real declarations', () => {
  const forms = "import { Component } from '@angular/core'; import { FormField } from '@angular/forms/signals'; import { NeuInputComponent } from '@neural-ui/core/input';";
  assert.match(analyzeSource(`${forms} @Component({template:'<neu-input [formField]="field" [value]="value"/>'}) class Demo {}`, catalog.api).errors.join(), /Conflicting form and model owners/);
  const table = "import { Component } from '@angular/core'; import { NeuTableComponent, NeuTableCellDirective } from '@neural-ui/core/table';";
  assert.match(analyzeSource(`${table} @Component({template:'<neu-table/>'}) class Demo {}`, catalog.api).errors.join(), /Missing required input.*rowKey/);
  assert.match(analyzeSource(`${table} @Component({template:'<ng-template neuTableCell [invented]="1"></ng-template>'}) class Demo {}`, catalog.api).errors.join(), /Unknown input/);
});
