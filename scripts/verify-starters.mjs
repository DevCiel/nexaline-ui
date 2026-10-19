import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const version = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8')).version;
const starters = [
  {directory:'no-build',archive:`nexaline-ui-no-build-starter-${version}.tgz`,required:['package/package.json','package/README.md','package/index.html']},
  {directory:'vite',archive:`nexaline-ui-vite-starter-${version}.tgz`,required:['package/package.json','package/README.md','package/index.html','package/src/main.js']},
];
for (const starter of starters) {
  const packageJson = JSON.parse(await readFile(resolve(root,'starters',starter.directory,'package.json'),'utf8'));
  if (packageJson.version !== version) throw new Error(`${starter.directory} starter version does not match ${version}.`);
  const archivePath = resolve(root,'apps','docs','public','downloads',starter.archive);
  const {stdout} = await exec('tar',['-tf',archivePath],{windowsHide:true});
  const entries = stdout.split(/\r?\n/).filter(Boolean).map((entry)=>entry.replace(/^\.\//,''));
  for (const required of starter.required) if (!entries.includes(required)) throw new Error(`${starter.archive} is missing ${required}.`);
  const {stdout:packedPackage} = await exec('tar',['-xOf',archivePath,'package/package.json'],{windowsHide:true});
  const archivedJson=JSON.parse(packedPackage);
  if (archivedJson.name!==packageJson.name||archivedJson.version!==version) throw new Error(`${starter.archive} metadata is stale.`);
  for (const required of starter.required.filter((entry)=>entry!=='package/package.json')) {
    const relativePath=required.replace('package/','');
    const source=await readFile(resolve(root,'starters',starter.directory,relativePath),'utf8');
    const {stdout:archived}=await exec('tar',['-xOf',archivePath,required],{windowsHide:true});
    if(archived!==source)throw new Error(`${starter.archive} contains stale content for ${relativePath}. Run: corepack pnpm pack:starters`);
  }
}
const noBuild=await readFile(resolve(root,'starters','no-build','index.html'),'utf8');
const viteMain=await readFile(resolve(root,'starters','vite','src','main.js'),'utf8');
if(!noBuild.includes(`nexaline-ui@${version}/dist/nexaline.min.css`)||!noBuild.includes(`nexaline-ui@${version}/dist/nexaline.min.js`))throw new Error('No-build starter assets are not pinned to the workspace version.');
if(!viteMain.includes("import 'nexaline-ui/css'")||!viteMain.includes("import { init } from 'nexaline-ui'"))throw new Error('Vite starter does not consume the public exports.');
console.log(`Verified ${starters.length} downloadable starters for ${version}.`);
