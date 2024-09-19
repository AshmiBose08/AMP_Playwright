const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Create a valid user
  await page.goto('https://www.automationexercise.com/');
  await page.click('a[href="/signup"]');
  await page.fill('[data-qa="signup-name"]', 'New User');
  await page.fill('[data-qa="signup-email"]', 'newuser@example.com'); // Replace with valid email
  await page.click('[data-qa="signup-button"]');
  await page.fill('[data-qa="password"]', 'newpassword'); // Replace with valid password
  await page.click('[data-qa="signup-submit"]');
  
  // Execute Scenario 1
  await page.goto('https://www.automationexercise.com/');
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', 'newuser@example.com'); // Replace with valid email
  await page.fill('[data-qa="login-password"]', 'newpassword'); // Replace with valid password
  await page.click('[data-qa="login-button"]');
  
  await page.click('a[href="/product1"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  await page.click('a[href="/product2"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  
  await page.click('a[href="/cart"]');
  const product1Price = await page.textContent('selector-for-product1-price'); // Replace with actual selector
  const product2Price = await page.textContent('selector-for-product2-price'); // Replace with actual selector
  console.log('Product 1 Price:', product1Price);
  console.log('Product 2 Price:', product2Price);

  // Execute Scenario 2
  await page.click('a[href="/logout"]');
  
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', 'user1@example.com'); // Replace with valid email for User 1
  await page.fill('[data-qa="login-password"]', 'password123'); // Replace with valid password for User 1
  await page.click('[data-qa="login-button"]');
  
  await page.click('a[href="/product1"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  
  await page.click('a[href="/logout"]');
  
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="login-email"]', 'user2@example.com'); // Replace with valid email for User 2
  await page.fill('[data-qa="login-password"]', 'password123'); // Replace with valid password for User 2
  await page.click('[data-qa="login-button"]');
  
  await page.click('a[href="/product2"]'); // Replace with actual product link or selector
  await page.click('[data-qa="add-to-cart"]');
  
  await page.click('a[href="/cart"]');
  const product1PriceUser1 = await page.textContent('selector-for-product1-price'); // Replace with actual selector
  const product2PriceUser2 = await page.textContent('selector-for-product2-price'); // Replace with actual selector
  console.log('Product 1 Price for User 1:', product1PriceUser1);
  console.log('Product 2 Price for User 2:', product2PriceUser2);
  
  // Close the browser
  await browser.close();
})();