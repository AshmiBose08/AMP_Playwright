class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = '#user-name'; // Update with the actual selector for username
      this.passwordInput = '#password';  // Update with the actual selector for password
      this.loginButton = '#login-button'; // Update with the actual selector for login button
      this.errorMessage = '[data-test="error"]'; // Example selector for error message
    }
  
    async navigate(url) {
      await this.page.goto(url);
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  
    async getErrorMessage() {
      return await this.page.textContent(this.errorMessage);
    }
  }
  
  module.exports = LoginPage;