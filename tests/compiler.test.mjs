import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { root } from '../scripts/api.mjs';

// Run the real Angular compiler against invalid consumer contracts.
test('Angular compiler rejects wrong exports, missing row identity and dialog model invention', () => {
  const base = path.join(root,'.cache');
  fs.mkdirSync(base,{recursive:true});
  const dir = fs.mkdtempSync(path.join(base,'negative-compiler-'));
  try {
    fs.writeFileSync(path.join(dir,'invalid.ts'), `
      import { Component } from '@angular/core';
      import { NeuDialogComponent } from '@neural-ui/core/modal';
      import { NeuTableComponent } from '@neural-ui/core/table';
      import { NeuInputComponent } from '@neural-ui/core';
      @Component({ standalone:true, imports:[NeuDialogComponent,NeuTableComponent],
        template:'<neu-dialog [(open)]="open" /><neu-table />' })
      export class InvalidConsumer { open = false; }
    `);
    fs.writeFileSync(path.join(dir,'tsconfig.json'), JSON.stringify({
      compilerOptions: { target:'ES2022', module:'preserve', moduleResolution:'bundler', strict:true, skipLibCheck:true, experimentalDecorators:true, noEmit:true },
      angularCompilerOptions: { strictTemplates:true }, files:['invalid.ts'],
    }));
    let output = '';
    try { execFileSync(process.execPath,[path.join(root,'node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js'),'-p',path.join(dir,'tsconfig.json')],{cwd:root,stdio:['ignore','pipe','pipe'],encoding:'utf8'}); }
    catch(error) { output = String(error.stdout)+String(error.stderr); }
    assert.match(output,/has no exported member.*NeuInputComponent/s);
    // A bad import causes TypeScript to stop before template checking. Remove only that import and rerun.
    const source = fs.readFileSync(path.join(dir,'invalid.ts'),'utf8');
    fs.writeFileSync(path.join(dir,'invalid.ts'),source.replace("import { NeuInputComponent } from '@neural-ui/core';",''));
    output = '';
    try { execFileSync(process.execPath,[path.join(root,'node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js'),'-p',path.join(dir,'tsconfig.json')],{cwd:root,stdio:['ignore','pipe','pipe'],encoding:'utf8'}); }
    catch(error) { output = String(error.stdout)+String(error.stderr); }
    assert.match(output,/Required input 'rowKey'/);
    assert.match(output,/open[\s\S]*(?:two-way binding|Event.*boolean|openChange)/i);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
