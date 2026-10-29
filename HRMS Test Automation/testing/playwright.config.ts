import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [
    ['html', { outputFolder: '../reports/html' }],
    ['json', { outputFile: '../reports/results.json' }],
    ['line']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3015',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADED !== '1',
    navigationTimeout: 45_000,
    actionTimeout: 20_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: undefined,
        executablePath: '/usr/bin/google-chrome'
      },
    },
  ],
  outputDir: '../reports/artifacts',
});
