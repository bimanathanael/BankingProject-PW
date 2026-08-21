# XYZ Bank - Playwright Automation

Automated browser tests for the XYZ Bank demo app.

**Made by Bima Nathanael**

## Description

There is also one negative test: submitting an empty deposit amount should show the warning **Please fill out this field.** and should not change the balance.

Page Object Model is used so locators and actions stay in page classes, not in the spec.

The app is slow to load, so tests rely on Playwright auto-wait (`expect` / `toBeVisible`) instead of hard sleeps.

## Application

[https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)

## How to install

```bash
npm install
npx playwright install chromium
```

## How to run

Run all tests:

```bash
npx playwright test
```

Run tests with browser visible:

```bash
npx playwright test --headed
```

Open Playwright UI mode:

```bash
npx playwright test --ui
```

This opens Playwright's test runner UI. You can pick a test, run it step by step, and watch the browser while inspecting locators and traces. Useful for debugging.

Open HTML report after a run:

```bash
npx playwright show-report
```



## Test coverage


| Test                                                  | What it checks                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------- |
| Verify $100 Credit transaction is shown after deposit | Happy path: login, deposit 100, assert a Credit row with amount 100 |
| Verify deposit is not processed when amount is empty  | Negative: empty amount shows "Please fill out this field." and balance stays the same |


