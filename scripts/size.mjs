import { readFile } from 'node:fs/promises'; import { gzipSync, brotliCompressSync } from 'node:zlib'; import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..','packages/nexaline-ui/dist');
for(const file of ['nexaline.min.css','nexaline.min.js']){const data=await readFile(resolve(root,file));console.log(`${file}: raw ${(data.length/1024).toFixed(2)} KiB, gzip ${(gzipSync(data).length/1024).toFixed(2)} KiB, brotli ${(brotliCompressSync(data).length/1024).toFixed(2)} KiB`)}
