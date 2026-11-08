import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = file => JSON.parse(readFileSync(resolve(root, file), 'utf8'));
const pkg = read('package.json');
const mcp = read('packages/mcp/package.json');
export const WEB_VERSION = pkg.devDependencies['@neural-ui/core'];
export const NATIVE_VERSION = pkg.devDependencies['@neural-ui/native'];
export const MCP_VERSION = mcp.version;
export const WEB_SKILL_VERSION = pkg.version;
function skillMetadata(skill, key) {
  const source = readFileSync(resolve(root, 'skills', skill, 'SKILL.md'), 'utf8');
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] || '';
  return new RegExp(`^  ${key}:\\s*["']([^"']+)["']\\s*$`, 'm').exec(frontmatter)?.[1];
}
export const NATIVE_SKILL_VERSION = skillMetadata('neural-native', 'version');
export const CHARTS_SKILL_VERSION = skillMetadata('neural-charts-native', 'version');
export const CHARTS_VERSION = skillMetadata('neural-charts-native', 'library-version');
assert.match(WEB_VERSION || '', /^2\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/, 'The Web skill only accepts pinned stable Core v2 versions');
assert.match(NATIVE_VERSION || '', /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, 'Native must have its own pinned package version');
for (const version of [MCP_VERSION, WEB_SKILL_VERSION, NATIVE_SKILL_VERSION, CHARTS_SKILL_VERSION, CHARTS_VERSION]) assert.match(version || '', /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
assert.equal(mcp.name, 'neural-ui-mcp');
