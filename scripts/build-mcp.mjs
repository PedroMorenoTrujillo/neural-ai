import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, lstatSync, chmodSync, rmSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { WEB_VERSION, NATIVE_VERSION, CHARTS_VERSION, CHARTS_BROWSER_VERSIONS } from './release-state.mjs';
import { generateMcpVersions } from './generate-mcp-versions.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = resolve(root, 'packages/mcp');
generateMcpVersions();
execFileSync(process.execPath, [resolve(root, 'scripts/api.mjs'), '--check'], { stdio: 'inherit' });
execFileSync(process.execPath, [resolve(root, 'scripts/native-api.mjs'), '--check'], { stdio: 'inherit' });
const documents = [];
const examples = [];
function collect(dir, target, extension, skill = 'neural-ui') {
  for (const name of readdirSync(dir).sort()) {
    const path = resolve(dir, name);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new Error('Symlinks are not allowed in catalogue sources');
    if (stat.isDirectory()) collect(path, target, extension, skill);
    else if (extension === '.ts' ? /\.tsx?$/.test(name) : name.endsWith(extension)) target.push({
      id: relative(resolve(root, `skills/${skill}`), path).replaceAll('\\', '/').replace(/\.(md|tsx?)$/, ''),
      source: relative(root, path).replaceAll('\\', '/'),
      text: readFileSync(path, 'utf8'),
    });
  }
}
collect(resolve(root, 'skills/neural-ui/references'), documents, '.md');
collect(resolve(root, 'skills/neural-ui/examples'), examples, '.ts');
const api = JSON.parse(readFileSync(resolve(root, 'evidence/api.json'), 'utf8'));
if (api.package !== '@neural-ui/core' || api.version !== WEB_VERSION) throw new Error('Unsupported catalogue version');
const catalog = JSON.stringify({ schemaVersion: 1, api, documents, examples });
mkdirSync(resolve(pkg, 'data'), { recursive: true });
mkdirSync(resolve(pkg, 'src'), { recursive: true });
writeFileSync(resolve(pkg, 'data/catalog.json'), catalog + '\n');
writeFileSync(resolve(pkg, 'data/sha256'), createHash('sha256').update(catalog + '\n').digest('hex') + '\n');
const nativeDocuments = [], nativeExamples = [];
collect(resolve(root, 'skills/neural-native/references'), nativeDocuments, '.md', 'neural-native');
collect(resolve(root, 'skills/neural-native/examples'), nativeExamples, '.ts', 'neural-native');
const nativeApi = JSON.parse(readFileSync(resolve(root, 'evidence/native-api.json'), 'utf8'));
if (nativeApi.package !== '@neural-ui/native' || nativeApi.version !== NATIVE_VERSION) throw new Error('Unsupported Native catalogue version');
const nativeCatalog = JSON.stringify({ schemaVersion: 1, api: nativeApi, documents: nativeDocuments, examples: nativeExamples }) + '\n';
writeFileSync(resolve(pkg, 'data/native-catalog.json'), nativeCatalog);
writeFileSync(resolve(pkg, 'data/native-sha256'), createHash('sha256').update(nativeCatalog).digest('hex') + '\n');
const chartsDocuments = [], chartsExamples = [];
collect(resolve(root, 'skills/neural-charts-native/references'), chartsDocuments, '.md', 'neural-charts-native');
collect(resolve(root, 'skills/neural-charts-native/examples'), chartsExamples, '.ts', 'neural-charts-native');
const chartsApi = JSON.parse(readFileSync(resolve(root, 'evidence/charts-native-api.json'), 'utf8'));
if (chartsApi.package !== '@neural-charts/native' || chartsApi.version !== CHARTS_VERSION) throw new Error('Unsupported Charts Native catalogue version');
const chartsCatalog = JSON.stringify({ schemaVersion: 1, api: chartsApi, documents: chartsDocuments, examples: chartsExamples }) + '\n';
writeFileSync(resolve(pkg, 'data/charts-native-catalog.json'), chartsCatalog);
writeFileSync(resolve(pkg, 'data/charts-native-sha256'), createHash('sha256').update(chartsCatalog).digest('hex') + '\n');
const browserDocs = [], browserExamples = [];
collect(resolve(root, 'skills/neural-charts-web/references'), browserDocs, '.md', 'neural-charts-web');
collect(resolve(root, 'skills/neural-charts-web/examples'), browserExamples, '.ts', 'neural-charts-web');
for (const [library, version] of Object.entries(CHARTS_BROWSER_VERSIONS)) {
  const adapter = library.slice('charts-'.length);
  const api = JSON.parse(readFileSync(resolve(root, `evidence/${library}-api.json`), 'utf8'));
  if (api.package !== `@neural-charts/${adapter}` || api.version !== version) throw new Error(`Unsupported ${library} catalogue version`);
  const documents = browserDocs.filter(doc => doc.id === `references/${adapter}`);
  const examples = browserExamples.filter(example => example.id === `examples/line-${adapter}`);
  if (!documents.length || !examples.length) throw new Error(`Missing documents or examples for ${library}`);
  const contents = JSON.stringify({ schemaVersion: 1, api, documents, examples }) + '\n';
  writeFileSync(resolve(pkg, `data/${library}-catalog.json`), contents);
  writeFileSync(resolve(pkg, `data/${library}-sha256`), createHash('sha256').update(contents).digest('hex') + '\n');
}
copyFileSync(resolve(root, 'shared/usage-validator.mjs'), resolve(pkg, 'src/usage-validator.mjs'));
copyFileSync(resolve(root, 'LICENSE'), resolve(pkg, 'LICENSE'));
rmSync(resolve(pkg, 'dist'), { recursive: true, force: true });
execFileSync(process.execPath, [resolve(root, 'node_modules/typescript/bin/tsc'), '-p', resolve(pkg, 'tsconfig.json')], { stdio: 'inherit' });
copyFileSync(resolve(root, 'shared/usage-validator.mjs'), resolve(pkg, 'dist/usage-validator.mjs'));
chmodSync(resolve(pkg, 'dist/cli.js'), 0o755);
console.log(`MCP built for Neural UI Web, Native and four Charts catalogues (${chartsExamples.length + browserExamples.length} chart examples)`);
