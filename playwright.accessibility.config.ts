import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/accessibility',
  webServer: { command: 'corepack pnpm dev --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: true },
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium-a11y', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'chromium-touch', use: { ...devices['iPhone 13'] } },
  ],
});
