import { expect, Locator, Page } from '@playwright/test';

// Customer login page: select a user then click Login
export class CustomerPage {
  readonly page: Page;
  readonly userSelect: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userSelect = page.locator('#userSelect');
    // Login stays hidden until a customer is selected
    this.loginBtn = page.locator('button[type="submit"]');
  }

  async selectCustomer(name: string) {
    await expect(this.userSelect).toBeVisible();
    await this.userSelect.selectOption({ label: name });
  }

  async clickLogin() {
    await expect(this.loginBtn).toBeVisible();
    await this.loginBtn.click();
  }
}
