import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.',
  testMatch: 'examples.spec.ts',
  workers: 1,
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:49188', browserName: 'chromium', channel: process.env.NEURAL_BROWSER_CHANNEL, screenshot: 'only-on-failure' },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --config tests/native/vite.config.ts --host 127.0.0.1 --port 49188 --strictPort',
    cwd: new URL('../../', import.meta.url).pathname,
    url: 'http://127.0.0.1:49188', reuseExistingServer: false,
  },
});
