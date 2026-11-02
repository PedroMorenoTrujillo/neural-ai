import assert from 'node:assert/strict';

export const REPOSITORY = 'PedroMorenoTrujillo/neural-ai';
export const OWNER = 'PedroMorenoTrujillo';

export function verifyParentRun(run, commit) {
  assert.equal(run?.repository?.full_name, REPOSITORY);
  assert.equal(run?.head_repository?.full_name, REPOSITORY);
  assert.equal(run?.path, '.github/workflows/verify.yml');
  assert.equal(run?.event, 'push');
  assert.equal(run?.head_branch, 'main');
  assert.equal(run?.head_sha, commit);
  assert.equal(run?.actor?.login, OWNER);
  assert.equal(run?.triggering_actor?.login, OWNER);
  assert.equal(run?.status, 'completed');
  assert.equal(run?.conclusion, 'success');
}

export async function authorizeRelease(env = process.env) {
  if (env.GITHUB_ACTIONS !== 'true') return;
  assert.equal(env.GITHUB_REPOSITORY, REPOSITORY);
  if (env.GITHUB_ACTOR === OWNER && env.GITHUB_TRIGGERING_ACTOR === OWNER) {
    assert.ok(['push', 'workflow_dispatch'].includes(env.GITHUB_EVENT_NAME));
    return;
  }
  assert.equal(env.GITHUB_EVENT_NAME, 'workflow_dispatch');
  assert.equal(env.GITHUB_ACTOR, 'github-actions[bot]');
  assert.equal(env.GITHUB_TRIGGERING_ACTOR, 'github-actions[bot]');
  assert.match(env.PARENT_RUN_ID || '', /^\d+$/);
  assert.match(env.GITHUB_SHA || '', /^[a-f0-9]{40}$/);
  assert.ok(env.GH_TOKEN, 'Read access to the actual parent run is required');
  for (let attempt = 0; attempt < 24; attempt++) {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/actions/runs/${env.PARENT_RUN_ID}`, {
      headers: { Authorization: `Bearer ${env.GH_TOKEN}`, Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(20_000),
    });
    assert.equal(response.status, 200);
    const run = await response.json();
    if (run.status === 'completed') { verifyParentRun(run, env.GITHUB_SHA); return; }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  throw new Error('The owner-reviewed parent verification did not finish successfully');
}
