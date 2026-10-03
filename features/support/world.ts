import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";

export class StockMasterWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  get currentPage(): Page {
    if (!this.page) {
      throw new Error("The scenario browser page has not been initialized.");
    }

    return this.page;
  }
}

setWorldConstructor(StockMasterWorld);