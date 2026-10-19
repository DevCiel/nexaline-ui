import { execFileSync } from 'node:child_process'; import { access, readFile } from 'node:fs/promises'; import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');const fixture=resolve(root,'tests/fixtures/consumer');const archives=['nexaline-ui-0.1.0-beta.1.tgz','nexaline-ui-core-0.1.0-beta.1.tgz','nexaline-ui-components-0.1.0-beta.1.tgz','nexaline-ui-js-0.1.0-beta.1.tgz','nexaline-ui-icons-lucide-0.1.0-beta.1.tgz'];
await Promise.all(archives.map(archive=>access(resolve(root,'release',archive))));
if(process.env.npm_execpath)execFileSync(process.execPath,[process.env.npm_execpath,'install','--offline','--ignore-workspace','--lockfile=false'],{cwd:fixture,stdio:'inherit'});
else if(process.platform==='win32')execFileSync('cmd.exe',['/d','/s','/c','corepack pnpm install --offline --ignore-workspace --lockfile=false'],{cwd:fixture,stdio:'inherit'});
else execFileSync('corepack',['pnpm','install','--offline','--ignore-workspace','--lockfile=false'],{cwd:fixture,stdio:'inherit'});
execFileSync(process.execPath,['runner.mjs'],{cwd:fixture,stdio:'inherit'});
const html=await readFile(resolve(root,'examples/html/index.html'),'utf8');
for(const asset of ['../../packages/nexaline-ui/dist/nexaline.css','../../packages/nexaline-ui/dist/nexaline.js']){if(!html.includes(asset))throw new Error(`No-build example is missing ${asset}`);await access(resolve(root,'examples/html',asset))}
console.log('No-build HTML asset paths verified.');
