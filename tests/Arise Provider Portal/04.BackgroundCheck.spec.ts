import {test, expect, BrowserContext} from '@playwright/test'; 
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));


test('Approve the Background Check - Current Staff', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Facility Applications' }).click();
  await page.waitForTimeout(4000);

  await page.getByRole('button', { name: 'Search' }).click();

const ApplicationID = InputDetails.applicationId; //Added from InputDetails.json

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Background Checks' }).click();
await page.waitForLoadState('networkidle');

// Get all Background Check rows
const bcRows = page.locator('#gridCurrentBackgroundCheck tbody tr');
const totalRows = await bcRows.count();

console.log(`Total Background Check records: ${totalRows}`);

for (let i = 0; i < totalRows; i++) {
  const bcLink = bcRows.nth(i).locator('td:first-child a');

  await expect(bcLink).toBeVisible();
  const bcId = await bcLink.textContent();

  console.log(`Processing Background Check ID: ${bcId}`);

  await bcLink.click();
  await page.waitForLoadState('networkidle');

//Update Record for Criminal Background Check

const row = page.locator('#gridCriminalHistoryChecks tbody tr', {hasText: 'CBC_Doc_Test.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton = row.getByRole('button', { name: 'Edit' });
await expect(editButton).toBeVisible();
await editButton.click();
console.log('Clicked Edit for matching document row!');

await page.locator('#IssuedDate').isVisible();
await page.locator('#IssuedDate').fill('11/18/2025');
await page.waitForTimeout(1000);
await page.locator('#ReceivedDate').isVisible();
await page.locator('#ReceivedDate').fill('11/20/2025');
await page.waitForTimeout(1000);
await page.locator('#CBCResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Substantiated' }).isVisible();
await page.getByRole('option', { name: 'Not Substantiated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBC Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();


//Update Record for Child Abuse Neglect Check

const row1 = page.locator('#gridChildProtectionRegistrationChecks tbody tr', {hasText: 'CBN_Doc_Test.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton1 = row1.getByRole('button', { name: 'Edit' });
await expect(editButton1).toBeVisible();
await editButton1.click();
console.log('Clicked Edit for matching document row!');

await page.locator('#ReceivedDate').isVisible();
await page.locator('#ReceivedDate').fill('02/10/2026');
await page.waitForTimeout(2000);
await page.locator('#IssuedDate').isVisible();
await page.locator('#IssuedDate').fill('02/10/2026');

await page.waitForTimeout(2000);
await page.locator('#CPRResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Indicated' }).isVisible();
await page.getByRole('option', { name: 'Not Indicated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBN Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();
await page.waitForTimeout(1000);


//Update Disposition

const suitabilityDate = page.locator('#SuitabilityLetterDate');

// Create strict MM/DD/YYYY format
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

// Wait for field readiness
await expect(suitabilityDate).toBeVisible();
await expect(suitabilityDate).toBeEnabled();

// Clear properly
await suitabilityDate.click();
await suitabilityDate.press('Control+A');
await suitabilityDate.press('Delete');

// Fill and trigger change
await suitabilityDate.fill(formattedDate);

// 🔥 Important: trigger Kendo validation
await suitabilityDate.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));

// Blur field
await suitabilityDate.press('Tab');

// Validate
await expect(suitabilityDate).toHaveValue(formattedDate);

await page.getByRole('button', { name: 'Process Disposition' }).click();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Complete' }).click();
console.log('Completed Background Check successfully for Current Staff!');

// After completing one record, go back
  await page.getByRole('link', { name: 'Background Checks' }).click();
  await expect(page.locator('#gridCurrentBackgroundCheck')).toBeVisible();
}

}); 


test('Approve the Background Check - Provider and Contact Person', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Facility Applications' }).click();
  await page.waitForTimeout(4000);

  await page.getByRole('button', { name: 'Search' }).click();

const ApplicationID = InputDetails.applicationId; //Added from InputDetails.json

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Background Checks' }).click();
await page.waitForLoadState('networkidle');


// Get all Background Check rows
const bcRows = page.locator('#gridCurrentBackgroundCheckforProviderandPOC tbody tr');
const totalRows = await bcRows.count();

console.log(`Total Background Check records: ${totalRows}`);

for (let i = 0; i < totalRows; i++) {
  const bcLink = bcRows.nth(i).locator('td:first-child a');

  await expect(bcLink).toBeVisible();
  const bcId = await bcLink.textContent();

  console.log(`Processing Background Check ID: ${bcId}`);

  await bcLink.click();
  await page.waitForLoadState('networkidle');

//Update Record for Criminal Background Check

const row = page.locator('#gridCriminalHistoryChecks tbody tr', {hasText: 'CBC_Doc.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton1 = row.getByRole('button', { name: 'Edit' });
await expect(editButton1).toBeVisible();
await editButton1.click();
console.log('Clicked Edit for matching document row!');
await page.waitForTimeout(5000);

await page.locator('#ReceivedDate').isVisible();
await page.locator('#IssuedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#ReceivedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#CBCResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Substantiated' }).isVisible();
await page.getByRole('option', { name: 'Not Substantiated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBC Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();


//Update Record for Child Abuse Neglect Check

const row1 = page.locator('#gridChildProtectionRegistrationChecks tbody tr', {hasText: 'CBN_Doc.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton2 = row1.getByRole('button', { name: 'Edit' });
await expect(editButton2).toBeVisible();
await editButton2.click();
console.log('Clicked Edit for matching document row!');
await page.waitForTimeout(5000);



await page.locator('#ReceivedDate').fill('02/12/2026');

await page.locator('#IssuedDate').fill('02/12/2026');

await page.waitForTimeout(1000);
await page.locator('#CPRResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Indicated' }).isVisible();
await page.getByRole('option', { name: 'Not Indicated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBN Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();
await page.waitForLoadState('networkidle');

//Update Disposition

const suitabilityDate1 = page.locator('#SuitabilityLetterDate');

// Create strict MM/DD/YYYY format
const today1 = new Date();
const formattedDate1 = today1.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

// Wait for field readiness
await expect(suitabilityDate1).toBeVisible();
await expect(suitabilityDate1).toBeEnabled();

// Clear properly
await suitabilityDate1.click();
await suitabilityDate1.press('Control+A');
await suitabilityDate1.press('Delete');

// Fill and trigger change
await suitabilityDate1.fill(formattedDate1);

// 🔥 Important: trigger Kendo validation
await suitabilityDate1.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));

// Blur field
await suitabilityDate1.press('Tab');

// Validate
await expect(suitabilityDate1).toHaveValue(formattedDate1);
await page.getByRole('button', { name: 'Process Disposition' }).isVisible();
await page.getByRole('button', { name: 'Process Disposition' }).click();
await page.getByRole('button', { name: 'Complete' }).isVisible();
await page.getByRole('button', { name: 'Complete' }).click();
console.log('Completed Background Check successfully for Current Staff!');


// Go back to Background Check list and update second record if exists

await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Back to Background Check' }).click(); 

const secondBcLink = page
  .locator('#gridCurrentBackgroundCheckforProviderandPOC tbody tr')
  .nth(1) // Get the second row (index starts at 0)
  .locator('td:first-child a');
if (await secondBcLink.count() > 0) {
    await expect(secondBcLink).toBeVisible();
    const secondBcId = await secondBcLink.textContent();
    console.log(`Clicking second Background Check ID: ${secondBcId}`);
    await secondBcLink.click();
}

//Update Record for Criminal Background Check

const row0 = page.locator('#gridCriminalHistoryChecks tbody tr', {hasText: 'CBC_Doc.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton3 = row0.getByRole('button', { name: 'Edit' });
await expect(editButton3).toBeVisible();
await editButton3.click();
console.log('Clicked Edit for matching document row!');
await page.waitForTimeout(5000);

await page.locator('#IssuedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#ReceivedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#CBCResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Substantiated' }).isVisible();
await page.getByRole('option', { name: 'Not Substantiated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBC Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();


//Update Record for Child Abuse Neglect Check

const row2 = page.locator('#gridChildProtectionRegistrationChecks tbody tr', {hasText: 'CBN_Doc.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton4 = row2.getByRole('button', { name: 'Edit' });
await expect(editButton4).toBeVisible();
await editButton4.click();
console.log('Clicked Edit for matching document row!');
await page.waitForTimeout(5000);


await page.locator('#ReceivedDate').isVisible();
await page.locator('#ReceivedDate').fill('02/12/2026');

await page.locator('#IssuedDate').fill('02/12/2026');

await page.waitForTimeout(1000);
await page.locator('#CPRResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Indicated' }).isVisible();
await page.getByRole('option', { name: 'Not Indicated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBN Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();

//Update Disposition

const suitabilityDate = page.locator('#SuitabilityLetterDate');

// Create strict MM/DD/YYYY format
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

// Wait for field readiness
await expect(suitabilityDate).toBeVisible();
await expect(suitabilityDate).toBeEnabled();

// Clear properly
await suitabilityDate.click();
await suitabilityDate.press('Control+A');
await suitabilityDate.press('Delete');

// Fill and trigger change
await suitabilityDate.fill(formattedDate);

// 🔥 Important: trigger Kendo validation
await suitabilityDate.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));

// Blur field
await suitabilityDate.press('Tab');

// Validate
await expect(suitabilityDate).toHaveValue(formattedDate);

await page.getByRole('button', { name: 'Process Disposition' }).isVisible();
await page.getByRole('button', { name: 'Process Disposition' }).click();
await page.getByRole('button', { name: 'Complete' }).isVisible();
await page.getByRole('button', { name: 'Complete' }).click();
console.log('Completed Background Check successfully for Provider and Contact Person!');

console.log('Completed Background Check successfully for Current Staff!');
// After completing one record, go back
  await page.getByRole('link', { name: 'Background Checks' }).click();
  await expect(page.locator('#gridCurrentBackgroundCheck')).toBeVisible();
}
});


test('Approve the Background Check - Household Members', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Facility Applications' }).click();
  await page.waitForTimeout(4000);

  await page.getByRole('button', { name: 'Search' }).click();

const ApplicationID = InputDetails.applicationId; //Added from InputDetails.json

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Background Checks' }).click();

// Wait for table to load
await expect(page.locator('#gridBackgroundCheckforHouseholdMembers')).toBeVisible();

// Get all Background Check rows
const bcRows = page.locator('#gridBackgroundCheckforHouseholdMembers tbody tr');
const totalRows = await bcRows.count();

console.log(`Total Background Check records: ${totalRows}`);

for (let i = 0; i < totalRows; i++) {
  const bcLink = bcRows.nth(i).locator('td:first-child a');

  await expect(bcLink).toBeVisible();
  const bcId = await bcLink.textContent();

  console.log(`Processing Background Check ID: ${bcId}`);

  await bcLink.click();
  await page.waitForLoadState('networkidle');

//Update Record for Criminal Background Check

const row = page.locator('#gridCriminalHistoryChecks tbody tr', {hasText: 'CBC_Doc_Test.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton = row.getByRole('button', { name: 'Edit' });
await expect(editButton).toBeVisible();
await editButton.click();
console.log('Clicked Edit for matching document row!');

await page.waitForTimeout(4000);

await page.locator('#IssuedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#ReceivedDate').fill('01/20/2026');
await page.waitForTimeout(1000);
await page.locator('#CBCResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Substantiated' }).isVisible();
await page.getByRole('option', { name: 'Not Substantiated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).isVisible();
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBC Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).isVisible();
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();


//Update Record for Child Abuse Neglect Check

const row1 = page.locator('#gridChildProtectionRegistrationChecks tbody tr', {hasText: 'CBN_Doc_Test.docx'}); //The file name should be unique to ensure we are clicking the correct row
const editButton1 = row1.getByRole('button', { name: 'Edit' });
await expect(editButton1).toBeVisible();
await editButton1.click();
console.log('Clicked Edit for matching document row!');
await page.waitForTimeout(4000);

await page.locator('#ReceivedDate').fill('02/12/2026');

await page.locator('#IssuedDate').fill('02/12/2026');

await page.waitForTimeout(1000);
await page.locator('#CPRResultID_label').click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Not Indicated' }).isVisible();
await page.getByRole('option', { name: 'Not Indicated' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: 'save' }).click();
console.log('Updated CBN Document record successfully!');
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Back To Background Check Details' }).click();
await page.waitForTimeout(1000);

//Update Disposition

const suitabilityDate = page.locator('#SuitabilityLetterDate');

// Create strict MM/DD/YYYY format
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

// Wait for field readiness
await expect(suitabilityDate).toBeVisible();
await expect(suitabilityDate).toBeEnabled();

// Clear properly
await suitabilityDate.click();
await suitabilityDate.press('Control+A');
await suitabilityDate.press('Delete');

// Fill and trigger change
await suitabilityDate.fill(formattedDate);

// 🔥 Important: trigger Kendo validation
await suitabilityDate.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));

// Blur field
await suitabilityDate.press('Tab');

// Validate
await expect(suitabilityDate).toHaveValue(formattedDate);
await page.getByRole('button', { name: 'Process Disposition' }).isVisible();
await page.getByRole('button', { name: 'Process Disposition' }).click();
await page.getByRole('button', { name: 'Complete' }).isVisible();
await page.getByRole('button', { name: 'Complete' }).click();
console.log('Completed Background Check successfully for Household Member!');

// After completing one record, go back
  await page.getByRole('link', { name: 'Background Checks' }).click();
  await expect(page.locator('#gridCurrentBackgroundCheck')).toBeVisible();
}


}); 