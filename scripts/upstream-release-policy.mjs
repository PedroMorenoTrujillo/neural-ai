import assert from 'node:assert/strict';
import { isDeepStrictEqual } from 'node:util';

export function pinnedVersion(value) {
  assert.match(value || '', /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/);
  return value;
}
export function compareVersions(a, b) {
  pinnedVersion(a); pinnedVersion(b);
  const parse = v => { const i = v.indexOf('-'); return { n: (i < 0 ? v : v.slice(0, i)).split('.').map(BigInt), p: i < 0 ? [] : v.slice(i + 1).split('.') }; };
  const x = parse(a), y = parse(b);
  for (let i = 0; i < 3; i++) if (x.n[i] !== y.n[i]) return x.n[i] < y.n[i] ? -1 : 1;
  if (!x.p.length || !y.p.length) return x.p.length ? -1 : y.p.length ? 1 : 0;
  for (let i = 0; i < Math.max(x.p.length, y.p.length); i++) {
    const l = x.p[i], r = y.p[i];
    if (l === r) continue;
    if (l === undefined) return -1;
    if (r === undefined) return 1;
    const ln = /^\d+$/.test(l), rn = /^\d+$/.test(r);
    if (ln && rn) return BigInt(l) < BigInt(r) ? -1 : 1;
    if (ln !== rn) return ln ? -1 : 1;
    return l < r ? -1 : 1;
  }
  return 0;
}
export function selectUpstream(scope, packument, current) {
  pinnedVersion(current);
  const expected = scope === 'web' ? '@neural-ui/core' : '@neural-ui/native';
  assert.equal(packument.name, expected);
  let candidates;
  if (scope === 'web') {
    assert.match(current, /^2\.\d+\.\d+$/);
    candidates = Object.keys(packument.versions || {}).filter(version => /^2\.\d+\.\d+$/.test(version));
  } else {
    assert.equal(scope, 'native');
    const channel = current.includes('-') ? current.split('-')[1].split('.')[0] : null;
    candidates = [packument['dist-tags']?.latest, channel ? packument['dist-tags']?.[channel] : null, current]
      .filter(version => version && (!version.includes('-') || (channel && version.split('-')[1].split('.')[0] === channel)));
  }
  const available = [...new Set(candidates)].filter(version => packument.versions[version] && !packument.versions[version].deprecated && compareVersions(version, current) >= 0);
  available.sort(compareVersions);
  const version = available.at(-1);
  assert.ok(version, 'No compatible published upstream version');
  const metadata = packument.versions[version];
  assert.equal(metadata.name, expected);
  assert.equal(metadata.version, version);
  const short = scope === 'web' ? 'core' : 'native';
  assert.equal(metadata.dist?.tarball, `https://registry.npmjs.org/@neural-ui/${short}/-/${short}-${version}.tgz`);
  assert.match(metadata.dist.integrity, /^sha512-[A-Za-z0-9+/]+=*$/);
  return metadata;
}
export function verifyProducer(run, repository, version, commit) {
  assert.equal(run?.repository?.full_name, repository);
  assert.equal(run?.event, 'push');
  assert.equal(run?.status, 'completed');
  assert.equal(run?.conclusion, 'success');
  assert.equal(run?.path, '.github/workflows/publish.yml');
  assert.equal(run?.head_branch, `v${version}`);
  assert.equal(run?.head_sha, commit);
  assert.equal(run?.actor?.login, 'PedroMorenoTrujillo');
  assert.equal(run?.triggering_actor?.login, 'PedroMorenoTrujillo');
  assert.match(commit, /^[a-f0-9]{40}$/);
}
export function apiDiff(before, after) {
  assert.equal(before.package, after.package);
  const added = [], breaking = [];
  for (const [entry, oldEntry] of Object.entries(before.entrypoints)) {
    const next = after.entrypoints[entry];
    if (!next) { breaking.push(`Removed entrypoint ${entry}`); continue; }
    for (const symbol of oldEntry.symbols) {
      const replacement = next.symbols.find(candidate => candidate.name === symbol.name);
      if (!replacement) { breaking.push(`Removed ${entry}#${symbol.name}`); continue; }
      if (symbol.kind !== 'ClassDeclaration') {
        if (!isDeepStrictEqual(symbol, replacement)) breaking.push(`Changed declaration ${entry}#${symbol.name}`);
        continue;
      }
      for (const key of ['kind', 'angularKind', 'selector']) if (symbol[key] !== replacement[key]) breaking.push(`Changed ${key} ${entry}#${symbol.name}`);
      for (const key of ['inputs', 'outputs', 'members']) {
        for (const member of symbol[key] || []) {
          if (!(replacement[key] || []).some(candidate => isDeepStrictEqual(candidate, member))) breaking.push(`Changed ${key} ${entry}#${symbol.name}.${member.name}`);
        }
      }
      for (const input of replacement.inputs || []) {
        if (input.required && !(symbol.inputs || []).some(old => old.alias === input.alias)) breaking.push(`New required input ${entry}#${symbol.name}.${input.alias}`);
      }
    }
  }
  for (const [entry, next] of Object.entries(after.entrypoints)) {
    const previous = before.entrypoints[entry];
    if (!previous) added.push(`New entrypoint ${entry}`);
    else for (const symbol of next.symbols) if (!previous.symbols.some(old => old.name === symbol.name)) added.push(`New export ${entry}#${symbol.name}`);
  }
  return { added: [...new Set(added)], breaking: [...new Set(breaking)] };
}
