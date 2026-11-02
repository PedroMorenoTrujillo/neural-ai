import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MCP_VERSION, WEB_VERSION, NATIVE_VERSION } from './release-state.mjs';

const file = resolve(import.meta.dirname, '../packages/mcp/src/release-versions.ts');
export function generateMcpVersions(check = false) {
  const content = `// Generated from package manifests; each product keeps its own version.\nexport const MCP_VERSION = '${MCP_VERSION}';\nexport const LIBRARY_VERSIONS = { web: '${WEB_VERSION}', native: '${NATIVE_VERSION}' } as const;\nexport const SUPPORTED_LIBRARY_VERSIONS = [LIBRARY_VERSIONS.web, LIBRARY_VERSIONS.native] as const;\n`;
  if (check) {
    if (readFileSync(file, 'utf8') !== content) throw new Error('MCP runtime versions differ from the package manifests');
  } else writeFileSync(file, content);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateMcpVersions(process.argv.includes('--check'));
