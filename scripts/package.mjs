import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { root } from './api.mjs';
import { localLinks, validateSkill, walk } from './validate.mjs';
import { parse as parseYaml } from 'yaml';

const native = process.argv.includes('--native');
const skill = native ? 'neural-native' : 'neural-ui';
const skillPath = path.join(root, 'skills', skill);
const metadata = parseYaml(/^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(path.join(skillPath, 'SKILL.md'), 'utf8'))[1]);
const version = native ? metadata.metadata.version : JSON.parse(fs.readFileSync(path.join(root,'package.json'))).version;
// Refuse to package a stale committed skill when working-tree edits exist.
const changes = execFileSync('git',['status','--porcelain','--untracked-files=all','--',`skills/${skill}`],{cwd:root,encoding:'utf8'});
if(changes.trim()) throw Error('Commit the validated skill before packaging');
const output = path.join(root,'dist', ...(native ? ['native-skill'] : []));
fs.mkdirSync(output,{recursive:true});
const name = `${skill}-${version}.tar.gz`;
execFileSync('git',['archive','--format=tar.gz',`--prefix=${skill}/`,`--output=${path.join(output,name)}`,`HEAD:skills/${skill}`],{cwd:root,stdio:'pipe'});
const digest = crypto.createHash('sha256').update(fs.readFileSync(path.join(output,name))).digest('hex');
fs.writeFileSync(path.join(output,'SHA256SUMS'),`${digest}  ${name}\n`);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'neural-ai-package-'));
try {
  execFileSync('tar',['-xzf',path.join(output,name),'-C',temporary],{stdio:'pipe'});
  const installed = path.join(temporary,skill);
  const errors = validateSkill(fs.readFileSync(path.join(installed,'SKILL.md'),'utf8'),skill);
  const files = walk(installed);
  for (const file of files) {
    const relative = path.relative(installed,file);
    if(!fs.readFileSync(file).equals(fs.readFileSync(path.join(skillPath,relative)))) errors.push(`Archive mismatch: ${relative}`);
    if(file.endsWith('.md')) errors.push(...localLinks(file,fs.readFileSync(file,'utf8')));
  }
  if(files.length!==walk(skillPath).length) errors.push('Archive omits skill resources');
  if(errors.length) throw Error(errors.join('\n'));
  console.log(`Verified archive extraction: ${files.length} files, identical contents and self-contained references.`);
} finally { fs.rmSync(temporary,{recursive:true,force:true}); }
console.log(`${path.relative(root,output)}/${name}\n${path.relative(root,output)}/SHA256SUMS`);
