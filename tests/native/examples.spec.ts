import { test, expect } from '@playwright/test';

for (const viewport of [{width:390,height:844},{width:844,height:390}]) {
  test.describe(`${viewport.width}x${viewport.height}`, () => {
    test.use({viewport});
    for (const example of ['forms','collections','navigation','overlays','theme']) {
      test(example, async ({page}) => {
        const errors: string[] = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(`/?example=${example}`);
        if (example === 'forms') {
          await page.getByRole('textbox', {name:'Full name',exact:true}).fill('Grace Hopper');
          await page.getByRole('checkbox', {name:'Send me product updates',exact:true}).click();
          await page.getByRole('button', {name:'Save profile',exact:true}).click();
          await expect(page.getByText('Saved locally: Grace Hopper',{exact:true})).toBeVisible();
        } else if (example === 'collections') {
          await page.getByRole('textbox').fill('Grace');
          await page.getByText('Grace Hopper',{exact:true}).click();
          await expect(page.getByText('Selected: Grace Hopper',{exact:true})).toBeVisible();
          await page.getByRole('button',{name:'Refresh local list',exact:true}).click();
          await expect(page.getByRole('textbox')).toHaveValue('');
          await expect(page.getByText('Ada Lovelace',{exact:true})).toBeVisible();
        } else if (example === 'navigation') {
          await page.getByText('Projects',{exact:true}).click();
          await expect(page.getByText('Mobile launch',{exact:true})).toBeVisible();
          await page.getByText('Account',{exact:true}).click();
          await expect(page.getByText('Ada Lovelace',{exact:true})).toBeVisible();
          await page.getByText('Home',{exact:true}).click();
          await expect(page.getByText('Your team is in sync',{exact:true})).toBeVisible();
        } else if (example === 'overlays') {
          await page.getByRole('button',{name:'About this workspace',exact:true}).click();
          await expect(page.getByText('Product workspace',{exact:true})).toBeVisible();
          await page.getByRole('button',{name:'Got it',exact:true}).click();
          await expect(page.getByText('Product workspace',{exact:true})).toBeHidden();
        } else {
          const heading=page.getByText('A little more you.',{exact:true});
          await expect(heading).toBeVisible();
          const color=await heading.evaluate(e=>getComputedStyle(e).color);
          await page.getByRole('switch',{name:'Dark appearance',exact:true}).click();
          await expect.poll(()=>heading.evaluate(e=>getComputedStyle(e).color)).not.toBe(color);
          await page.getByRole('button',{name:'Try the brand color',exact:true}).click();
          await expect(page.getByText('Brand action pressed.',{exact:true})).toBeVisible();
        }
        expect(errors).toEqual([]);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
      });
    }
  });
}
