import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { root } from './api.mjs';

const evidence = JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json')));
const get = async url => {
  const response = await fetch(url,{signal:AbortSignal.timeout(30000)});
  if (!response.ok) throw Error(`${url}: HTTP ${response.status}`);
  return response;
};
const raw = `https://raw.githubusercontent.com/PedroMorenoTrujillo/neural-ui-workspace/${evidence.source.commit}/projects/ui-core`;
// Independent network reads; bounded to four requests in flight.
const [registry,policy,sourcePackage,tarball] = await Promise.all([
  get(`https://registry.npmjs.org/@neural-ui%2fcore/${evidence.package.version}`).then(r=>r.json()),
  get(`${raw}/public-contract.policy.json`).then(r=>r.json()),
  get(`${raw}/package.json`).then(r=>r.json()),
  get(evidence.package.tarball).then(r=>r.arrayBuffer()),
]);
if (registry.version!==evidence.package.version || registry.dist.integrity!==evidence.package.integrity) throw Error('Registry metadata differs from reviewed evidence');
const actual = 'sha512-'+crypto.createHash('sha512').update(Buffer.from(tarball)).digest('base64');
if(actual!==evidence.package.integrity) throw Error('Tarball integrity mismatch');
if(sourcePackage.version!==evidence.package.version) throw Error('Source commit version differs from npm baseline');
const reviewedPolicy = JSON.parse(fs.readFileSync(path.join(root,'evidence/upstream-policy.json')));
if(JSON.stringify(policy)!==JSON.stringify(reviewedPolicy)) throw Error('Support policy differs from recorded source commit');
console.log(`Verified npm ${registry.version} tarball SHA-512 and source ${evidence.source.commit.slice(0,12)} support policy.`);

const native = JSON.parse(fs.readFileSync(path.join(root,'evidence/native-sources.json')));
const [nativeRegistry, nativePackage, nativeArchive] = await Promise.all([
  get(`https://registry.npmjs.org/@neural-ui%2fnative/${native.package.version}`).then(r=>r.json()),
  get(`https://raw.githubusercontent.com/PedroMorenoTrujillo/neural-native/${native.source.commit}/packages/native/package.json`).then(r=>r.json()),
  get(native.package.tarball).then(r=>r.arrayBuffer()),
]);
if (nativeRegistry.name !== native.package.name || nativeRegistry.version !== native.package.version || nativeRegistry.dist.integrity !== native.package.integrity || nativePackage.version !== native.package.version) throw Error('Native registry/source differs from reviewed evidence');
const nativeIntegrity = 'sha512-' + crypto.createHash('sha512').update(Buffer.from(nativeArchive)).digest('base64');
if (nativeIntegrity !== native.package.integrity) throw Error('Native tarball integrity mismatch');
console.log(`Verified Native npm ${native.package.version} SHA-512 and source ${native.source.commit.slice(0,12)}.`);
