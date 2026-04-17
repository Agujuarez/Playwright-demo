import { expect, test } from '@playwright/test'

import { LoginPage } from '../../../pages/LoginPage'
import { e2eUsers } from '../../../utils/testData'

test.use({ storageState: { cookies: [], origins: [] } })

test.describe('E2E | Validaciones negativas de login', () => {
  test('click en login sin completar credenciales no permite ingresar', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.loginButton.click()

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(loginPage.errorMessage).toContainText('Username is required')
  })

  test('usuario invalido con clave valida no permite ingresar', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login(e2eUsers.invalidUser.username, e2eUsers.invalidUser.password)

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(loginPage.errorMessage).toContainText('Username and password do not match')
  })

  test('usuario valido con clave invalida no permite ingresar', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login(e2eUsers.invalidPassword.username, e2eUsers.invalidPassword.password)

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(loginPage.errorMessage).toContainText('Username and password do not match')
  })

  test('usuario bloqueado no puede iniciar sesion', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login(e2eUsers.lockedOut.username, e2eUsers.lockedOut.password)

    await expect(page).toHaveURL(/.*saucedemo\.com\/$/)
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out')
  })
})
