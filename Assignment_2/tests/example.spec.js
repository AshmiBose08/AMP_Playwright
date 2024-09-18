const { test, expect } = require('@playwright/test');

test.describe('DEMOQA Form Automation', () => {
  test('should validate error on invalid email and then verify form submission with valid email', async ({ page }) => {
    // Step 1: Launch the website
    await page.goto('https://demoqa.com/');

    // Step 2: Verify the page title is "DEMOQA"
    await expect(page).toHaveTitle('DEMOQA');

    // Step 3: Click on the "Elements" card
    await page.click('h5:has-text("Elements")');

    // Step 4: Click on the "Text Box" option from the menu
    await page.click('text="Text Box"');

    // Step 5: Fill out the form with invalid email first to check for error validation
    await page.fill('#userName', 'Your Name');
    await page.fill('#userEmail', 'Test email'); // Invalid email
    await page.fill('#currentAddress', '123 Sample Current Address');
    await page.fill('#permanentAddress', '456 Sample Permanent Address');

    // Step 6: Click the submit button
    await page.click('#submit');

    // Step 7: Validate that an error is displayed for the invalid email
    const emailField = await page.locator('#userEmail');
    const validationMessage = await emailField.evaluate((node) => node.validationMessage);
    
    expect(validationMessage).toContain('Please include an \'@\' in the email address.');

    // Step 8: Now, correct the email with a valid one and resubmit the form
    await page.fill('#userEmail', 'validemail@example.com'); // Valid email
    await page.click('#submit'); // Submit again

    // Step 9: Validate that the entered values are correctly displayed in the output section

    // Validate Name
    const outputName = await page.locator('#output #name').innerText();
    expect(outputName).toContain('Your Name');

    // Validate Email
    const outputEmail = await page.locator('#output #email').innerText();
    expect(outputEmail).toContain('validemail@example.com');

    // Validate Current Address
    const outputCurrentAddress = await page.locator('#output #currentAddress').innerText();
    expect(outputCurrentAddress).toContain('123 Sample Current Address');

    // Validate Permanent Address
    const outputPermanentAddress = await page.locator('#output #permanentAddress').innerText();
    expect(outputPermanentAddress).toContain('456 Sample Permanent Address');

    // Optional: Screenshot for visual confirmation
    await page.screenshot({ path: 'form-submission-success.png' });

    // Print a confirmation to the console
    console.log('Form submitted successfully and values are displayed correctly.');
  });
});