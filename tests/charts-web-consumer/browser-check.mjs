import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { chromium, expect } from '@playwright/test';
import { createServer } from 'vite';

export async function verifyChartsBrowser(root, entry) {
  const index = join(dirname(entry), 'index.html');
  writeFileSync(index, `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Charts browser tests</title></head>
<body><main style="max-width:48rem">
  <section aria-label="Web chart"><div id="web"></div><button id="dispose">Dispose Web chart</button></section>
  <section id="angular" aria-label="Angular chart"></section>
  <section aria-label="React chart"><div id="react"></div><button id="unmount">Unmount React chart</button></section>
</main><script type="module" src="./browser.js"></script></body></html>`);
  const server = await createServer({
    root, configFile: false, logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, fs: { allow: [root] } },
  });

  try {
    await server.listen();
    const address = server.httpServer.address();
    assert.ok(typeof address === 'object' && address, 'Vite did not start');
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 800, height: 900 } });
      page.setDefaultTimeout(8_000);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`http://127.0.0.1:${address.port}/${index.slice(root.length + 1)}`);
      for (const id of ['web', 'angular', 'react']) {
        await page.locator(`#${id} svg`).first().waitFor({ state: 'visible' });
      }
      await page.getByRole('button', { name: 'Show previous week' }).press('Enter');
      await page.locator('#angular').getByText('Previous week', { exact: true }).first().waitFor({ state: 'visible' });
      await page.getByRole('button', { name: 'Dispose Web chart' }).click();
      await page.locator('#web svg').first().waitFor({ state: 'detached' });
      const previousWeek = page.locator('#react').getByRole('button', { name: /previous week/i });
      await expect(previousWeek).toHaveAttribute('aria-pressed', 'true');
      await previousWeek.click();
      await expect(previousWeek).toHaveAttribute('aria-pressed', 'false');
      await page.getByRole('button', { name: 'Unmount React chart' }).click();
      await page.locator('#react svg').first().waitFor({ state: 'detached' });
      assert.deepEqual(errors, [], 'Uncaught errors in Charts browser examples');
      console.log('Chromium verified SVG rendering, Angular keyboard updates, Web disposal, and React legend state and unmount');
    } finally {
      await browser.close();
    }
  } finally {
    await server.close();
  }
}
