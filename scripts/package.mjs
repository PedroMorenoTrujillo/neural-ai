import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { root } from './api.mjs';

const version = JSON.parse(fs.readFileSync(path.join(root,'package.json'))).version;
// Refuse to package a stale committed skill when working-tree edits exist.
const changes = execFileSync('git',['status','--porcelain','--untracked-files=all','--','skills/neural-ui'],{cwd:root,encoding:'utf8'});
if(changes.trim()) throw Error('Commit the validated skill before packaging');
const output = path.join(root,'dist');
fs.mkdirSync(output,{recursive:true});
const name = `neural-ui-${version}.tar.gz`;
execFileSync('git',['archive','--format=tar.gz','--prefix=neural-ui/',`--output=${path.join(output,name)}`,'HEAD:skills/neural-ui'],{cwd:root,stdio:'pipe'});
const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(output,name))).digest('hex');
fs.writeFileSync(path.join(output,'SHA256SUMS'),`${digest}  ${name}\n`);
console.log(`dist/${name}\ndist/SHA256SUMS`);
