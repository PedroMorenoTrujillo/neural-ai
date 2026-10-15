import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Neural AI integration' })).toBeVisible();
  // An interaction confirms hydration and event binding have completed.
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.getByTestId('theme-mode')).toHaveText('dark');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.getByTestId('theme-mode')).toHaveText('light');
  (page as typeof page & { failures: string[] }).failures = failures;
});

test.afterEach(async ({ page }) => {
  expect((page as typeof page & { failures: string[] }).failures).toEqual([]);
});

test('Signal Forms validates, updates application data and resets interaction state', async ({ page }) => {
  const input = page.getByRole('textbox', { name: 'Name', exact: true });
  await expect(page.getByTestId('name-state')).toHaveText('false / false / false');
  await input.fill('Al');
  await input.blur();
  await expect(page.getByRole('alert')).toContainText('Enter at least 3 characters');
  await input.fill('Alice');
  await expect(page.getByTestId('name-value')).toHaveText('Alice');
  await expect(page.getByTestId('name-state')).toHaveText('true / true / true');
  await page.getByRole('button', { name: 'Reset name' }).click();
  await expect(input).toHaveValue('');
  await expect(page.getByTestId('name-state')).toHaveText('false / false / false');
});

test('Select single writes the scalar model and supports keyboard dismissal', async ({ page }) => {
  const select = page.getByRole('combobox', { name: 'Region' });
  await select.click();
  await page.getByRole('option', { name: 'Europe', exact: true }).click();
  await expect(page.getByTestId('region-value')).toHaveText('eu');
  await select.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).not.toBeVisible();
});

test('Table accepts sort and selection proposals in application state', async ({ page }) => {
  await page.getByRole('columnheader', { name: /Customer/ }).click();
  await expect(page.getByTestId('table-sort')).toHaveText('asc');
  const rows = page.locator('neu-table tbody tr');
  await expect(rows.first()).toContainText('Ana');
  await rows.first().click();
  await expect(page.getByTestId('table-selected')).toHaveText('2');
});

test('Tabs accepts navigation proposals and exposes matching panels', async ({ page }) => {
  await page.getByRole('tab', { name: 'Activity', exact: true }).click();
  await expect(page.getByTestId('active-tab')).toHaveText('activity');
  await expect(page.getByRole('tabpanel')).toHaveText('Customer activity');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('active-tab')).toHaveText('overview');
});

test('Dialog can reject close requests, then accept Escape and restore focus', async ({ page }) => {
  await page.getByRole('checkbox', { name: 'Accept close requests' }).uncheck();
  const trigger = page.getByRole('button', { name: 'Edit customer', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Edit customer' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('dialog-state')).toHaveText('true / 1 / 1 / 0');
  await page.getByRole('button', { name: 'Finish editing' }).click();
  await expect(trigger).toBeFocused();
  await page.getByRole('checkbox', { name: 'Accept close requests' }).check();
  await trigger.click();
  await expect(page.getByTestId('dialog-state')).toHaveText('true / 1 / 2 / 1');
  await expect(page.getByRole('dialog').locator(':focus')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByTestId('dialog-state')).toHaveText('false / 2 / 2 / 2');
  await expect(trigger).toBeFocused();
});

test('Typed preset selects real light and dark CSS tokens', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('data-neu-preset', 'neural-ai');
  const token = () => page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--neu-bg').trim());
  expect(await token()).toBe('#f0fdf4');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await token()).toBe('#081a10');
});

test('SSR sends meaningful HTML before JavaScript and stable initial state', async ({ request, browser }) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('Neural AI integration');
  expect(html).toContain('ngh=');
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4177/');
    await expect(page.getByRole('heading', { name: 'Signal Forms' })).toBeVisible();
    await expect(page.getByTestId('name-state')).toHaveText('false / false / false');
    await expect(page.getByText('Zoe', { exact: true })).toBeVisible();
  } finally { await context.close(); }
});

test('Narrow layout keeps document within viewport and fields accessible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toHaveAttribute('aria-required', 'true');
});
