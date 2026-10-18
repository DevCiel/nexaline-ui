import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/frameworks',
  webServer: [
    {
      command: 'node scripts/serve-codeigniter.mjs',
      url: 'http://127.0.0.1:4175',
      reuseExistingServer: true,
    },
    {
      command: 'php artisan serve --host=127.0.0.1 --port=4176',
      cwd: 'tests/fixtures/laravel-app',
      url: 'http://127.0.0.1:4176',
      reuseExistingServer: true,
      env: {
        APP_ENV: 'testing',
        APP_KEY: 'base64:RprcL98naTYFvs1ZHjkVTCxr85JCujOhQgKKBwi65Ac=',
        SESSION_DRIVER: 'file',
      },
    },
  ],
  use: { trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 800 } } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1024, height: 800 } } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1024, height: 800 } } },
  ],
});
