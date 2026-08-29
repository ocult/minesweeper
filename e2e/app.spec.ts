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

test('cria o campo jogável', async ({ page }) => {
  await page.goto('/def');

  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  await expect(page).toHaveURL(/\/camp$/);
  await expect(page.getByRole('heading', { name: 'Campo minado' })).toBeVisible();
  await expect(page.locator('table button')).toHaveCount(25);
});

test('revela células sem alterar o campo e permite reiniciar ou voltar', async ({ page }) => {
  await page.goto('/def');
  await page.locator('table button').nth(0).click();
  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  const firstCell = page.locator('table button').first();
  const adjacentCell = page.locator('table button').nth(1);
  await expect(firstCell).toHaveText(' ');
  await adjacentCell.click();
  await expect(adjacentCell).toHaveText('1');
  await adjacentCell.click();
  await expect(adjacentCell).toHaveText('1');

  await page.getByRole('button', { name: 'Reiniciar' }).click();
  await expect(firstCell).toHaveText(' ');
  await adjacentCell.click();
  await expect(adjacentCell).toHaveText('1');

  await page.getByRole('button', { name: 'Voltar à definição' }).click();
  await expect(page).toHaveURL(/\/def$/);
});

test('abre a área vazia e encerra ao encontrar uma bomba', async ({ page }) => {
  await page.goto('/def');
  await page.locator('table button').nth(0).click();
  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  const firstCell = page.locator('table button').first();
  await firstCell.click();
  await expect(firstCell).toHaveText('*');
  await expect(page.getByRole('heading', { name: 'Você foi explodido' })).toBeVisible();
  await expect(page.locator('table button')).toHaveText([
    '*', '1', ' ', ' ', ' ',
    '1', '1', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' '
  ]);
});

test('vence ao revelar todas as células que não são bombas e para o cronômetro', async ({ page }) => {
  await page.goto('/def');
  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  await page.locator('table button').first().click();
  await expect(page.getByRole('heading', { name: 'Você venceu' })).toBeVisible();
  await expect(page.getByText('Tempo: 0s')).toBeVisible();
});
