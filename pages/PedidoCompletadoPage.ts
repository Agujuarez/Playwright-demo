import { expect, type Locator, type Page } from '@playwright/test'

export class PedidoCompletadoPage {
  readonly page: Page
  readonly header: Locator

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('[data-test="complete-header"]')
  }

  async assertPedidoConfirmado(): Promise<void> {
    await expect(this.header).toContainText('Thank you for your order!')
  }
}
