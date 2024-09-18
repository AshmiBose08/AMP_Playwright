const { test, expect } = require('@playwright/test');

test.describe('DEMOQA Form Automation', () => {
  test('should validate error on email field', async ({ page }) => {
    // Step 1: Launch the website
    await page.goto('https://demoqa.com/');

    // Step 2: Verify the page title is "DEMOQA"
    await expect(page).toHaveTitle('DEMOQA');

    // Step 3: Click on the "Elements" card
    await page.click('h5:has-text("Elements")');

    // Step 4: Click on the "Text Box" option from the menu
    await page.click('text="Text Box"');

    // Step 5: Fill out the form with the required details
    await page.fill('#userName', 'Your Name');
    await page.fill('#userEmail', 'Test email'); // Invalid email
    await page.fill('#currentAddress', '123 Sample Current Address');
    await page.fill('#permanentAddress', '456 Sample Permanent Address');

    // Step 6: Click the submit button
    await page.click('#submit');

    // Step 7: Validate that an error is displayed for the invalid email
    // Since the page doesn't have a classic error message, we'll validate that 
    // the form field does not accept the invalid email and contains the default HTML5 invalid message.
    const emailField = await page.locator('#userEmail');
    const validationMessage = await emailField.evaluate((node) => node.validationMessage);
    
    // Step 8: Assertion to check if the invalid email error is displayed
    expect(validationMessage).toContain('Please include an \'@\' in the email address.');

    // Optional: Screenshot for visual confirmation of the error
    await page.screenshot({ path: 'email-error-screenshot.png' });
  });
});