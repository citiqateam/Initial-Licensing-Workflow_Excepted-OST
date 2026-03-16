import { expect, Locator, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';


export class FireSafetyInspectionCertificatePage {
  readonly page: Page;
  readonly applicationsButton: Locator;
  readonly actionNeededLink: Locator;
  readonly fireSafetyLink: Locator;
  readonly addInspectionDetailsLink: Locator;
  readonly inspectionDateInput: Locator;
  readonly inspectionSourceDropdown: Locator;
  readonly fireInspectionStatusDropdown: Locator;
  readonly inspectionNumberInput: Locator;
  readonly approvalDateInput: Locator;
  readonly expirationDateInput: Locator;
  readonly documentUploadInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applicationsButton = page.getByRole('button', { name: 'Applications' });
    this.actionNeededLink = page.getByRole('link', { name: 'Action Needed' });
    this.fireSafetyLink = page.getByRole('link', { name: 'Fire Safety Inspection Certificate' });
    this.addInspectionDetailsLink = page.getByRole('link', { name: 'Add Fire Safety Inspection Details' });
    this.inspectionDateInput = page.getByLabel('Inspection Date');
    this.inspectionSourceDropdown = page.locator('span[aria-controls="SafetyInspectionSourceID_listbox"]');
    this.fireInspectionStatusDropdown = page.locator('span[aria-controls="FireInspectionStatusID_listbox"]');
    this.inspectionNumberInput = page.locator('#FireSafetyInspectionNumber');
    this.approvalDateInput = page.getByLabel('Fire Safety Inspection Approval Date');
    this.expirationDateInput = page.getByRole('combobox', { name: 'Expiration Date' });
    this.documentUploadInput = page.locator('input#Documents[type="file"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToFirstApplication() {
    await this.applicationsButton.click();
    await this.page.waitForTimeout(1000);
    await this.actionNeededLink.click();

    const firstAppLink = this.page.locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]').first();
    const appId = await firstAppLink.innerText();
    await firstAppLink.click();
    console.log(`Opened Application ID: ${appId}`);
  }

  async openFireSafetyInspectionCertificate() {
    await this.fireSafetyLink.click();
    await this.addInspectionDetailsLink.click();
    await this.page.waitForLoadState('networkidle');
    console.log('Navigated to Fire Safety Inspection Certificate section.');
  }

  async fillInspectionDetails() {
    // Inspection Date
    await this.inspectionDateInput.fill('04/01/2025');

    // Source Dropdown
    await this.inspectionSourceDropdown.click();
    const sourceList = this.page.locator('#SafetyInspectionSourceID_listbox li');
    await expect(sourceList.first()).toBeVisible({ timeout: 5000 });
    await sourceList.first().click();

    // Fire Inspection Status Dropdown
    await this.fireInspectionStatusDropdown.click();
    await this.page.locator('#FireInspectionStatusID_listbox li:first-child').click();

    // Inspection Number
    await this.inspectionNumberInput.fill('SDJDl852369');
        await this.page.waitForTimeout(2000);


    // Approval & Expiration Dates
    await this.approvalDateInput.fill('10/01/2025');
    await this.page.waitForTimeout(2000);
    await this.expirationDateInput.fill('10/31/2026');
        await this.page.waitForTimeout(2000);
    console.log('Fire Safety Inspection details filled successfully!');
            await this.page.waitForTimeout(2000);

  }

  async uploadCertificateFile() {
  const filePath = path.resolve(
    process.cwd(),
    'Resources',
    'TestData',
    'Fire_Safety_Inspection_Certificate.pdf'
  );

  console.log('Uploading from:', filePath);

  await this.documentUploadInput.setInputFiles(filePath);

  console.log('File uploaded successfully!');
}

  async saveDetails() {
    await this.saveButton.click();
    console.log('Fire Safety Inspection details saved successfully!');
  }
}
