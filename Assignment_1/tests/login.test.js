const { test, expect } = require('@playwright/test');
const LoginPage = require('/Users/asbose/Desktop/Playwright_Assignments/AMP_Playwright/Assignment_1/tests/loginPage.js'); // Ensure this path is correct

test.describe('Login functionality tests', () => {
  let page;
  let loginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
  });

  test('successful login with valid credentials', async () => {
    await loginPage.navigate('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce'); // Use valid credentials for the test
    await expect(page).toHaveURL(/.*inventory\.html/); // Adjust the URL pattern if necessary
  });

  test('login attempt with invalid credentials', async () => {
    await loginPage.navigate('https://www.saucedemo.com/');
    await loginPage.login('invalid_user', 'invalid_password'); // Invalid credentials

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test.afterAll(async () => {
    await page.close();
  });
});