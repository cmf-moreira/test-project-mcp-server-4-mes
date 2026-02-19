import { defineConfig, devices } from '@playwright/test';
import { env } from '@config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: env.retries,
  workers: process.env.CI ? 1 : env.workers,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'artifacts/reports/html' }]],
  outputDir: 'artifacts/test-results',
  use: {
    baseURL: env.mesBaseUrl,
    headless: env.headless,
    browserName: env.browserName as 'chromium' | 'firefox' | 'webkit',
    screenshot: env.screenshotMode as 'off' | 'on' | 'only-on-failure',
    trace: env.traceMode as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
    video: env.videoMode as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
    viewport: { width: 1600, height: 900 },
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: 'mes-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
