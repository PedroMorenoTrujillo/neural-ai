import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, lstatSync, chmodSync, rmSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = resolve(root, 'packages/mcp');
execFileSync(process.execPath, [resolve(root, 'scripts/api.mjs'), '--check'], { stdio: 'inherit' });
const documents = [];
const examples = [];
function collect(dir, target, extension) {
  for (const name of readdirSync(dir).sort()) {
    const path = resolve(dir, name);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new Error('Symlinks are not allowed in catalogue sources');
    if (stat.isDirectory()) collect(path, target, extension);
    else if (name.endsWith(extension)) target.push({
      id: relative(resolve(root, 'skills/neural-ui'), path).replaceAll('\\', '/').replace(/\.(md|ts)$/, ''),
      source: relative(root, path).replaceAll('\\', '/'),
      text: readFileSync(path, 'utf8'),
    });
  }
}
collect(resolve(root, 'skills/neural-ui/references'), documents, '.md');
collect(resolve(root, 'skills/neural-ui/examples'), examples, '.ts');
const api = JSON.parse(readFileSync(resolve(root, 'evidence/api.json'), 'utf8'));
if (api.package !== '@neural-ui/core' || api.version !== '2.0.1') throw new Error('Unsupported catalogue version');
const catalog = JSON.stringify({ schemaVersion: 1, api, documents, examples });
mkdirSync(resolve(pkg, 'data'), { recursive: true });
mkdirSync(resolve(pkg, 'src'), { recursive: true });
writeFileSync(resolve(pkg, 'data/catalog.json'), catalog + '\n');
writeFileSync(resolve(pkg, 'data/sha256'), createHash('sha256').update(catalog + '\n').digest('hex') + '\n');
copyFileSync(resolve(root, 'shared/usage-validator.mjs'), resolve(pkg, 'src/usage-validator.mjs'));
copyFileSync(resolve(root, 'LICENSE'), resolve(pkg, 'LICENSE'));
rmSync(resolve(pkg, 'dist'), { recursive: true, force: true });
execFileSync(process.execPath, [resolve(root, 'node_modules/typescript/bin/tsc'), '-p', resolve(pkg, 'tsconfig.json')], { stdio: 'inherit' });
copyFileSync(resolve(root, 'shared/usage-validator.mjs'), resolve(pkg, 'dist/usage-validator.mjs'));
chmodSync(resolve(pkg, 'dist/cli.js'), 0o755);
console.log(`MCP built: ${Object.keys(api.entrypoints).length} entrypoints, ${documents.length} references, ${examples.length} examples`);
