import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 1600, height: 1200 },
});
test('tests', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://toduyemi.github.io/weather-app/');
  await page.getByRole('searchbox', { name: 'Submit' }).click();
  await page.getByRole('searchbox', { name: 'Submit' }).fill('vancouver');
  await page.getByRole('option', { name: 'Metro Vancouver Regional' }).click();
  await expect(page.locator('h2#location').first()).toHaveText('Burnaby, Canada');
});
