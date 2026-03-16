import { Page, Locator } from '@playwright/test';

export class OrientationPage {
  readonly page: Page;

  // Navigation locators
  readonly applicationsButton: Locator;
  readonly actionNeededLink: Locator;
  readonly orientationLink: Locator;
  readonly clickHereLink: Locator;
  readonly takeQuizLink: Locator;

  // Save button locator
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.applicationsButton = page.getByRole('button', { name: 'Applications' });
    this.actionNeededLink = page.getByRole('link', { name: 'Action Needed' });
    this.orientationLink = page.locator('a[href*="/FacilityApplication/"][href*="/Orientation"]');
    this.clickHereLink = page.getByRole('link', { name: 'Click here' });
    this.takeQuizLink = page.getByRole('link', { name: 'Take Orientation Quiz' });

    // Save
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToOrientation(): Promise<void> {
    await this.applicationsButton.click();
    await this.page.waitForTimeout(1000);
    await this.actionNeededLink.click();
    await this.orientationLink.click();
    await this.clickHereLink.click();
    await this.takeQuizLink.click();
  }

  async answerQuiz(): Promise<void> {
    // Array of quiz answer checkbox selectors
    const answers: string[] = [
      '#Questions_1__Options_0__IsSelected',      
      '#Questions_2__Options_0__IsSelected',
      '#Questions_3__Options_1__IsSelected',
      '#Questions_4__Options_0__IsSelected',
      '#Questions_5__Options_1__IsSelected',

      '#Questions_6__Options_1__IsSelected',
      '#Questions_7__Options_1__IsSelected',
      '#Questions_9__Options_0__IsSelected',
      '#Questions_10__Options_0__IsSelected',
      '#Questions_11__Options_1__IsSelected',

      '#Questions_12__Options_1__IsSelected',
      '#Questions_13__Options_1__IsSelected',
      '#Questions_14__Options_0__IsSelected',
      '#Questions_15__Options_0__IsSelected',
      '#Questions_16__Options_0__IsSelected',

      '#Questions_17__Options_1__IsSelected',
      '#Questions_18__Options_0__IsSelected',
      '#Questions_19__Options_1__IsSelected',
      '#Questions_21__Options_0__IsSelected',
      '#Questions_22__Options_0__IsSelected',

      '#Questions_23__Options_0__IsSelected',
      '#Questions_24__Options_1__IsSelected',
      '#Questions_25__Options_0__IsSelected',
      

      
    ];

    for (const selector of answers) {
      const option = this.page.locator(selector);
      await option.check();
    }
  }

  async saveQuiz(): Promise<void> {
    await this.saveButton.click();
  }
}
