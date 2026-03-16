import {test, expect, BrowserContext} from '@playwright/test';
import { asyncWrapProviders } from 'async_hooks';
import { FacilityApplicationPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/FacilityApplicationPage';
import { OrientationPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/OrientationPage';
import { FacilityOperationInformationPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/FacilityOperationInformation';
import { FireSafetyInspectionCertificatePage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/FireSafetyInspectionCertificate';
import path from 'path';
import fs from 'fs';
import { BuildingUserAgreementPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/BuildingUserAgreement';
import { SupportingDocumentsPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/SupportingDocuments';
import { AcknowledgementPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/Acknowledgement';
import { SummaryPage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/SummaryPage';
import { HouseholdResidencePage } from '../../Resources/Pages/AriseProviderPortalLicenseApplication/Household Residence';
let webContext: BrowserContext;
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));



test.beforeAll(async ({browser}) => {
  console.log('This runs before all tests');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  await page.fill('#UserName', InputDetails.EmailID);
  await page.fill('#Password', InputDetails.Password);
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('Login Successful');
  await context.storageState({path: 'state1.json'});
  webContext = await browser.newContext({storageState: 'state1.json'});
});


test('Verify Facility App Submission Page', async () => {
  const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  await expect(page).toHaveTitle('Arise - Dashboard ');
  console.log('Facility App Submission Page Title Verified');
});

test('Create a new Facility Application', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  const facilityApp = new FacilityApplicationPage(page);  
  await facilityApp.navigateToFacilityApplications();
  await facilityApp.fillFacilityForm();
  await facilityApp.continue();
});

test('Complete the Orientation quiz successfully', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
const orientationPage = new OrientationPage(page);
  await orientationPage.navigateToOrientation();
  await orientationPage.answerQuiz();
  await orientationPage.saveQuiz();
});


test('Update Facility Operation Information for Facility Application', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);

const facilityPage = new FacilityOperationInformationPage(page);

    console.log('Starting Facility Operation Information test...');

    // Step 1: Navigate to Facility Operation Information
    await facilityPage.navigateToFacilityOperationInformation();
    await page.waitForTimeout(2000);

    // Step 2: Select the first option from Service Schedule dropdown
    await facilityPage.selectServiceSchedule();

    // Step 3: Fill Opening and Closing Time
    await facilityPage.fillOperatingHours('08:00 AM', '06:00 PM');

    // Step 4: Enable Day Time and enter age range
    await facilityPage.dayTimeCheckbox.check();
    await expect(facilityPage.dayTimeCheckbox).toBeChecked();

    await expect(facilityPage.dayStartInput).toBeVisible();
    await facilityPage.dayStartInput.type('4', { delay: 100 });

    await facilityPage.startRangeDropdown.click();
    await expect(facilityPage.startRangeListbox).toBeVisible();
    await facilityPage.startRangeOptionYears.click();
    await expect(facilityPage.startRangeDropdown.locator('.k-input-value-text')).toHaveText('Years');

    await facilityPage.dayEndInput.type('10', { delay: 100 });

    await facilityPage.endRangeDropdown.click();
    await expect(facilityPage.endRangeListbox).toBeVisible();
    await facilityPage.endRangeOptionYears.click();
    await expect(facilityPage.endRangeDropdown.locator('.k-input-value-text')).toHaveText('Years');

    // Step 5: Select working days and times
    const days = [
      { checkbox: facilityPage.mondayCheckbox, open: facilityPage.mondayOpenTime, close: facilityPage.mondayCloseTime },
      { checkbox: facilityPage.tuesdayCheckbox, open: facilityPage.tuesdayOpenTime, close: facilityPage.tuesdayCloseTime },
      { checkbox: facilityPage.wednesdayCheckbox, open: facilityPage.wednesdayOpenTime, close: facilityPage.wednesdayCloseTime },
      { checkbox: facilityPage.thursdayCheckbox, open: facilityPage.thursdayOpenTime, close: facilityPage.thursdayCloseTime },
      { checkbox: facilityPage.fridayCheckbox, open: facilityPage.fridayOpenTime, close: facilityPage.fridayCloseTime },
    ];

    for (const { checkbox, open, close } of days) {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
      await open.fill('08:00 AM');
      await close.fill('06:00 PM');
      await page.waitForTimeout(500);
    }

    // Step 6: Select multiple values in Age Group multi-select
    const valuesToSelect = ['Infant'];

    for (const value of valuesToSelect) {
      await facilityPage.multiSelectInput.click();
      await expect(facilityPage.multiSelectListBox).toBeVisible({ timeout: 5000 });

      const option = facilityPage.multiSelectListBox.locator('li', { hasText: value });
      await expect(option).toBeVisible({ timeout: 3000 });
      await option.click();

      // Wait for dropdown to close after selection
      await facilityPage.multiSelectListBox.waitFor({ state: 'hidden', timeout: 5000 });
    }

    for (const value of valuesToSelect) {
      await expect(facilityPage.multiSelectTags(value)).toBeVisible();
    }

    console.log('✅ Multiple values selected successfully!');

    // Step 7: Select Traditional checkbox
    const traditionalCheckbox = page.getByRole('checkbox', { name: 'Traditional', exact: true });
    await traditionalCheckbox.check();
    await expect(traditionalCheckbox).toBeChecked();

    // Step 8: Add Closure (e.g., Christmas Holiday)
    await facilityPage.fillClosure('25-12-2025', 'Christmas Holiday');

    // Step 9: Click Update to save
    await expect(facilityPage.updateButton).toBeVisible({ timeout: 5000 });
    await expect(facilityPage.updateButton).toBeEnabled();
    await facilityPage.updateButton.click({ timeout: 5000 });

    await page.waitForLoadState('networkidle');
    console.log('✅ Clicked Update successfully!');

    // Step 10: Click Save to finalize
    await expect(facilityPage.saveButton).toBeVisible({ timeout: 5000 });
    await expect(facilityPage.saveButton).toBeEnabled();
    await facilityPage.saveButton.click({ timeout: 5000 });


});

test('Update Fire Safety Inspection Certificate', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);

  const fireSafetyPage = new FireSafetyInspectionCertificatePage(page);

  // Navigate to the app & open Fire Safety Inspection Certificate section
  await fireSafetyPage.navigateToFirstApplication();
    await page.waitForLoadState('networkidle');


  await fireSafetyPage.openFireSafetyInspectionCertificate();
  await page.waitForLoadState('networkidle');

  // Fill all Fire Safety Inspection details
  await fireSafetyPage.fillInspectionDetails();
  await page.waitForLoadState('networkidle');


  // Upload Fire Safety Inspection Certificate file
  await fireSafetyPage.uploadCertificateFile();

  // Save details
  await fireSafetyPage.saveDetails();


});


