import { expect, test } from '@playwright/test'
import { CartPage } from '../../../pages/CartPage'
import { InventoryPage } from '../../../pages/InventoryPage'

test.describe('E2E | Carrito positivo', () => {
  test('usuario autenticado agrega un producto al carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)

    await page.goto('/inventory.html')
    await inventoryPage.assertInventoryLoaded()
    await inventoryPage.addBackpackToCart()
    await expect(inventoryPage.shoppingCartBadge).toContainText('1')

    await inventoryPage.openCart()
    await cartPage.assertItemInCart('Sauce Labs Backpack')
  })
})
