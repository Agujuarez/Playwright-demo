import { expect, type Locator, type Page } from '@playwright/test'

export class InventoryPage {
  readonly page: Page
  readonly inventoryContainer: Locator
  readonly shoppingCartBadge: Locator
  readonly shoppingCartLink: Locator
  readonly addBackpackButton: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryContainer = page.locator('[data-test="inventory-container"]')
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  }

  async assertInventoryLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible()
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click()
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click()
  }
}
