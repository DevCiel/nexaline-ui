import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const releaseDirectory = resolve(root, 'release');
const manifestPath = resolve(releaseDirectory, 'manifest.json');
const packageDirectories = ['nexaline-ui', 'core', 'components', 'javascript', 'icons-lucide'];

const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const tarballName = (name, version) => `${name.replace('@', '').replace('/', '-')}-${version}.tgz`;

export async function createReleaseManifest() {
  const artifacts = [];
  let version;
  for (const directory of packageDirectories) {
    const packageJson = JSON.parse(await readFile(resolve(root, 'packages', directory, 'package.json'), 'utf8'));
    version ??= packageJson.version;
    if (packageJson.version !== version) throw new Error(`Package version mismatch: ${packageJson.name}@${packageJson.version}`);
    const filename = tarballName(packageJson.name, packageJson.version);
    const content = await readFile(resolve(releaseDirectory, filename));
    artifacts.push({ package: packageJson.name, version: packageJson.version, filename, bytes: content.byteLength, sha256: sha256(content) });
  }
  return `${JSON.stringify({ schemaVersion: 1, algorithm: 'sha256', version, artifacts }, null, 2)}\n`;
}

export async function writeReleaseManifest() {
  const content = await createReleaseManifest();
  await writeFile(manifestPath, content);
  return content;
}

export async function verifyReleaseManifest() {
  const expected = await createReleaseManifest();
  const actual = await readFile(manifestPath, 'utf8');
  if (actual !== expected) throw new Error('Release manifest does not match the local tarballs. Run: corepack pnpm release:manifest');
  return JSON.parse(actual);
}

const invokedPath = process.argv[1] ? fileURLToPath(import.meta.url) === resolve(process.argv[1]) : false;
if (invokedPath) {
  const verifying = process.argv.includes('--check');
  const result = verifying ? await verifyReleaseManifest() : JSON.parse(await writeReleaseManifest());
  console.log(`${verifying ? 'Verified' : 'Recorded'} ${result.artifacts.length} release artifacts for ${result.version}.`);
}
