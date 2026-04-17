import { expect, test } from '@playwright/test'

import { AppMenuPage } from '../../../pages/AppMenuPage'
import { InventoryPage } from '../../../pages/InventoryPage'
import { LoginPage } from '../../../pages/LoginPage'
import { e2eUsers } from '../../../utils/testData'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('E2E | Seguridad de sesion', () => {
  test('tras cerrar sesion no se puede volver al area autenticada', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const menu = new AppMenuPage(page)

    await loginPage.goto()
    await loginPage.login(e2eUsers.valid.username, e2eUsers.valid.password)
    await inventoryPage.assertInventoryLoaded()

    await menu.cerrarSesion()
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)

    await page.goto('/inventory.html')
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(page.locator('[data-test="login-button"]')).toBeVisible()
  })
})
