import { expect, type Locator, type Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly itemName: Locator

  constructor(page: Page) {
    this.page = page
    this.itemName = page.locator('.inventory_item_name')
  }

  async assertItemInCart(expectedItemName: string): Promise<void> {
    await expect(this.itemName).toContainText(expectedItemName)
  }
}
