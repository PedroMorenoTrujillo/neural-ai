import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const consumer = process.env['NEURAL_CONSUMER_PROJECT'];
if (!consumer) throw Error('Run through scripts/verify-clean-install.mjs or set NEURAL_CONSUMER_PROJECT');
export default defineConfig({
  testDir: '.',
  testMatch: 'consumer.spec.ts',
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: fileURLToPath(new URL('../../test-results/clean-consumer.json',import.meta.url)) }]],
  outputDir: fileURLToPath(new URL('../../test-results/clean-consumer',import.meta.url)),
  use: { baseURL: 'http://127.0.0.1:4191', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node dist/neural-ai-consumer/server/server.mjs',
    cwd: consumer,
    env: { PORT: '4191' },
    port: 4191,
    reuseExistingServer: false,
    timeout: 30000,
  },
});
