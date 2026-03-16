import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField;
  readonly passwordField;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#UserName');
    this.passwordField = page.locator('#Password');
    this.loginButton = page.locator('#btn-login');
  }

  async goto() {
    await this.page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