test('Update Supporting Documents', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
const supportingDocs = new SupportingDocumentsPage(page);

  await supportingDocs.navigateToSupportingDocuments();
  await supportingDocs.uploadAllSupportingDocuments();

  console.log('✅ All supporting documents uploaded successfully!');


});


test('Update Summary Page', async () => {
const page = await webContext.newPage();
await page.goto(InputDetails.ProviderPortalURL);
const summaryPage = new SummaryPage(page);

  await summaryPage.navigateToSummary();
  await summaryPage.checkCertifyCheckbox();
  await summaryPage.fillSignature('Expected School Provider');
  await summaryPage.submitApplication();

  console.log('✅ Summary page submission process completed successfully!');

});

test('Capture Provider ID', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  await page.getByRole('button', { name: 'Provider', exact: true }).click(); 
  await page.getByRole('link', { name: 'Profile', exact: true }).click(); 
  // Capture Provider ID
const providerIdContainer = page.locator(
  'label[for="ProviderID"]'
).locator('xpath=parent::div');

const providerIdRaw = await providerIdContainer.textContent();
const providerIdMatch = providerIdRaw?.match(/P\d+/);

if (!providerIdMatch) {
  throw new Error('Provider ID not found');
}

const providerId = providerIdMatch[0];
console.log('Captured Provider ID:', providerId);

// Save to JSON
const filePath = path.resolve(__dirname, '../../Resources/TestData/InputDetails.json');
let data = fs.existsSync(filePath)
  ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  : {};

data.providerId = providerId;

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});


test('Capture Application ID', async () => {
const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  await page.getByRole('button', { name: 'Applications', exact: true }).click(); 
  await page.getByRole('link', { name: 'Facility Applications', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // // ✅ Wait for Application ID link (APxxx)
  // const applicationLink = page.getByRole('link', { name: /^AP\d+$/ }).first();
  // await expect(applicationLink).toBeVisible();

  // const applicationId = (await applicationLink.textContent())?.trim();

  // const row = applicationLink.locator('xpath=ancestor::tr');
  // const facilityId = (await row.locator('td').nth(1).textContent())?.trim();

  // if (!applicationId || !facilityId) {
  //   throw new Error('Application ID or Facility ID not found');
  // }

  // console.log('Application ID:', applicationId);
  // console.log('Facility ID:', facilityId);

  // Alternative method to capture Application ID and Facility ID
  const row = page.locator('#completedapplications tbody tr').first();

const applicationId = (await row.locator('td').nth(0).textContent())?.trim();
const facilityId = (await row.locator('td').nth(1).textContent())?.trim();

console.log('Application ID:', applicationId);
console.log('Facility ID:', facilityId);

  // Save to JSON
  const filePath = path.resolve(__dirname, '../../Resources/TestData/InputDetails.json');
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : {};

  data.applicationId = applicationId;
  data.facilityId = facilityId;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});






