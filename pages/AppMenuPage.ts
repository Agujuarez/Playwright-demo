import { type Page } from '@playwright/test'

export class AppMenuPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async abrirMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click()
  }

  async cerrarSesion(): Promise<void> {
    await this.abrirMenu()
    await this.page.getByRole('link', { name: 'Logout' }).click()
  }
}
