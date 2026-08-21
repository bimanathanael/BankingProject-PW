import { expect, Locator, Page } from '@playwright/test';

// Account page after customer login: deposit, transactions, and balance
export class AccountPage {
  readonly page: Page;
  readonly welcomeText: Locator;
  readonly depositTab: Locator;
  readonly transactionsTab: Locator;
  readonly amountInput: Locator;
  readonly depositSubmitBtn: Locator;
  readonly depositMessage: Locator;
  readonly accountInfo: Locator;
  readonly transactionRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeText = page.locator('.fontBig');
    this.depositTab = page.locator('button[ng-click="deposit()"]');
    this.transactionsTab = page.locator('button[ng-click="transactions()"]');
    // type="number" + required → empty submit shows native HTML5 warning
    this.amountInput = page.locator('input[ng-model="amount"]');
    // There are two "Deposit" buttons; this one is the form submit
    this.depositSubmitBtn = page.locator('form[ng-submit="deposit()"] button[type="submit"]');
    this.depositMessage = page.locator('span[ng-show="message"]');
    this.accountInfo = page.locator('div.center').filter({ hasText: 'Account Number' });
    this.transactionRows = page.locator('table tbody tr');
  }

  async waitForAccount() {
    await expect(this.welcomeText).toBeVisible();
    await expect(this.depositTab).toBeVisible();
  }

  async getBalance() {
    // Account info order: Account Number, Balance, Currency
    const balanceText = this.accountInfo.locator('strong').nth(1);
    await expect(balanceText).toBeVisible();
    return Number(await balanceText.innerText());
  }

  async clickDepositTab() {
    await this.depositTab.click();
    await expect(this.amountInput).toBeVisible();
  }

  async depositAmount(amount: string) {
    const balanceBefore = await this.getBalance();
    await this.amountInput.fill(amount);
    await this.depositSubmitBtn.click();
    await expect(this.depositMessage).toHaveText('Deposit Successful');
    await expect(this.accountInfo.locator('strong').nth(1)).toHaveText(String(balanceBefore + Number(amount)));
  }

  async submitEmptyDeposit() {
    await this.amountInput.clear();
    await this.depositSubmitBtn.click();
  }

  async clickTransactionsTab() {
    await this.transactionsTab.click();
    await expect(this.page).toHaveURL(/listTx/);
    await expect(this.page.locator('table')).toBeVisible();
    await this.widenDateFilter();
  }

  // Default start/end are the same timestamp, so a new deposit row can be hidden if the filter is not widened.
  // Do not click Reset — that button deletes transaction history.
  async widenDateFilter() {
    const start = this.page.locator('#start');
    await expect(start).toBeVisible();

    await this.page.evaluate(() => {
      const box = document.querySelector('.marTop');
      if (!box) return;
      const scope = (window as any).angular.element(box).scope();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      scope.startDate = yesterday;
      scope.end = new Date(2030, 11, 31);
      scope.$apply();
    });
  }
}
