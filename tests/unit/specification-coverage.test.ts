import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const coverage = readFileSync(resolve(process.cwd(), 'docs/specification-coverage.md'), 'utf8');

describe('specification coverage report', () => {
  test('accounts for every numbered brief section exactly once', () => {
    for (let section = 1; section <= 23; section += 1) {
      expect(coverage.match(new RegExp(`\\| ${section}\\. `, 'g')), `section ${section}`).toHaveLength(1);
    }
  });

  test('retains explicit limitations and publication boundary', () => {
    expect(coverage).toContain('Pending external');
    expect(coverage).toContain('manual matrix is complete with passes');
    expect(coverage).toContain('has been published or deployed');
  });
});
