module.exports = {
  use: {
    headless: false,        // Set to true for headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',  // Capture screenshots on failure
    video: 'retain-on-failure',     // Capture videos on failure
  },
  timeout: 60000,  // Set global timeout
  retries: 1,      // Retry failed tests once
};