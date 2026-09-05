import { expect, test } from '@playwright/test';

test('exibe o campo minado', async ({ page }) => {
  await page.goto('/definition');

  await expect(page.getByText('Campo minado', { exact: true })).toBeVisible();
  await expect(page.locator('table button')).toHaveCount(25);
});

test('não permite jogar sem bombas na definição', async ({ page }) => {
  await page.goto('/definition');

  const createButton = page.getByRole('button', { name: 'Criar campo jogável' });
  await expect(createButton).toBeDisabled();
  await expect(page).toHaveURL(/\/definition$/);
});

test('mantém um espaço vazio quando todas as células são selecionadas', async ({ page }) => {
  await page.goto('/definition');

  const cells = page.locator('table button');
  const totalCells = await cells.count();
  for (let index = 1; index < totalCells; index++) {
    await cells.nth(index).click();
  }

  const emptyCell = cells.first();
  await expect(emptyCell).not.toHaveText('*');
  await emptyCell.click();
  await expect(emptyCell).not.toHaveText('*');
  await expect(page.getByRole('button', { name: 'Criar campo jogável' })).toBeEnabled();
  await expect(page).toHaveURL(/\/definition$/);
});

test('altera uma célula do campo', async ({ page }) => {
  await page.goto('/definition');

  const firstCell = page.locator('table button').first();
  await firstCell.click();
  await expect(firstCell).toHaveText('*');
});

test('cria o campo jogável', async ({ page }) => {
  await page.goto('/definition');

  await page.locator('table button').first().click();
  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  await expect(page).toHaveURL(/\/play$/);
  await expect(page.getByRole('heading', { name: 'Campo minado' })).toBeVisible();
  await expect(page.locator('table button')).toHaveCount(25);
});

test('revela células sem alterar o campo e permite reiniciar ou voltar', async ({ page }) => {
  await page.goto('/definition');
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
  await expect(page).toHaveURL(/\/definition$/);
});

test('abre a área vazia e encerra ao encontrar uma bomba', async ({ page }) => {
  await page.goto('/definition');
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
  await page.goto('/definition');
  await page.locator('table button').last().click();
  await page.getByRole('button', { name: 'Criar campo jogável' }).click();

  await page.locator('table button').first().click();
  await expect(page.getByRole('heading', { name: 'Você venceu' })).toBeVisible();
  await expect(page.getByText('Tempo: 0min 0s')).toBeVisible();
});
