import {test , expect} from '@playwright/test';
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));


test ('Termination of the Approved Subsidy Application', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Facilities' }).click();
await page.waitForTimeout(3000);

await page.getByRole('button', { name: 'Search' }).click();

const FacilityID = InputDetails.facilityId; //ADDED THIS IN JASON

await page.getByLabel('Facility ID').fill(FacilityID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${FacilityID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });
await ApplicationIDLink.click();
console.log(`✅ Successfully opened Facility ID: ${FacilityID}`);

await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Subsidy Authorization' }).click();

await page.waitForTimeout(2000);

await page.getByRole('link', { name: 'Terminate' }).isVisible();
await page.getByRole('button', { name: 'Terminate' }).isEnabled();
await page.getByRole('button', { name: 'Terminate' }).click();


// Locate the first row's Subsidy Status cell
const subsidyStatusCell = page.locator(
  '#CurrentSubsidyCertificationGrid tr.k-master-row td:first-child'
);

// Wait until visible
await expect(subsidyStatusCell).toBeVisible();

// Get text
const subsidyStatus = (await subsidyStatusCell.textContent())?.trim();

// Print value
console.log('Subsidy Status:', subsidyStatus);

// Assert value
await expect(subsidyStatusCell).toHaveText('Terminated');

});