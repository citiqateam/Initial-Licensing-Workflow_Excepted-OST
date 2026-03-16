import { Page, expect } from '@playwright/test';

export class SummaryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the Summary tab for the first available application
  async navigateToSummary() {
    await this.page.getByRole('button', { name: 'Applications' }).click();
    await this.page.waitForTimeout(1000);

    await this.page.getByRole('link', { name: 'Action Needed' }).click();

    const firstAppLink = this.page
      .locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]')
      .first();
    const appId = await firstAppLink.innerText();

    await firstAppLink.click();
    console.log(`Clicked first Application ID: ${appId}`);

    await this.page.getByRole('link', { name: 'Summary' }).click();
    await this.page.waitForTimeout(1000);
  }

  // Check the certify checkbox
  async checkCertifyCheckbox() {
    const certifyCheckbox = this.page.locator('input#Signature_Certify[type="checkbox"]');
    await certifyCheckbox.waitFor({ state: 'visible' });
    await certifyCheckbox.click();
    await expect(certifyCheckbox).toBeChecked();
    console.log('✅ Checkbox "Signature_Certify" checked successfully!');
  }

  // Fill the provider signature
  async fillSignature(providerName: string) {
    const signatureField = this.page.locator('input#Signature_Signature');
    await signatureField.waitFor({ state: 'visible' });
    await signatureField.click();
    await signatureField.fill(providerName);
    console.log(`🖋️ Signature filled with name: ${providerName}`);
  }

  // Click submit
  async submitApplication() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.waitForTimeout(1000);
    console.log('🚀 Facility Application submitted successfully!');
  }
}
