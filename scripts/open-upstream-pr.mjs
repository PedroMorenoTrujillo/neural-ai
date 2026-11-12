import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { REPOSITORY } from './release-authorization.mjs';
const root = resolve(import.meta.dirname, '..');
const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, encoding: 'utf8' }).trim();
assert.equal(process.env.GITHUB_REPOSITORY, REPOSITORY);
assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
if (!existsSync(resolve(root, 'evidence/release-sync-plan.json'))) process.exit(0);
if (JSON.parse(run('gh', ['pr', 'list', '--repo', REPOSITORY, '--state', 'open', '--search', 'in:title chore: sync published Neural baselines', '--json', 'number'])).length) process.exit(0);
const plan = JSON.parse(readFileSync(resolve(root, 'evidence/release-sync-plan.json'), 'utf8'));
const branch = `codex/sync-published-${process.env.GITHUB_RUN_ID}`;
run('git', ['switch', '-c', branch]);
run('git', ['config', 'user.name', 'github-actions[bot]']);
run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
run('git', ['add', 'package.json', 'package-lock.json', 'packages/mcp/package.json', 'packages/mcp/package-lock.json', 'packages/mcp/src/release-versions.ts', 'skills', 'evidence',
  'tests/distribution/consumer-package.json', 'tests/distribution/consumer-package-lock.json']);
run('git', ['commit', '-m', 'chore: sync published Neural baselines']);
run('git', ['push', 'origin', `HEAD:refs/heads/${branch}`]);
const body = resolve(process.env.RUNNER_TEMP || '/tmp', 'neural-upstream-pr.md');
writeFileSync(body, `Updates only the skills whose published library changed, with an independent MCP patch version. Web remains on Core v2; Native keeps its own baseline. Angular and Angular Native framework versions are unchanged.\n\nAPI changes require PedroMorenoTrujillo's review before publication.\n\n\`\`\`json\n${JSON.stringify(plan, null, 2)}\n\`\`\`\n`);
console.log(run('gh', ['pr', 'create', '--repo', REPOSITORY, '--base', 'main', '--head', branch, '--title', 'chore: sync published Neural baselines', '--body-file', body]));
// Token-created PR events do not start CI; workflow_dispatch does.
run('gh', ['workflow', 'run', 'verify.yml', '--repo', REPOSITORY, '--ref', branch]);
