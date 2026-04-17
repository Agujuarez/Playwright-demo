import { expect, test } from '@playwright/test'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('E2E | Control de acceso negativo', () => {
  test('usuario no autenticado no puede abrir inventario', async ({ page }) => {
    await page.goto('/inventory.html')

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })

  test('usuario no autenticado no puede abrir el carrito', async ({ page }) => {
    await page.goto('/cart.html')

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })

  test('usuario no autenticado no puede abrir checkout', async ({ page }) => {
    await page.goto('/checkout-step-one.html')

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })
})
