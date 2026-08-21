import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomerPage } from '../pages/CustomerPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('Customer deposit', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);
    const accountPage = new AccountPage(page);

    await loginPage.goto();
    await loginPage.clickCustomerLogin();
    await customerPage.selectCustomer('Harry Potter');
    await customerPage.clickLogin();
    await accountPage.waitForAccount();
  });

  test('Verify $100 Credit transaction is shown after deposit', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.clickDepositTab();
    await accountPage.depositAmount('100');

    await accountPage.clickTransactionsTab();

    const creditRow = accountPage.transactionRows
      .filter({ hasText: '100' })
      .filter({ hasText: 'Credit' });

    await expect(creditRow.first()).toBeVisible();
    const todayDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    await expect(creditRow.first().locator('td').nth(0)).toContainText(todayDate);
    await expect(creditRow.first().locator('td').nth(1)).toHaveText('100');
    await expect(creditRow.first().locator('td').nth(2)).toHaveText('Credit');
  });

  test('Verify deposit is not processed when amount is empty', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const balanceBefore = await accountPage.getBalance();

    await accountPage.clickDepositTab();
    await accountPage.submitEmptyDeposit();

    await expect(accountPage.amountInput).toHaveJSProperty(
      'validationMessage',
      'Please fill out this field.'
    );
    await expect(accountPage.depositMessage).toBeHidden();
    expect(await accountPage.getBalance()).toBe(balanceBefore);
  });
});
