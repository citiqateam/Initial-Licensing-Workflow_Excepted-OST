import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly allCardNames;
  readonly cardFooterSpans;

  constructor(page: Page) {
    this.page = page;
    this.allCardNames = [
      'My Cases',
      'View Tasks',
      'View Notices',
      'Recently Cleared',
      'Supervising Workloads',
      'Schedule',
      'Messages'
    ];
    this.cardFooterSpans = page.locator('a.clickable-panel .panel-footer span');
  }

  async goto() {
    await this.page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  }

  async verifyTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async getAllCards() {
    const count = await this.cardFooterSpans.count();
    const cardNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await this.cardFooterSpans.nth(i).innerText();
      cardNames.push(name.trim());
    }
    return cardNames;
  }

  async clickCard(cardName: string) {
    await this.page.locator(`a:has-text("${cardName}")`).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCardHeader(cardName: string) {
    const header = this.page.locator(`a:has-text("${cardName}") >> div:text("${cardName}")`);
    await expect(header).toHaveText(cardName);
  }
}
