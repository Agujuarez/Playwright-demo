import { type Locator, type Page } from '@playwright/test'

export class CheckoutResumenPage {
  readonly page: Page
  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.finishButton = page.locator('[data-test="finish"]')
  }

  async finalizarPedido(): Promise<void> {
    await this.finishButton.click()
  }
}
