import { test as setup } from '@playwright/test'

import { LoginPage } from '../../pages/LoginPage'
import { e2eUsers } from '../../utils/testData'

const authFile = 'playwright/.auth/usuario-operador.json'

setup('preparar sesion autenticada para e2e', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.login(e2eUsers.valid.username, e2eUsers.valid.password)
  await page.waitForURL('**/inventory.html')
  await page.context().storageState({ path: authFile })
})
