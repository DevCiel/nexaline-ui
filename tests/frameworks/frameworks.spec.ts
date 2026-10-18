import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const fixture of [
  { name: 'CodeIgniter', url: 'http://127.0.0.1:4175', heading: 'CodeIgniter example' },
  { name: 'Laravel', url: 'http://127.0.0.1:4176', heading: 'Laravel example' },
]) {
  test(`${fixture.name} renders assets, CSRF, and validation accessibly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    const response = await page.goto(fixture.url);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { name: fixture.heading })).toBeVisible();
    await expect(page.locator('input[type="hidden"]').first()).toHaveAttribute('name', /.+/);
    await expect(page.locator('.nx-btn')).toHaveCSS('display', 'inline-flex');
    expect(await page.evaluate(() => typeof window.NexalineUI?.init)).toBe('function');

    await page.getByRole('button', { name: 'Save customer' }).click();
    await expect(page.locator('[aria-invalid="true"]')).toBeVisible();
    await expect(page.locator('.nx-field__error')).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
    expect(errors).toEqual([]);
  });
}
