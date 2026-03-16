import {test, expect, BrowserContext} from '@playwright/test'; 
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));

test('Approve the Facility Profile', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');


  await page.getByRole('link', { name: 'Provider' }).click();
  await page.getByRole('link', { name: 'Facility Applications' }).click();
  await page.waitForTimeout(4000);

const providerIdToFind = InputDetails.providerId;
let found = false;

const submittedGrid = page.locator('#gridSubmittedSearchResults');
const loadingMask = page.locator('.k-loading-mask');

while (true) {
  // Wait for grid to be idle
  await loadingMask.waitFor({ state: 'hidden' });

  const providerLink = submittedGrid.locator(
    `td[role="gridcell"] a:has-text("${providerIdToFind}")`
  );

  if (await providerLink.count() > 0) {
    await providerLink.first().click();
    console.log(`✅ Opened Provider ID: ${providerIdToFind}`);
    found = true;
    break;
  }

  const nextPage = submittedGrid.locator(
    'a.k-pager-nav[aria-label="Go to the next page"]'
  );

  // IMPORTANT: wait for pager to stabilize
  await expect(nextPage).toBeVisible();

  const disabled = await nextPage.getAttribute('aria-disabled');

  if (disabled === 'true') {
    break; // reached last page
  }

  await nextPage.click();

  // Wait for Kendo to finish loading new page
  await loadingMask.waitFor({ state: 'visible' });
  await loadingMask.waitFor({ state: 'hidden' });
}

if (!found) {
  throw new Error(
    `❌ Provider ID ${providerIdToFind} not found in Submitted Applications grid`
  );
}

await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Profile Approval', exact: true }).click(); 
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Send To Worker' }).click();

await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Approve' }).click();

});

test ('Approve the Submitted Facility Application from Admin Portal', async ({context}) => {
  const page = await context.newPage();
  await page.goto(InputDetails.AdminPortalURL);
  await page.fill('#UserName', 'SystemAdmin');
    await page.fill('#Password', 'Pass@123');
    await page.click('#btn-login');
    console.log('Login Successful');
await page.getByRole('link', { name: 'Provider' }).click();
await page.getByRole('link', { name: 'Facility Applications' }).click();
await page.waitForTimeout(3000);

await page.getByRole('button', { name: 'Search' }).click();

const ApplicationID = InputDetails.applicationId; //ADDED THIS IN JASON

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });
await ApplicationIDLink.click();
console.log(`✅ Successfully opened Application ID: ${ApplicationID}`);

await page.waitForTimeout(2000);


const sendToWorkerButton = page.locator('button[id*="workflowButtonAction_"][id*="_SendToWorker"]');

const acceptButton = page.locator('button[id*="workflowButtonAction_"][id*="_Accept"]');

// If "Send To Worker" exists & is visible, click it first
if (await sendToWorkerButton.isVisible()) {
  await expect(sendToWorkerButton).toBeEnabled();
  await sendToWorkerButton.click();
  console.log('Clicked Send To Worker');

  // Wait for Accept button to appear after workflow transition
  await acceptButton.waitFor({ state: 'visible' });
}

// Click Accept (always)
await expect(acceptButton).toBeEnabled();
await acceptButton.click();
console.log('Clicked Accept successfully!');
await page.waitForTimeout(2000);
});   