import { expect, test } from '@playwright/test';

test('exibe o campo minado', async ({ page }) => {
  await page.goto('/def');

  await expect(page.getByText('Campo minado:')).toBeVisible();
  await expect(page.locator('table button')).toHaveCount(25);
});

test('altera uma célula do campo', async ({ page }) => {
  await page.goto('/def');

  const firstCell = page.locator('table button').first();
  await firstCell.click();
  await expect(firstCell).toHaveText('*');
});
