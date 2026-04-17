import { expect, type Locator, type Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly itemName: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.itemName = page.locator('.inventory_item_name')
    this.checkoutButton = page.locator('[data-test="checkout"]')
  }

  async assertItemInCart(expectedItemName: string): Promise<void> {
    await expect(this.itemName).toContainText(expectedItemName)
  }

  async irAlCheckout(): Promise<void> {
    await this.checkoutButton.click()
  }
}
