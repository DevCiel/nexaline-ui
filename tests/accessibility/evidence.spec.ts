import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('evidence page is semantically clean and honest about manual review', async ({ page }) => {
  await page.goto('/accessibility.html');
  await expect(page.getByRole('heading', { name: 'Human review required' })).toBeVisible();
  await expect(page.getByText('No conformance claim.')).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});

test('manual protocol remains unclaimed and covers required environments and tasks', async ({ page }) => {
  await page.goto('/manual-review.html');
  await expect(page.getByRole('heading', { name: 'Manual accessibility protocol' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'ENV-01' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'ENV-07' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'MAN-01' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'MAN-12' })).toBeVisible();
  await expect(page.locator('.nx-badge', { hasText: 'Not run' })).toHaveCount(12);
  await expect(page.locator('.nx-badge', { hasText: 'Pass' })).toHaveCount(4);
  await expect(page.locator('.nx-badge', { hasText: 'Blocked' })).toHaveCount(3);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});

test('documentation reflows at 320 CSS pixels', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Dedicated Chromium evidence');
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ['/', '/components.html', '/contracts.html', '/reference.html', '/guides.html', '/accessibility.html', '/manual-review.html']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), path).toBe(true);
  }
});

test('forced colors retain visible focus and controls', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-a11y', 'Desktop preference evidence');
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/reference.html');
  const button = page.getByRole('button', { name: 'Open dialog' });
  await button.focus();
  await expect(button).toBeFocused();
  expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await button.click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('reduced motion collapses animation and transition durations', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-a11y', 'Desktop preference evidence');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/reference.html');
  const durations = await page.locator('.nx-spinner').evaluate((element) => {
    const style = getComputedStyle(element);
    return { animation: style.animationDuration, transition: style.transitionDuration };
  });
  expect(parseFloat(durations.animation)).toBeLessThanOrEqual(0.00001);
  expect(parseFloat(durations.transition)).toBeLessThanOrEqual(0.00001);
});

test('Nexaline interactive controls meet the 24 CSS pixel target floor', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-touch', 'Touch emulation evidence');
  await page.goto('/reference.html');
  const undersized = await page.locator('.nx-btn, .nx-input, .nx-switch, .nx-accordion__trigger').evaluateAll((elements) => elements.filter((element) => {
    const rect = element.getBoundingClientRect();
    if (element.getClientRects().length === 0) return false;
    return rect.width < 24 || rect.height < 24;
  }).map((element) => ({ tag: element.tagName, className: element.className })));
  expect(undersized).toEqual([]);
});
