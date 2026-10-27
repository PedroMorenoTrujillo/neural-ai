import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import { root } from './api.mjs';
import { localLinks, validateSkill, walk } from './validate.mjs';

const local = process.argv.includes('--local');
const tag = local ? 'working-tree' : `v${JSON.parse(fs.readFileSync(path.join(root,'package.json'))).version}`;
const fixtures = path.join(root,'tests/distribution');
const results = path.join(root,'test-results');
fs.mkdirSync(results,{recursive:true});
let project;
const existing = process.argv.indexOf('--existing');
if (existing>=0) {
  project = path.resolve(process.argv[existing+1] ?? '');
  const marker = path.join(project,'.neural-ai-verification');
  if(!fs.existsSync(marker) || fs.readFileSync(marker,'utf8').trim()!=='disposable-neural-ai-consumer') throw Error('Existing project must be a marked disposable consumer fixture');
} else {
  project = fs.mkdtempSync(path.join(os.tmpdir(),'neural-ai-consumer-'));
  // CLI directory is relative to its cwd; do not pass an absolute schematic path.
  execFileSync(path.join(root,'node_modules/.bin/ng'),['new','neural-ai-consumer','--directory',path.basename(project),'--skip-install','--skip-git','--skip-tests','--ssr','--standalone','--style=scss','--routing','--defaults','--ai-config=none'],{cwd:path.dirname(project),stdio:'pipe',env:{...process.env,NG_CLI_ANALYTICS:'false'}});
  fs.writeFileSync(path.join(project,'.neural-ai-verification'),'disposable-neural-ai-consumer\n');
}
const env = { ...process.env, NG_CLI_ANALYTICS:'false', DISABLE_TELEMETRY:'1' };
function run(label, command, args, cwd = project, extra = {}) {
  try {
    const output = execFileSync(command,args,{cwd,env:{...env,...extra},encoding:'utf8',stdio:['ignore','pipe','pipe'],timeout:120000,maxBuffer:8*1024*1024});
    fs.writeFileSync(path.join(results,`clean-${label}.log`),output);
    console.log(`${label}: passed`);
    return output;
  } catch(error) {
    fs.writeFileSync(path.join(results,`clean-${label}.log`),String(error.stdout)+String(error.stderr));
    console.error(`${label}: failed; see test-results/clean-${label}.log`);
    throw error;
  }
}
// This script owns the generated disposable project, including these complete files.
for(const [source,destination] of [['consumer-package.json','package.json'],['consumer-package-lock.json','package-lock.json']]) fs.copyFileSync(path.join(fixtures,source),path.join(project,destination));
run('npm-ci','npm',['ci','--no-fund','--no-audit']);
const skillSource = local ? path.join(root,'skills/neural-ui') : `https://github.com/PedroMorenoTrujillo/neural-ai/tree/${tag}/skills/neural-ui`;
run('skills-cli','npm',['exec','--yes','--package','skills@1.7.2','--','skills','add',skillSource,'--skill','neural-ui','--agent','codex','claude-code','--copy','--yes']);
const installedDirectories = ['.agents/skills/neural-ui','.claude/skills/neural-ui'];
const hashes = [];
for(const directory of installedDirectories) {
  const installed = path.join(project,directory);
  const content = fs.readFileSync(path.join(installed,'SKILL.md'),'utf8');
  const errors = validateSkill(content);
  for(const file of walk(installed).filter(f=>f.endsWith('.md'))) errors.push(...localLinks(file,fs.readFileSync(file,'utf8')));
  if(errors.length) throw Error(errors.join('\n'));
  hashes.push(crypto.createHash('sha256').update(content).digest('hex'));
}
if(hashes[0]!==hashes[1]) throw Error('Codex and Claude Code installed different instructions');
const lock = JSON.parse(fs.readFileSync(path.join(project,'skills-lock.json')));
if(!local && lock.skills['neural-ui']?.ref!==tag) throw Error('Skill installation did not pin the release');
if(local && hashes[0]!==crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'skills/neural-ui/SKILL.md'))).digest('hex')) throw Error('Installed skill differs from the working tree');
const configFile = path.join(project,'tsconfig.json');
const config = ts.readConfigFile(configFile,ts.sys.readFile).config;
config.compilerOptions.strict = true;
config.angularCompilerOptions.strictTemplates = true;
fs.writeFileSync(configFile,JSON.stringify(config,null,2)+'\n');
const angularFile = path.join(project,'angular.json');
const angular = JSON.parse(fs.readFileSync(angularFile));
angular.projects['neural-ai-consumer'].architect.build.options.security.allowedHosts = ['127.0.0.1','localhost'];
fs.writeFileSync(angularFile,JSON.stringify(angular,null,2)+'\n');
for(const [source,destination] of [['consumer-app.ts','src/app/app.ts'],['consumer-preset.ts','src/app/consumer-preset.ts'],['consumer-styles.scss','src/styles.scss']]) fs.copyFileSync(path.join(fixtures,source),path.join(project,destination));
const appConfig = path.join(project,'src/app/app.config.ts');
let app = fs.readFileSync(appConfig,'utf8');
if(!app.includes('provideClientHydration()')) throw Error('Unexpected CLI hydration scaffold');
app = app.replace("import { provideClientHydration }", "import { provideClientHydration, withEventReplay }")
  .replace("export const appConfig", "import { provideNeuralUI } from '@neural-ui/core';\nimport { consumerPreset } from './consumer-preset';\n\nexport const appConfig")
  .replace('provideClientHydration()',"provideClientHydration(withEventReplay()), provideNeuralUI({ locale: 'en', timeZone: 'UTC', theme: { preset: consumerPreset } })");
