import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class BuildingUserAgreementPage {
  readonly page: Page;
  readonly applicationsButton: Locator;
  readonly actionNeededLink: Locator;
  readonly buildingUseAgreementLink: Locator;
  readonly notarizedDropdown: Locator;
  readonly fileUploadInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applicationsButton = page.getByRole('button', { name: 'Applications' });
    this.actionNeededLink = page.getByRole('link', { name: 'Action Needed' });
    this.buildingUseAgreementLink = page.getByRole('link', { name: 'Building Use Agreement' });
    this.notarizedDropdown = page.locator(
      'span[aria-controls="BuildingAgreementData_NotorizedBuildingUseAgreementTypeID_listbox"]'
    );
    this.fileUploadInput = page.locator('input#ProofOfOwnershipDocuments[type="file"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToFirstApplication() {
    await this.applicationsButton.click();
    await this.page.waitForTimeout(1000);
    await this.actionNeededLink.click();

    const firstAppLink = this.page
      .locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]')
      .first();

    const appId = await firstAppLink.innerText();
    await firstAppLink.click();
    console.log(`📂 Opened Application ID: ${appId}`);
  }

  async openBuildingUseAgreementSection() {
    await this.buildingUseAgreementLink.click();
  }

  async selectNoOptionFromDropdown() {
    // Open dropdown
    await this.notarizedDropdown.click();

    // Wait for listbox
    const listbox = this.page.locator('#BuildingAgreementData_NotorizedBuildingUseAgreementTypeID_listbox');
    await expect(listbox).toBeVisible({ timeout: 5000 });

    // Click "No" option
    const noOption = listbox.locator('li', { hasText: 'No' });
    await noOption.scrollIntoViewIfNeeded();
    await noOption.click();

    // Verify selection
    await expect(this.notarizedDropdown.locator('.k-input-value-text')).toHaveText('No');
    console.log('✅ "No" option selected successfully!');
  }

  // async uploadBuildingUseAgreementFile() {
  //   const filePath = path.join(
  //     __dirname,
  //     '../../Resources/TestData/Building Use Agreement.pdf'
  //   );

  //   console.log('Uploading from:', filePath);
  //   await this.fileUploadInput.setInputFiles(filePath);
  //   await this.page.waitForTimeout(2000);
  //   console.log('✅ File uploaded successfully!');
  // }

  async saveAgreementDetails() {
    await this.saveButton.click();
    console.log('✅ Building Use Agreement details saved successfully!');
  }
}
