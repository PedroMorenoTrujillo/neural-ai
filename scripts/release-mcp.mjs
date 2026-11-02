import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export function assertReleaseActor(actor, triggeringActor) {
  if (actor !== 'PedroMorenoTrujillo' || triggeringActor !== 'PedroMorenoTrujillo') {
    throw new Error('Only PedroMorenoTrujillo may publish or retry an MCP release');
  }
}
export function releaseIdentity(tag, version) {
  if (!/^mcp-v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag ?? '') || tag !== 'mcp-v' + version) throw new Error('MCP tag must exactly match the package version');
  const channel = version.includes('-') ? version.split('-')[1].split('.')[0] : 'latest';
  if (!/^[a-z][a-z0-9-]*$/.test(channel)) throw new Error('Unsupported npm channel');
  return { tag, version, channel, name: 'neural-ui-mcp' };
}
function identity() {
  if (process.env.GITHUB_ACTIONS === 'true') assertReleaseActor(process.env.GITHUB_ACTOR, process.env.GITHUB_TRIGGERING_ACTOR);
  if (process.env.GITHUB_REF_TYPE !== 'tag') throw new Error('MCP publication requires a tag push');
  const pkg = read('packages/mcp/package.json');
  if (pkg.name !== 'neural-ui-mcp' || pkg.private) throw new Error('Unexpected MCP package');
  const release = releaseIdentity(process.env.GITHUB_REF_NAME, pkg.version);
  const server = fs.readFileSync(path.join(root, 'packages/mcp/src/server.ts'), 'utf8');
  if (!server.includes(`export const VERSION = '${pkg.version}'`)) throw new Error('MCP server and package versions differ');
  return release;
}
function verify(file, manifest) {
  if (hash(file) !== manifest.sha256) throw new Error('MCP archive checksum mismatch');
  const pkg = JSON.parse(execFileSync('tar', ['-xOf', file, 'package/package.json'], { encoding: 'utf8' }));
  if (pkg.name !== manifest.name || pkg.version !== manifest.version || pkg.private) throw new Error('MCP archive identity mismatch');
  const files = execFileSync('tar', ['-tzf', file], { encoding: 'utf8' }).trim().split('\n');
  if (files.some(file => file.split('/').includes('..') || !/^package\/(?:dist\/|data\/|README\.md$|LICENSE$|package\.json$)/.test(file))) throw new Error('Unexpected private file in public MCP archive');
}
export function main(command) {
  const release = identity();
  if (command === 'identity') { console.log(JSON.stringify(release)); return; }
  const directory = path.join(root, 'dist/mcp/release');
  if (command === 'prepare') {
    fs.mkdirSync(directory, { recursive: true });
    const result = JSON.parse(execFileSync('npm', ['pack', './packages/mcp', '--pack-destination', directory, '--json'], { cwd: root, encoding: 'utf8', maxBuffer: 2e6 }))[0];
    const file = path.join(directory, result.filename);
    const manifest = { ...release, file: result.filename, sha256: hash(file), commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim() };
    verify(file, manifest);
    fs.writeFileSync(path.join(directory, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  } else if (command !== 'verify') throw new Error('Use identity, prepare or verify');
  const manifest = read('dist/mcp/release/release-manifest.json');
  for (const key of ['name', 'version', 'tag', 'channel']) if (manifest[key] !== release[key]) throw new Error('MCP manifest identity mismatch');
  if (manifest.commit !== execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()) throw new Error('MCP artifact belongs to another commit');
  if (path.basename(manifest.file) !== manifest.file) throw new Error('Invalid MCP artifact path');
  verify(path.join(directory, manifest.file), manifest);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `file=dist/mcp/release/${manifest.file}\nchannel=${release.channel}\nversion=${release.version}\n`);
  console.log(JSON.stringify({ verified: true, ...release, sha256: manifest.sha256 }));
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main(process.argv[2]);
