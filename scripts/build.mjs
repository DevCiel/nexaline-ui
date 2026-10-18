import { build } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { browserBuildTargets } from '../config/browser-support.mjs';
import { generateCss } from './generate-css.mjs';

const root=resolve(import.meta.dirname,'..');
await generateCss();
const out=resolve(root,'packages/nexaline-ui/dist');
const jsOut=resolve(root,'packages/javascript/dist');
const iconsOut=resolve(root,'packages/icons-lucide/dist');
const coreOut=resolve(root,'packages/core/dist');const componentsOut=resolve(root,'packages/components/dist');
await mkdir(out,{recursive:true}); await mkdir(jsOut,{recursive:true});await mkdir(iconsOut,{recursive:true});await mkdir(coreOut,{recursive:true});await mkdir(componentsOut,{recursive:true});
const cssEntries={
  'nexaline-core':'packages/core/src/index.css',
  'nexaline-components':'packages/components/src/components.css',
  'nexaline-utilities':'packages/core/src/utilities/utilities.css',
  'nexaline':'packages/nexaline-ui/nexaline.css',
  'nexaline-no-reset':'packages/nexaline-ui/nexaline-no-reset.css'
};
for(const [name,input] of Object.entries(cssEntries)){
  await build({entryPoints:[resolve(root,input)],outfile:resolve(out,`${name}.css`),bundle:true,loader:{'.css':'css'},legalComments:'inline',sourcemap:true});
}
for(const [source,destination] of [['nexaline-core.css','core.css'],['nexaline-core.css.map','core.css.map'],['nexaline-utilities.css','utilities.css'],['nexaline-utilities.css.map','utilities.css.map']])await copyFile(resolve(out,source),resolve(coreOut,destination));
for(const [source,destination] of [['nexaline-components.css','components.css'],['nexaline-components.css.map','components.css.map']])await copyFile(resolve(out,source),resolve(componentsOut,destination));
await build({entryPoints:[resolve(root,'packages/javascript/src/index.ts')],outfile:resolve(out,'nexaline.es.js'),bundle:true,format:'esm',sourcemap:true,target:browserBuildTargets});
await build({entryPoints:[resolve(root,'packages/javascript/src/index.ts')],outfile:resolve(out,'nexaline.js'),bundle:true,format:'iife',globalName:'NexalineUIBundle',sourcemap:true,target:browserBuildTargets});
await build({entryPoints:[resolve(root,'packages/javascript/src/index.ts')],outfile:resolve(out,'nexaline.cjs'),bundle:true,format:'cjs',sourcemap:true,target:browserBuildTargets});
await build({entryPoints:{index:resolve(root,'packages/javascript/src/index.ts'),dialog:resolve(root,'packages/javascript/src/dialog.ts'),drawer:resolve(root,'packages/javascript/src/drawer.ts'),disclosure:resolve(root,'packages/javascript/src/disclosure.ts'),tabs:resolve(root,'packages/javascript/src/tabs.ts'),dropdown:resolve(root,'packages/javascript/src/dropdown.ts'),toast:resolve(root,'packages/javascript/src/toast.ts'),theme:resolve(root,'packages/javascript/src/theme.ts')},outdir:jsOut,bundle:true,format:'esm',sourcemap:true,target:browserBuildTargets});
await build({entryPoints:[resolve(root,'packages/icons-lucide/src/index.ts')],outfile:resolve(iconsOut,'index.js'),bundle:true,format:'esm',sourcemap:true,target:browserBuildTargets});
execFileSync(process.execPath,[resolve(root,'node_modules/typescript/bin/tsc'),'--declaration','--emitDeclarationOnly','--outDir',resolve(root,'.types'),'--skipLibCheck'],{cwd:root,stdio:'inherit'});
await copyFile(resolve(root,'.types/packages/javascript/src/index.d.ts'),resolve(out,'index.d.ts'));
for(const name of ['index','dialog','drawer','disclosure','tabs','dropdown','toast','theme','shared'])await copyFile(resolve(root,`.types/packages/javascript/src/${name}.d.ts`),resolve(jsOut,`${name}.d.ts`));
await copyFile(resolve(root,'.types/packages/icons-lucide/src/index.d.ts'),resolve(iconsOut,'index.d.ts'));
await copyFile(resolve(root,'README.md'),resolve(root,'packages/nexaline-ui/README.md'));
await copyFile(resolve(root,'LICENSE'),resolve(root,'packages/nexaline-ui/LICENSE'));
for(const directory of ['core','components','javascript','icons-lucide'])await copyFile(resolve(root,'LICENSE'),resolve(root,`packages/${directory}/LICENSE`));
await build({entryPoints:[resolve(out,'nexaline.css')],outfile:resolve(out,'nexaline.min.css'),bundle:true,minify:true,legalComments:'inline',sourcemap:true});
await build({entryPoints:[resolve(root,'packages/javascript/src/index.ts')],outfile:resolve(out,'nexaline.min.js'),bundle:true,format:'iife',globalName:'NexalineUIBundle',minify:true,sourcemap:true,target:browserBuildTargets});
console.log('Nexaline distribution built.');
