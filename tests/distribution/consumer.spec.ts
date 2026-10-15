import { test, expect } from '@playwright/test';

test('new consumer completes create, sort, select, edit, reject close, save, navigation and theme flow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type()==='error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Neural AI clean consumer' })).toBeVisible();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.getByTestId('theme')).toHaveText('dark');
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--neu-bg').trim())).toBe('#081a10');
  await expect(page.getByRole('button', { name: 'Add customer' })).toBeDisabled();
  await page.getByRole('textbox', { name: 'Customer name', exact: true }).fill('Al');
  await page.getByRole('textbox', { name: 'Customer name', exact: true }).blur();
  await expect(page.getByRole('alert')).toContainText('At least 3 characters required');
  await page.getByRole('textbox', { name: 'Customer name', exact: true }).fill('Alice');
  await page.getByRole('combobox', { name: 'Region', exact: true }).click();
  await page.getByRole('option', { name: 'Americas', exact: true }).click();
  await page.getByRole('button', { name: 'Add customer' }).click();
  await expect(page.getByTestId('customer-count')).toHaveText('3');
  await expect(page.getByTestId('form-state')).toHaveText('false / false');
  await expect(page.getByRole('textbox', { name: 'Customer name', exact: true })).toHaveValue('');
  await page.getByRole('button', { name: /Sort Name; current none/ }).click();
  const rows = page.locator('neu-table tbody tr');
  await expect(rows.first()).toContainText('Alice');
  await rows.first().click();
  await expect(page.getByTestId('selected')).toHaveText('Alice');
  const edit = page.getByRole('button', { name: 'Edit selected', exact: true });
  await edit.click();
  await expect(page.getByRole('dialog', { name: 'Edit selected customer' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Edited name' }).fill('Alice edited');
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('close-requests')).toHaveText('1');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByTestId('selected')).toHaveText('Alice edited');
  await expect(edit).toBeFocused();
  await page.getByRole('tab', { name: 'Settings', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Workspace settings' })).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Customers', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('new consumer renders through SSR without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4191/');
    await expect(page.getByRole('heading', { name: 'Neural AI clean consumer' })).toBeVisible();
    await expect(page.getByTestId('customer-count')).toHaveText('2');
    await expect(page.getByText('Zoe', { exact: true })).toBeVisible();
  } finally { await context.close(); }
});
