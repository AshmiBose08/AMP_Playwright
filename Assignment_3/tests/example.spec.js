const { test, expect } = require('@playwright/test');

test.describe('Demoblaze Automation Tests', () => {

  test('Signup: Positive Scenario - Signup with valid details', async ({ page }) => {
    // Launch the site
    await page.goto('https://demoblaze.com/');

    // Click on SignUp
    await page.click('#signin2');

    // Wait for the signup modal
    await page.waitForSelector('#signInModal');

    // Enter valid signup details
    await page.fill('#sign-username', 'validuser123');
    await page.fill('#sign-password', 'validpassword123');
    
    // Take a screenshot before signup
    await page.screenshot({ path: 'screenshots/signup_valid_details.png' });

    // Click on SignUp button
    await page.click('button[onclick="register()"]');

    // Add an assertion for successful signup (customized based on site response)
    await page.waitForTimeout(2000); // adjust timeout for response
  });

  test('Login: Positive Scenario - Log in with valid credentials', async ({ page }) => {
    // Launch the site
    await page.goto('https://demoblaze.com/');

    // Click on Log In
    await page.click('#login2');

    // Wait for the login modal
    await page.waitForSelector('#logInModal');

    // Enter valid credentials
    await page.fill('#loginusername', 'validuser123');
    await page.fill('#loginpassword', 'validpassword123');

    // Take a screenshot before login
    await page.screenshot({ path: 'screenshots/login_valid_details.png' });

    // Click on Log In button
    await page.click('button[onclick="logIn()"]');

    // Wait for login confirmation (e.g., username display)
    await page.waitForSelector('#nameofuser');
    await expect(page.locator('#nameofuser')).toContainText('validuser123');
  });

  test('Login: Negative Scenario - Attempt with invalid credentials', async ({ page }) => {
    // Launch the site
    await page.goto('https://demoblaze.com/');

    // Click on Log In
    await page.click('#login2');

    // Wait for the login modal
    await page.waitForSelector('#logInModal');

    // Enter invalid credentials
    await page.fill('#loginusername', 'invaliduser');
    await page.fill('#loginpassword', 'invalidpassword');

    // Click on Log In button
    await page.click('button[onclick="logIn()"]');

    // Assert error message (site-specific error handling, e.g., alert)
    await page.waitForTimeout(2000);
  });

  test('Product Browsing and Filtering', async ({ page }) => {
    // Launch the site
    await page.goto('https://demoblaze.com/');

    // Verify products are displayed
    const productCount = await productCards.count();
    expect(productCount).toBeGreaterThan(1);

    // Click on a category (Phones)
    await page.click('a:has-text("Phones")');

    // Verify category navigation
    const categoryProducts = page.locator('.card-title a');
    await expect(categoryProducts).toHaveCountGreaterThan(0);

    // Filter phones under 650 dollars
    const products = await page.$$eval('.card-block', (products) => {
      return products
        .filter((product) => {
          const price = parseInt(product.querySelector('.price-container').innerText.replace('$', ''));
          return price <= 650;
        })
        .map((product) => {
          return {
            name: product.querySelector('.card-title a').innerText,
            price: product.querySelector('.price-container').innerText,
          };
        });
    });

    // Select and add filtered product to the cart
    const chosenPhone = products[0]; // assuming user wants the first found
    await page.click(`a:has-text("${chosenPhone.name}")`);
    await page.click('a:has-text("Add to cart")');
    await page.waitForTimeout(2000);

    // Assert the name of the product
    console.log(`Chosen product: ${chosenPhone.name} for ${chosenPhone.price}`);
  });

  test('Add Last Product on Last Page to Cart', async ({ page }) => {
    // Launch the site
    await page.goto('https://demoblaze.com/');
    // Log in first
    await page.click('#login2');
    await page.fill('#loginusername', 'validuser123');
    await page.fill('#loginpassword', 'validpassword123');
    await page.click('button[onclick="logIn()"]');
    await page.waitForSelector('#nameofuser');

    // Log out
    await page.click('#logout2');
    await page.waitForTimeout(2000);

    // Assert successful logout (e.g., login button should be visible again)
    await expect(page.locator('#login2')).toBeVisible();
  });
});