import fs from 'node:fs';
import path from 'node:path';
import { root } from './api.mjs';
import { walk } from './validate.mjs';

const urls = new Set();
for (const file of walk(root).filter(f=>f.endsWith('.md'))) {
  for (const match of fs.readFileSync(file,'utf8').matchAll(/\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g)) urls.add(match[1].split('#')[0]);
}
const report = [];
// Optional historical directory citation, not an installation/API source. Keep
// its blocked status visible without failing the release of our own packages.
const optionalDiscoveryUrl = 'https://skillsmp.com/docs/faq';
function githubApiUrl(url) {
  if (url.hostname !== 'github.com') return;
  const [owner, repo, kind, ref, ...file] = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  if (!owner || !repo) return;
  const base = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  if (!kind) return base;
  if (kind === 'releases' && !ref) return base + '/releases?per_page=1';
  if (kind === 'blob' && ref && file.length) return base + '/contents/' + file.map(encodeURIComponent).join('/') + '?ref=' + encodeURIComponent(ref);
}
const queue = [...urls].sort();
await Promise.all(Array.from({length:4},async () => {
  while (queue.length) {
    const url = queue.shift();
    let lastError;
    for (let attempt=0;attempt<2;attempt++) {
      try {
        const response = await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'user-agent':'neural-ai-link-check/0.1'}});
        await response.body?.cancel();
        if (response.status===403 && url===optionalDiscoveryUrl) {
          report.push({url,status:403,verification:'unverified-optional-reference',reason:'Historical discovery directory blocks automated access'});
          lastError=undefined; break;
        }
        const parsed = new URL(url);
        const apiUrl = response.status >= 500 ? githubApiUrl(parsed) : undefined;
        if (apiUrl) {
          const checked = await fetch(apiUrl,{signal:AbortSignal.timeout(20000)});
          await checked.body?.cancel();
          if (!checked.ok) throw Error(`GitHub web returned ${response.status} and API returned ${checked.status}`);
          report.push({url,status:response.status,verification:'github-api',apiUrl,verifiedStatus:checked.status});
          lastError = undefined; break;
        }
        const packagePath = /^\/package\/((?:@[^/]+\/)?[^/]+)\/?$/.exec(parsed.pathname);
        if (response.status===403 && parsed.hostname==='www.npmjs.com' && packagePath) {
          // npm's website can block automated clients. Verify this exact package
          // through its public registry; record the 403 rather than masking it.
          const name = decodeURIComponent(packagePath[1]);
          const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(name)}`;
          const checked = await fetch(registryUrl,{signal:AbortSignal.timeout(20000)});
          if (!checked.ok || (await checked.json()).name!==name) throw Error('npm website blocked and package registry verification failed');
          report.push({url,status:403,verification:'npm-registry',registryUrl,verifiedStatus:200});
          lastError = undefined; break;
        }
        if (!response.ok) throw Error(`HTTP ${response.status}`);
        report.push({url,status:response.status,finalUrl:response.url});
        lastError = undefined; break;
      } catch(error) { lastError = error.message; }
    }
    if (lastError) report.push({url,error:lastError});
  }
}));
report.sort((a,b)=>a.url.localeCompare(b.url));
fs.mkdirSync(path.join(root,'test-results'),{recursive:true});
fs.writeFileSync(path.join(root,'test-results/links.json'),JSON.stringify(report,null,2)+'\n');
const failures = report.filter(r=>r.error);
const blocked = report.filter(r=>r.verification==='unverified-optional-reference');
for (const result of failures) console.error(`${result.url}: ${result.error}`);
for (const result of blocked) console.warn(`Unverified optional reference: ${result.url} (HTTP ${result.status})`);
console.log(`${report.length-failures.length-blocked.length}/${report.length} external links verified; ${blocked.length} optional historical references blocked (${report.filter(r=>r.verification==='npm-registry').length} npm website blocks checked through registry); report: test-results/links.json`);
if (failures.length) process.exitCode = 1;
