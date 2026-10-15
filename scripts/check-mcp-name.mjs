import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const { name } = JSON.parse(readFileSync(root + 'packages/mcp/package.json', 'utf8'));
if (name !== 'neural-ui-mcp') throw new Error('Review unexpected package name before distribution');
const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, { signal: AbortSignal.timeout(15000) });
if (![200, 404].includes(response.status)) throw new Error(`Registry check failed: ${response.status}`);
const report = { name, checkedAt: new Date().toISOString(), registry: 'https://registry.npmjs.org/',
  status: response.status, availableAtCheck: response.status === 404, reserved: false, publishedByThisTask: false };
mkdirSync(root + 'evidence/mcp', { recursive: true });
writeFileSync(root + 'evidence/mcp/npm-name.json', JSON.stringify(report, null, 2) + '\n');
console.log(`${name}: ${report.availableAtCheck ? 'available at check (not reserved)' : 'already registered; review ownership before publishing'}`);
if (!report.availableAtCheck) process.exitCode = 1;
