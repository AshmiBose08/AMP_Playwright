const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login as User 1
  await page.goto('https://www.automationexercise.com/');
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', 'user1@example.com'); // Replace with valid email for User 1
  await page.fill('[data-qa="login-password"]', 'password123'); // Replace with valid password for User 1
  await page.click('[data-qa="login-button"]');
  
  // Add product to cart
  await page.click('a[href="/product1"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  
  // Logout
  await page.click('a[href="/logout"]');

  // Login as User 2
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', 'user2@example.com'); // Replace with valid email for User 2
  await page.fill('[data-qa="login-password"]', 'password123'); // Replace with valid password for User 2
  await page.click('[data-qa="login-button"]');
  
  // Add product to cart
  await page.click('a[href="/product2"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  
  // Navigate to Cart and validate prices
  await page.click('a[href="/cart"]');
  const product1Price = await page.textContent('selector-for-product1-price'); // Replace with actual selector
  const product2Price = await page.textContent('selector-for-product2-price'); // Replace with actual selector
  console.log('Product 1 Price:', product1Price);
  console.log('Product 2 Price:', product2Price);
  
  // Close the browser
  await browser.close();
})();