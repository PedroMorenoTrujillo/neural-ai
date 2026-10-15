import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/browser.json' }]],
  use: { baseURL: 'http://127.0.0.1:4177', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/integration/dist/integration/server/server.mjs',
    port: 4177,
    env: { PORT: '4177' },
    reuseExistingServer: false,
    timeout: 30000,
  },
});
