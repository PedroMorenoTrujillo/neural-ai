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
const nativeSkill = readFileSync(resolve(root, 'skills/neural-native/SKILL.md'), 'utf8');
const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(nativeSkill)?.[1] || '';
export const NATIVE_SKILL_VERSION = /^  version:\s*["']([^"']+)["']\s*$/m.exec(frontmatter)?.[1];
assert.match(WEB_VERSION || '', /^2\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/, 'The Web skill only accepts pinned stable Core v2 versions');
assert.match(NATIVE_VERSION || '', /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, 'Native must have its own pinned package version');
for (const version of [MCP_VERSION, WEB_SKILL_VERSION, NATIVE_SKILL_VERSION]) assert.match(version || '', /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
assert.equal(mcp.name, 'neural-ui-mcp');
