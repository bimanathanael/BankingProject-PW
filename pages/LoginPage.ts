import { expect, Locator, Page } from '@playwright/test';

// Landing page: Home / Customer Login / Bank Manager Login
export class LoginPage {
  readonly page: Page;
  readonly customerLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    // AngularJS ng-click is more stable than button text alone
    this.customerLoginBtn = page.locator('button[ng-click="customer()"]');
  }

  async goto() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    // App is slow to load, wait until the login button is ready
    await expect(this.customerLoginBtn).toBeVisible();
  }

  async clickCustomerLogin() {
    await this.customerLoginBtn.click();
  }
}
