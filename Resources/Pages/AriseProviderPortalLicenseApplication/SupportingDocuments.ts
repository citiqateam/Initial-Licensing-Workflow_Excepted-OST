import { Page, expect } from '@playwright/test';
import path from 'path';

export class SupportingDocumentsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSupportingDocuments() {
    await this.page.getByRole('button', { name: 'Applications' }).click();
    await this.page.waitForTimeout(1000);

    await this.page.getByRole('link', { name: 'Action Needed' }).click();

    const firstAppLink = this.page.locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]').first();
    const appId = await firstAppLink.innerText();

    await firstAppLink.click();
    console.log(`Clicked first Application ID: ${appId}`);

    await this.page.getByRole('link', { name: 'Supporting Documents' }).click();
    await this.page.waitForTimeout(1000);
  }

  async uploadDocument(buttonName: string, inputSelector: string, fileName: string) {
  const uploadButton = this.page.getByRole('button', { name: buttonName });
  await uploadButton.click();

  const fileInput = this.page.locator(`input${inputSelector}[type="file"]`);

  const filePath = path.resolve(
    process.cwd(),
    'Resources',
    'TestData',
    fileName
  );

  console.log(`Uploading "${fileName}" from:`, filePath);

  await fileInput.setInputFiles(filePath);

  await this.page.getByRole('button', { name: 'upload' }).click();
}

  async uploadAllSupportingDocuments() {
    
    await this.uploadDocument('Emergency Preparedness and Response Plan (EPRP) ', '#clDocumentUpload_166', 'Floor Plan.pdf');
    await this.uploadDocument('Health Department Inspection', '#clDocumentUpload_165', 'Health Inspection.pdf');
    
  }
}
