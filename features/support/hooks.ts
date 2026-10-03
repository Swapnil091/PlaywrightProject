import { After, Before, BeforeAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import "./config";
import { StockMasterWorld } from "./world";

setDefaultTimeout(30_000);

BeforeAll(async () => {
  await mkdir("reports", { recursive: true });
});

Before(async function (this: StockMasterWorld) {
  const browserName = process.env.BROWSER ?? "chromium";
  if (browserName !== "chromium") {
    throw new Error(`This test setup supports chromium; received ${browserName}.`);
  }

  this.browser = await chromium.launch({ headless: process.env.HEADED !== "true" });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: StockMasterWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true }).catch(() => undefined);
    if (screenshot) {
      this.attach(screenshot, "image/png");
    }
  }

  await this.context?.close();
  await this.browser?.close();
});