import { expect, type Page } from '@playwright/test'

export async function expectPageToContainText(page: Page, text: string): Promise<void> {
  await expect(page.getByText(text)).toBeVisible()
}
