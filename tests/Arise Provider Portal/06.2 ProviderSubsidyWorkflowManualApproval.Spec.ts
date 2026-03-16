import {test, expect} from '@playwright/test';
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));


test('Approval of the Facility Subsidy Rates', async ({context}) => {
  const page = await context.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Subsidy Applications' }).click();
  await page.waitForTimeout(4000);

  //expand the grid to show all the records on screen

await page.getByRole('button', {name:'Show All'}).first().isVisible();
await page.getByRole('button', {name:'Show All'}).first().click();
await page.waitForTimeout(2000);

//Search the Subsidy Application ID to approve the profile
const SubsidyApplicationID = InputDetails.subsidyApplicationId; //ADDED THIS IN JASON
const SubsidyApplicationLink = page.locator(`td[role="gridcell"] a:has-text("${SubsidyApplicationID}")`);
// Ensure it's visible and click
await expect(SubsidyApplicationLink).toBeVisible({ timeout: 5000 });
await SubsidyApplicationLink.click();
console.log(`✅ Successfully opened Subsidy Application ID: ${SubsidyApplicationID}`);

//  const SubsidyApplicationIDToFind = 'FSA00581';
//   let found = false;
//   let currentPage = 1;

//   while (!found) {
//     console.log(`Searching for ${SubsidyApplicationIDToFind} on page ${currentPage}...`);

//     // Check if Subsidy Application ID exists on the current page
//     const subsidyApplicationLink = page.locator(`td[role="gridcell"] a:has-text("${SubsidyApplicationIDToFind}")`);
//     const exists = await subsidyApplicationLink.count();
//     if (exists > 0) {
//       await expect(subsidyApplicationLink.first()).toBeVisible();
//       await subsidyApplicationLink.first().click();
//       console.log(`Found and clicked Subsidy Application ID: ${SubsidyApplicationIDToFind} on page ${currentPage}`);
//       found = true;
//       break;
//     }

//     // Check if the Next Page button is disabled (no more pages)
// const nextPage = page.locator('#gridSearchResults a.k-pager-nav[aria-label="Go to the next page"]');
//     const isDisabled = await nextPage.getAttribute('aria-disabled');

//     if (isDisabled === 'true' || !(await nextPage.isVisible())) {
//       console.log(`❌ Subsidy Application ID ${SubsidyApplicationIDToFind} not found on any page.`);
//       break;
//     }

//     // Go to the next page
//     console.log('Moving to the next page...');
//     await nextPage.click();
//     await page.waitForTimeout(4000); // Wait for table to load new data
//     currentPage++;
//   }

//   if (!found) {
//     throw new Error(`Subsidy Application ID ${SubsidyApplicationIDToFind} was not found in the table.`);
//   }


await page.waitForTimeout(2000);

await page.getByRole('link', { name: 'Approve Facility Subsidy Rates' }).click(); 

await page.waitForTimeout(2000);

const submittedRateLink = page.locator(
  'tr.k-master-row:has(td:text("Submitted")) a'
);

await expect(submittedRateLink).toBeVisible();
await submittedRateLink.click();
console.log('✅ Successfully opened Submitted Rate details');

await page.waitForLoadState('networkidle');

await page.getByRole('button', { name: 'Approve' }).click();
await page.waitForTimeout(2000);
const approvedButton = page.locator('div[id^="WorkflowButtonsDiv_"] button:has-text("Approved")');

await expect(approvedButton).toBeVisible();
await expect(approvedButton).toBeDisabled();

console.log(
  'Workflow Status Button:',
  (await approvedButton.textContent())?.trim());


await page.pause();

});


test('Update the Effective Date', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Subsidy Applications' }).click();
  await page.waitForTimeout(4000);

  //expand the grid to show all the records on screen

await page.getByRole('button', {name:'Show All'}).first().isVisible();
await page.getByRole('button', {name:'Show All'}).first().click();
await page.waitForTimeout(2000);

//Search the Subsidy Application ID to approve the profile
const SubsidyApplicationID = InputDetails.subsidyApplicationId; //ADDED THIS IN JASON
const SubsidyApplicationLink = page.locator(`td[role="gridcell"] a:has-text("${SubsidyApplicationID}")`);
// Ensure it's visible and click
await expect(SubsidyApplicationLink).toBeVisible({ timeout: 5000 });
await SubsidyApplicationLink.click();
console.log(`✅ Successfully opened Subsidy Application ID: ${SubsidyApplicationID}`);

await page.waitForTimeout(2000);

await page.getByRole('link', { name: 'Set Effective Date' }).click(); 

await page.waitForTimeout(2000);


await page.getByLabel('Effective Date').fill('10/15/2024');
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(2000);

});


test('Approve the Subsidy Application', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Subsidy Applications' }).click();
  await page.waitForTimeout(4000);

await page.getByRole('button', {name:'Show All'}).first().isVisible();
await page.getByRole('button', {name:'Show All'}).first().click();
await page.waitForTimeout(2000);

//Search the Subsidy Application ID to approve the profile
const SubsidyApplicationID = InputDetails.subsidyApplicationId; //ADDED THIS IN JASON
const SubsidyApplicationLink = page.locator(`td[role="gridcell"] a:has-text("${SubsidyApplicationID}")`);
// Ensure it's visible and click
await expect(SubsidyApplicationLink).toBeVisible({ timeout: 5000 });
await SubsidyApplicationLink.click();
console.log(`✅ Successfully opened Subsidy Application ID: ${SubsidyApplicationID}`);

await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Approve' }).isEnabled();
await page.getByRole('button', { name: 'Approve' }).isVisible();
await page.getByRole('button', { name: 'Approve' }).click();
await page.waitForTimeout(2000);
});
