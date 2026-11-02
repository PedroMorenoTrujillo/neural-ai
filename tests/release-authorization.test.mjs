import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyParentRun, authorizeRelease, REPOSITORY, OWNER } from '../scripts/release-authorization.mjs';

const commit = 'a'.repeat(40);
const valid = { repository: { full_name: REPOSITORY }, head_repository: { full_name: REPOSITORY }, path: '.github/workflows/verify.yml', event: 'push', head_branch: 'main', head_sha: commit, actor: { login: OWNER }, triggering_actor: { login: OWNER }, status: 'completed', conclusion: 'success' };
test('only a successful owner main verification can authorize automatic publication', () => {
  verifyParentRun(valid, commit);
  for (const patch of [{ repository: { full_name: 'attacker/neural-ai' } }, { head_repository: { full_name: 'attacker/neural-ai' } }, { path: '.github/workflows/untrusted.yml' }, { event: 'pull_request' }, { head_branch: 'feature' }, { head_sha: 'b'.repeat(40) }, { actor: { login: 'contributor' } }, { triggering_actor: { login: 'contributor' } }, { status: 'in_progress' }, { conclusion: 'failure' }]) {
    assert.throws(() => verifyParentRun({ ...valid, ...patch }, commit));
  }
});
test('a fork, PR or bot without a verified parent cannot publish', async () => {
  const env = { GITHUB_ACTIONS: 'true', GITHUB_REPOSITORY: REPOSITORY, GITHUB_ACTOR: OWNER, GITHUB_TRIGGERING_ACTOR: OWNER, GITHUB_EVENT_NAME: 'push' };
  await authorizeRelease(env);
  for (const patch of [{ GITHUB_REPOSITORY: 'fork/neural-ai' }, { GITHUB_EVENT_NAME: 'pull_request' }, { GITHUB_ACTOR: 'github-actions[bot]' }, { GITHUB_TRIGGERING_ACTOR: 'outsider' }]) await assert.rejects(authorizeRelease({ ...env, ...patch }));
});