fs.writeFileSync(appConfig,app);
const routesFile = path.join(project,'src/app/app.routes.server.ts');
fs.writeFileSync(routesFile,fs.readFileSync(routesFile,'utf8').replace('RenderMode.Prerender','RenderMode.Server'));
const dependencyOutput = run('dependencies','npm',['ls','@neural-ui/core','@angular/core','@angular/forms','@angular/cdk','--json']);
const dependencies = JSON.parse(dependencyOutput).dependencies;
for(const name of ['@angular/core','@angular/forms','@angular/cdk']) if(dependencies[name]?.version!=='22.2.2') throw Error(`Unexpected ${name} version`);
if(dependencies['@neural-ui/core']?.version!=='2.0.3') throw Error('Unexpected Neural UI version');
const consumerLock = JSON.parse(fs.readFileSync(path.join(project,'package-lock.json')));
const provenance = JSON.parse(fs.readFileSync(path.join(root,'evidence/sources.json')));
if(consumerLock.packages['node_modules/@neural-ui/core']?.integrity!==provenance.package.integrity) throw Error('Consumer package integrity differs from the reviewed npm tarball');
const installedPackage = fs.realpathSync(path.join(project,'node_modules/@neural-ui/core'));
if(!installedPackage.startsWith(fs.realpathSync(project)+path.sep)) throw Error('Consumer is resolving Neural UI outside its own node_modules');
run('build',path.join(project,'node_modules/.bin/ng'),['build','--configuration','production']);
run('browser',path.join(root,'node_modules/.bin/playwright'),['test','--config','tests/distribution/playwright.config.ts'],root,{NEURAL_CONSUMER_PROJECT:project});
const summary = {
  date: new Date().toISOString(), release:tag, package:'@neural-ui/core@2.0.3', angular:'22.2.2', skillsCli:'1.7.2',
  independentDependencies:true, strictTemplates:true, installedAgents:['codex','claude-code'],
  installation:`${local ? 'Working tree' : 'GitHub release'} via skills CLI, copies with matching SHA-256`, installedSkillSha256:hashes[0],
  browserScenarios:2, browser:'Chromium', checks:['form create/validation/reset','Select scalar model','table sorting/selection','dialog reject/save/focus restoration','tabs keyboard','typed theme','375px layout','SSR without JavaScript','hydration without browser errors'],
  agentGenerationSessions:'not executed; primary agent applied installed skill directly',
};
fs.writeFileSync(path.join(results,'clean-install.json'),JSON.stringify(summary,null,2)+'\n');
console.log('Clean consumer verified; report: test-results/clean-install.json');
console.log(`Disposable project retained: ${project}`);
