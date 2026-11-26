import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { inventory, root } from './api.mjs';
import { CHARTS_BROWSER_VERSIONS } from './release-state.mjs';
import { localLinks, validateSkill, validateSource } from './validate.mjs';

const fixture = join(root, 'tests/charts-web-consumer');
const skill = join(root, 'skills/neural-charts-web');
const host = JSON.parse(readFileSync(join(fixture, 'package.json'), 'utf8'));
const policy = {
  internalEntrypoints: [], internalDeclarations: [], publicMembers: {},
  publicImperativeMembers: { NeuralChart: ['exportSvg', 'exportCsv', 'exportPng'] },
};
const examples = { web: 'line-web.ts', angular: 'line-angular.ts', react: 'line-react.tsx' };
const installed = basename => join(fixture, 'node_modules', '@neural-charts', basename);
const compileDir = mkdtempSync(join(fixture, '.compiled-'));
const write = process.argv.includes('--write');

try {
  const skillFile = join(skill, 'SKILL.md');
  const source = readFileSync(skillFile, 'utf8');
  const errors = [...validateSkill(source, 'neural-charts-web'), ...localLinks(skillFile, source)];
  for (const [adapter, example] of Object.entries(examples)) {
    const scope = `charts-${adapter}`;
    const name = `@neural-charts/${adapter}`;
    const version = CHARTS_BROWSER_VERSIONS[scope];
    assert.equal(host.dependencies[name], version, `Consumer lock must follow ${name}`);
    const api = inventory(installed(adapter), { policy, inheritedBindings: true, tokens: [], assets: {} });
    assert.equal(api.package, name);
    assert.equal(api.version, version);
    assert.ok(api.entrypoints[name].symbols.length, `Empty primary entrypoint for ${name}`);

    const reference = join(skill, 'references', `${adapter}.md`);
    errors.push(...localLinks(reference, readFileSync(reference, 'utf8')));
    const file = join(skill, 'examples', example);
    errors.push(...validateSource(readFileSync(file, 'utf8'), api, example).map(error => `${example}: ${error}`));
    copyFileSync(file, join(compileDir, example));

    const out = join(root, 'evidence', `${scope}-api.json`);
    const content = JSON.stringify(api, null, 2) + '\n';
    if (write) writeFileSync(out, content);
    else assert.equal(readFileSync(out, 'utf8'), content, `${name} public declarations changed`);
    console.log(`${name}@${version}: ${Object.keys(api.entrypoints).length} public entrypoints`);
  }
  assert.deepEqual(errors, [], 'Invalid Charts browser skill or examples');

  copyFileSync(join(fixture, 'browser.ts'), join(compileDir, 'browser.ts'));
  writeFileSync(join(compileDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      module: 'NodeNext', target: 'ES2022', strict: true, skipLibCheck: true, jsx: 'react-jsx',
      experimentalDecorators: true, outDir: 'out',
    },
    angularCompilerOptions: { strictTemplates: true },
    files: [...Object.values(examples), 'browser.ts'],
  }));
  execFileSync(process.execPath, [join(fixture, 'node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js'), '-p', 'tsconfig.json'],
    { cwd: compileDir, stdio: 'inherit', timeout: 60_000 });
  console.log('All three Charts browser examples compiled with strict TypeScript and Angular templates');

  if (process.argv.includes('--browser')) {
    const { verifyChartsBrowser } = await import('../tests/charts-web-consumer/browser-check.mjs');
    await verifyChartsBrowser(fixture, join(compileDir, 'out/browser.js'));
  }
} finally {
  rmSync(compileDir, { recursive: true, force: true });
}
