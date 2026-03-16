import { Page, expect } from '@playwright/test';

export class AcknowledgementPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToAcknowledgement() {
    await this.page.getByRole('button', { name: 'Applications' }).click();
    await this.page.waitForTimeout(1000);

    await this.page.getByRole('link', { name: 'Action Needed' }).click();

    const firstAppLink = this.page.locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]').first();
    const appId = await firstAppLink.innerText();

    await firstAppLink.click();
    console.log(`Clicked first Application ID: ${appId}`);

    await this.page.getByRole('link', { name: 'Acknowledgement' }).click();
    await this.page.waitForTimeout(1000);
  }

  async selectYesRadio(questionIndex: number) {
    const yesRadio = this.page.locator(`input#Responses_${questionIndex}__IsYes_yes`);
    await yesRadio.waitFor({ state: 'visible' });
    await yesRadio.click();
    await expect(yesRadio).toBeChecked();
    console.log(`✅ Selected "Yes" for question ${questionIndex + 1}`);
  }

  async answerAllQuestionsYes(totalQuestions: number) {
    for (let i = 0; i < totalQuestions; i++) {
      await this.selectYesRadio(i);
    }
  }

  async saveAcknowledgement() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1000);
    console.log('💾 Acknowledgement details saved successfully!');
  }
}
