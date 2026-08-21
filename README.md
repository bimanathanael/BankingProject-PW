# XYZ Bank - Playwright Automation

Automation Playwright with Typescript for the XYZ Bank demo app.

[https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login) 

**Made by Bima Nathanael**  

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

Open Playwright UI mode (recommended):

```bash
npx playwright test --ui
```

This opens Playwright's test runner UI. You can pick a test, run it step by step, and watch the browser while inspecting locators and traces. Useful for debugging.

Open HTML report after a run:

```bash
npx playwright show-report
```



## Test coverage


| Test                                                  | What it checks                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Verify $100 Credit transaction is shown after deposit | Happy path: login, deposit 100, assert a Credit row with amount 100                   |
| Verify deposit is not processed when amount is empty  | Negative: empty amount shows "Please fill out this field." and balance stays the same |


