import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";
import { getAppUrl, getRequiredCredential } from "../support/config";
import { StockMasterWorld } from "../support/world";

Given("the StockMaster login page is open", async function (this: StockMasterWorld) {
  await new LoginPage(this.currentPage).open();
});

Then("the login page should show email, password, and sign-in controls", async function (this: StockMasterWorld) {
  const loginPage = new LoginPage(this.currentPage);
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInButton).toBeVisible();
});

When("I sign in with valid administrator credentials from the test environment", async function (this: StockMasterWorld) {
  const loginPage = new LoginPage(this.currentPage);
  await loginPage.submit(
    getRequiredCredential("STOCKMASTER_ADMIN_EMAIL"),
    getRequiredCredential("STOCKMASTER_ADMIN_PASSWORD"),
  );
});

Then("I should see the StockMaster dashboard", async function (this: StockMasterWorld) {
  await new DashboardPage(this.currentPage).expectVisible();
});

Then("the dashboard navigation should include products, categories, customers, and suppliers", async function (this: StockMasterWorld) {
  await new DashboardPage(this.currentPage).expectMainNavigation();
});

When("I sign in with an invalid email or password", async function (this: StockMasterWorld) {
  const loginPage = new LoginPage(this.currentPage);
  await loginPage.submit(`unknown-${Date.now()}@example.invalid`, "invalid-password");
});

Then("I should remain on the login page", async function (this: StockMasterWorld) {
  await expect(this.currentPage).toHaveURL(/index\.php/);
});

Then("I should see an authentication error", async function (this: StockMasterWorld) {
  const pageText = await this.currentPage.locator("body").innerText();
  expect(pageText).toMatch(/invalid|incorrect|failed|error|credentials/i);
});

When("I attempt to sign in with email {string} and password {string}", async function (this: StockMasterWorld, email: string, password: string) {
  await new LoginPage(this.currentPage).submit(email, password);
});

Then("I should not be signed in", async function (this: StockMasterWorld) {
  await expect(this.currentPage).not.toHaveURL(/pages\/dashboard\.php/);
});

When("I enter a password and activate the password visibility control", async function (this: StockMasterWorld) {
  const loginPage = new LoginPage(this.currentPage);
  await loginPage.passwordInput.fill("visibility-check");
  await loginPage.togglePasswordVisibility();
});

Then("the password should be visible", async function (this: StockMasterWorld) {
  await expect(new LoginPage(this.currentPage).passwordInput).toHaveAttribute("type", "text");
});

When("I activate the password visibility control again", async function (this: StockMasterWorld) {
  await new LoginPage(this.currentPage).togglePasswordVisibility();
});

Then("the password should be masked", async function (this: StockMasterWorld) {
  await expect(new LoginPage(this.currentPage).passwordInput).toHaveAttribute("type", "password");
});

Given("I am signed in as a StockMaster administrator", async function (this: StockMasterWorld) {
  const loginPage = new LoginPage(this.currentPage);
  await loginPage.open();
  await loginPage.submit(
    getRequiredCredential("STOCKMASTER_ADMIN_EMAIL"),
    getRequiredCredential("STOCKMASTER_ADMIN_PASSWORD"),
  );
  await new DashboardPage(this.currentPage).expectVisible();
});

When("I sign out", async function (this: StockMasterWorld) {
  await this.currentPage.getByRole("link", { name: /Sign Out/ }).click();
});

Then("I should see the StockMaster login page", async function (this: StockMasterWorld) {
  await expect(this.currentPage).toHaveURL(/index\.php/);
  await expect(this.currentPage.getByRole("heading", { name: "Welcome back" })).toBeVisible();
});

Then("opening a protected page should return me to the login page", async function (this: StockMasterWorld) {
  await this.currentPage.goto(getAppUrl("pages/dashboard.php"));
  await expect(this.currentPage).toHaveURL(/index\.php/);
});

Given("I am not signed in", async function (this: StockMasterWorld) {
  await new LoginPage(this.currentPage).open();
});

When("I open the StockMaster dashboard directly", async function (this: StockMasterWorld) {
  await this.currentPage.goto(getAppUrl("pages/dashboard.php"));
});

Then("I should be redirected to the login page", async function (this: StockMasterWorld) {
  await expect(this.currentPage).toHaveURL(/index\.php/);
});