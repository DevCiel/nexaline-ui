import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const assets = ['nexaline.min.css', 'nexaline.min.css.map', 'nexaline.min.js', 'nexaline.min.js.map'];
const publicDirectories = [
  'tests/fixtures/codeigniter-app/public/assets',
  'tests/fixtures/laravel-app/public/assets',
];

for (const directory of publicDirectories) {
  const target = resolve(root, directory);
  await mkdir(target, { recursive: true });
  await Promise.all(assets.map((asset) => copyFile(
    resolve(root, 'packages/nexaline-ui/dist', asset),
    resolve(target, asset),
  )));
}

const phpBinary = spawnSync('php', ['-r', 'echo PHP_BINARY;'], { encoding: 'utf8' }).stdout.trim();
const extensionDirectory = resolve(dirname(phpBinary), 'ext').replaceAll('\\', '/');
await writeFile(
  resolve(root, 'tests/fixtures/codeigniter-app/php-runtime.ini'),
  `extension_dir="${extensionDirectory}"\nextension=intl\nextension=mbstring\ndate.timezone=UTC\n`,
);

console.log('Prepared CodeIgniter and Laravel fixture assets.');
