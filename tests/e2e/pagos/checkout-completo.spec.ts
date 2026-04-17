import { expect, test } from '@playwright/test'

import { CartPage } from '../../../pages/CartPage'
import { CheckoutDatosPage } from '../../../pages/CheckoutDatosPage'
import { CheckoutResumenPage } from '../../../pages/CheckoutResumenPage'
import { InventoryPage } from '../../../pages/InventoryPage'
import { PedidoCompletadoPage } from '../../../pages/PedidoCompletadoPage'

test.describe('E2E | Pagos y cierre de compra', () => {
  test('usuario autenticado completa checkout hasta confirmacion del pedido', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutDatos = new CheckoutDatosPage(page)
    const checkoutResumen = new CheckoutResumenPage(page)
    const pedidoCompletado = new PedidoCompletadoPage(page)

    await page.goto('/inventory.html')
    await inventoryPage.assertInventoryLoaded()
    await inventoryPage.addBackpackToCart()

    await inventoryPage.openCart()
    await cartPage.assertItemInCart('Sauce Labs Backpack')
    await cartPage.irAlCheckout()

    await expect(page).toHaveURL(/checkout-step-one\.html/)
    await checkoutDatos.completarDatosEnvio('Ana', 'Gomez', '1425')

    await expect(page).toHaveURL(/checkout-step-two\.html/)
    await checkoutResumen.finalizarPedido()

    await expect(page).toHaveURL(/checkout-complete\.html/)
    await pedidoCompletado.assertPedidoConfirmado()
  })
})
