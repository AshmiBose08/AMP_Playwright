const { chromium } = require('playwright');

(async () => {
  // Launch the browser and create a new page
  const browser = await chromium.launch({ headless: false }); // Set headless to false to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to the demoqa page
  await page.goto('https://demoqa.com/');

  // Step 2: Navigate to the Alerts, Frames & Windows section
  await page.click('text=Alerts, Frame & Windows');

  // Step 3: Click on 'Open a New Window' and handle the new window
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'), // Wait for the new page to open
    page.click('text=Open a New Window') // Click to open the new window
  ]);

  // Step 4: Fetch the text from the new window
  const text = await newWindow.textContent('body');
  console.log('Text from the new window:', text);

  // Step 5: Navigate back to the parent window
  await newWindow.close();
  await page.bringToFront(); // Bring the parent window back to focus

  // Optionally, close the browser
  await browser.close();
})();