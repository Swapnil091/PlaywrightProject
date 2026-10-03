import { type Locator, type Page } from "@playwright/test";
import { getBaseUrl } from "../support/config";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByPlaceholder("admin@example.com");
    this.passwordInput = page.getByPlaceholder("••••••••");
    this.signInButton = page.getByRole("button", { name: /Sign In/ });
  }

  async open(): Promise<void> {
    await this.page.goto(getBaseUrl());
  }

  async submit(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.page.locator("button").first().click();
  }
}