import { expect, type Page } from "@playwright/test";

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/pages\/dashboard\.php/);
    await expect(this.page).toHaveTitle(/Dashboard.*StockMaster Pro/);
  }

  async expectMainNavigation(): Promise<void> {
    for (const section of ["Products", "Categories", "Customers", "Suppliers"]) {
      await expect(this.page.getByRole("link", { name: new RegExp(section) })).toBeVisible();
    }
  }
}