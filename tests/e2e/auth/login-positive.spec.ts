import { test } from '@playwright/test'
import { InventoryPage } from '../../../pages/InventoryPage'
import { LoginPage } from '../../../pages/LoginPage'
import { e2eUsers } from '../../../utils/testData'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('E2E | Autenticacion positiva', () => {
  test('el usuario inicia sesion con credenciales validas', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)

    await loginPage.goto()
    await loginPage.login(e2eUsers.valid.username, e2eUsers.valid.password)

    await inventoryPage.assertInventoryLoaded()
  })
})
