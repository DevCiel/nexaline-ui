import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const read = (path: string) => readFile(resolve(process.cwd(), path), 'utf8');

describe('browser support policy', () => {
  test('builds consume the shared target source', async () => {
    const [build, vite] = await Promise.all([read('scripts/build.mjs'), read('apps/docs/vite.config.ts')]);
    expect(build).toContain("from '../config/browser-support.mjs'");
    expect(build.match(/target:browserBuildTargets/g)).toHaveLength(6);
    expect(vite).toContain("from '../../config/browser-support.mjs'");
    expect(vite).toContain('target:browserBuildTargets');
  });

  test('public policy reports every configured floor', async () => {
    const [config, policy, architecture, guide] = await Promise.all([
      read('config/browser-support.mjs'),
      read('docs/browser-support.md'),
      read('docs/architecture.md'),
      read('apps/docs/guides.html'),
    ]);
    for (const version of ['111', '114', '16.4']) {
      expect(config).toContain(version);
      expect(policy).toContain(version);
      expect(architecture).toContain(version);
      expect(guide).toContain(version);
    }
    expect(policy).toContain('do not prove behavior in the oldest supported browser versions');
  });
});
