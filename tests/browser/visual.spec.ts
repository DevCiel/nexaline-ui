import { test, expect } from '@playwright/test';

test('customer card remains visually stable',async({page})=>{
  await page.goto('/');
  await expect(page.locator('#demo .nx-card').last()).toHaveScreenshot('customer-card.png',{animations:'disabled'});
});

test('feedback components remain visually stable',async({page})=>{
  await page.goto('/components.html');
  await expect(page.locator('#feedback')).toHaveScreenshot('feedback-components.png',{animations:'disabled'});
});
