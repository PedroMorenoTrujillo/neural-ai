import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, lstatSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { WEB_SKILL_VERSION, NATIVE_SKILL_VERSION, CHARTS_SKILL_VERSION, MCP_VERSION } from './release-state.mjs';
import { OWNER, REPOSITORY } from './release-authorization.mjs';

const root = resolve(import.meta.dirname, '..');
const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, encoding: 'utf8', maxBuffer: 4e6 }).trim();
const git = args => run('git', args);
const gh = args => run('gh', args);
assert.equal(process.env.GITHUB_REPOSITORY, REPOSITORY);
assert.equal(process.env.GITHUB_ACTOR, OWNER);
assert.equal(process.env.GITHUB_TRIGGERING_ACTOR, OWNER);
assert.equal(process.env.GITHUB_EVENT_NAME, 'push');
assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
const commit = git(['rev-parse', 'HEAD']);
assert.equal(commit, process.env.GITHUB_SHA);
git(['merge-base', '--is-ancestor', commit, 'origin/main']);
function tag(name) {
  const existing = run('git', ['tag', '--list', name]);
  if (existing) return false;
  git(['tag', name, commit]);
  git(['push', 'origin', `refs/tags/${name}`]);
  return true;
}
function files(directory, prefix = '') {
  return readdirSync(directory).flatMap(name => {
    const relative = prefix ? prefix + '/' + name : name;
    const path = join(directory, name);
    assert.ok(!lstatSync(path).isSymbolicLink(), 'Skill archives may not contain symbolic links');
    return lstatSync(path).isDirectory() ? files(path, relative) : [relative];
  }).sort();
}
async function releaseExists(name) {
  const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/releases/tags/${name}`, { headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` }, signal: AbortSignal.timeout(20_000) });
  assert.ok(response.status === 200 || response.status === 404, `Release lookup failed: ${response.status}`);
  return response.status === 200;
}
for (const [skill, version, name, output] of [
  ['neural-ui', WEB_SKILL_VERSION, `v${WEB_SKILL_VERSION}`, 'dist'],
  ['neural-native', NATIVE_SKILL_VERSION, `neural-native-v${NATIVE_SKILL_VERSION}`, 'dist/native-skill'],
  ['neural-charts-native', CHARTS_SKILL_VERSION, `neural-charts-native-v${CHARTS_SKILL_VERSION}`, 'dist/charts-native-skill'],
]) {
  tag(name);
  assert.equal(git(['rev-parse', `${name}:skills/${skill}`]), git(['rev-parse', `HEAD:skills/${skill}`]), `The ${skill} version was not bumped after changing its content`);
  const archive = `${skill}-${version}.tar.gz`;
  if (await releaseExists(name)) {
    const temporary = mkdtempSync(join(tmpdir(), 'neural-existing-skill-'));
    try {
      gh(['release', 'download', name, '--repo', REPOSITORY, '--pattern', archive, '--dir', temporary]);
      const entries = run('tar', ['-tzf', join(temporary, archive)]).split('\n');
      assert.ok(entries.every(entry => entry.startsWith(skill + '/') && !entry.split('/').includes('..')), 'Unsafe archive path');
      run('tar', ['-xzf', join(temporary, archive), '-C', temporary]);
      const installed = join(temporary, skill), source = join(root, 'skills', skill);
      assert.deepEqual(files(installed), files(source));
      for (const file of files(source)) assert.ok(readFileSync(join(source, file)).equals(readFileSync(join(installed, file))), `Published skill differs: ${file}`);
      console.log(`Preserved existing ${name} and verified every published skill file`);
    } finally { rmSync(temporary, { recursive: true, force: true }); }
  } else {
    gh(['release', 'create', name, '--repo', REPOSITORY, '--verify-tag', '--title', `${skill} ${version}`, '--notes', `Owner-reviewed ${skill} ${version}. Each skill keeps its own version and library baseline.`, join(output, archive), join(output, 'SHA256SUMS')]);
  }
}
const mcpTag = `mcp-v${MCP_VERSION}`;
const created = tag(mcpTag);
// A GITHUB_TOKEN tag push intentionally does not trigger another workflow.
// Dispatch the immutable tag explicitly; that workflow verifies this successful owner run.
if (created || !(await releaseExists(mcpTag))) {
  gh(['workflow', 'run', 'publish-mcp.yml', '--repo', REPOSITORY, '--ref', mcpTag, '-f', `parent_run_id=${process.env.GITHUB_RUN_ID}`]);
  console.log(`Dispatched ${mcpTag}; publication requires this parent run to finish successfully`);
} else console.log(`Preserved existing MCP release ${mcpTag}`);
