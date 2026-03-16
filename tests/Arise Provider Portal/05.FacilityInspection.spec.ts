import {test, expect, BrowserContext} from '@playwright/test'; 
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));


test('Update Facility Inspection from CMS', async ({context}) => {
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

const ApplicationID = InputDetails.applicationId; //ADDED THIS IN JASON

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Inspections' }).click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Schedule New Inspection' }).click();

await page.waitForTimeout(2000);

await page.getByRole('combobox', { name: 'Inspection Method' }).click();
await page.getByRole('option', { name: 'On-Site' }).click();

await page.getByLabel('Comments').click();
await page.getByLabel('Comments').fill('Automation Test - Scheduling Inspection');
await page.waitForTimeout(1000); 

await page.getByRole('button', { name: 'Save' }).click();

await page.waitForLoadState('networkidle');
//await page.getByRole('button', { name: 'Option 1' }).click();

const targetSlot1 = page.locator('td').filter({ hasText: '' }).nth(9); 

// 3. Drag & Drop (Playwright built-in)
await page.getByRole('button', { name: 'Option 1' }).dragTo(targetSlot1);

await page.waitForTimeout(2000); 


const targetSlot2 = page.locator('td').filter({ hasText: '' }).nth(10); 

// 3. Drag & Drop (Playwright built-in)
await page.getByRole('button', { name: 'Option 2' }).dragTo(targetSlot2);

await page.waitForTimeout(2000); 

await page.getByRole('button', { name: 'Send Confirmation' }).click();

await page.waitForTimeout(2000);

});


test('Accept the Facility Application from Provider Portal', async ({context}) => {

const page = await context.newPage();
await page.goto(InputDetails.ProviderPortalURL);
  await page.fill('#UserName', InputDetails.EmailID);
  await page.fill('#Password', InputDetails.Password);
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('Login Successful');


await page.getByRole('button', { name: 'Scheduler' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Licensing Scheduler' }).click();

await page.getByRole('link', { name: 'Initial inspection' }).click();
await page.waitForTimeout(2000);

// Wait until the Proposed Appointments grid appears
const radioButtons = page.locator('#GridSchedule tbody input[type="radio"]');

// Ensure at least one exists
const count = await radioButtons.count();
console.log(`Found ${count} radio button(s)`);
// If none found, skip safely
if (count === 0) {
    console.log("No radio buttons found. Skipping.");
} else {
    console.log("Selecting the first radio button...");
    await radioButtons.first().check();   // .check() → safest for radio buttons
}

await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Confirm' }).click();

await page.getByRole('button', { name: 'OK' }).click();
await page.waitForTimeout(2000);

});



test('Complete the Facility Application from CMS ', async ({context}) => {

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

const ApplicationID = InputDetails.applicationId; //ADDED THIS IN JASON 

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Inspections' }).click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'Initial inspection ' }).click();

await page.waitForLoadState('networkidle');

await page.locator('#inspectionTabStrip-tab-2').click();

await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Not Applicable' }).first().click(); 
await page.waitForLoadState('networkidle');
await page.getByRole('button', { name: 'Not Applicable' }).nth(1).click();
await page.waitForTimeout(2000);

await page.locator('#navigate-save').click();
await page.waitForTimeout(2000);

//Update Staff Checklist
await page.locator('#inspectionTabStrip-tab-3').click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Add Staff Checklist' }).click(); 

await page.locator('#StaffNameDropdown_label').click();
await page.locator('#StaffNameDropdown_listbox').first().isVisible();
await page.locator('#StaffNameDropdown_listbox').first().click();

await page.locator('#Questions_0__Options_1__IsSelected').check();
await page.locator('#Questions_1__Options_1__IsSelected').check();
await page.locator('#Questions_2__Options_1__IsSelected').check();
await page.locator('#Questions_3__Options_1__IsSelected').check();
await page.locator('#Questions_4__Options_1__IsSelected').check();
await page.locator('#Questions_5__Options_1__IsSelected').check();
await page.locator('#Questions_6__Options_1__IsSelected').check();
await page.locator('#Questions_7__Options_1__IsSelected').check();
await page.locator('#Questions_8__Options_1__IsSelected').check();
await page.locator('#Questions_9__Options_1__IsSelected').check();
await page.locator('#Questions_10__Options_1__IsSelected').check();
await page.locator('#Questions_11__Options_1__IsSelected').check();
await page.locator('#Questions_12__Options_1__IsSelected').check();
await page.locator('#Questions_13__Options_1__IsSelected').check();
await page.locator('#Questions_14__Options_1__IsSelected').check();
await page.locator('#Questions_15__Options_1__IsSelected').check();
await page.locator('#Questions_16__Options_1__IsSelected').check();
await page.locator('#Questions_17__Options_1__IsSelected').check();
await page.locator('#Questions_18__Options_1__IsSelected').check();

await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Back To Staff Checklist' }).click();
await page.waitForTimeout(2000);
await page.locator('#StaffCheckListComplete').check();

//Update Classroom checklist
await page.locator('#inspectionTabStrip-tab-5').click();
const headerClassRoomChecklist = page.getByLabel('Classroom Checklist').getByText('Classroom Checklist', { exact: true })
await expect(headerClassRoomChecklist).toBeVisible();
console.log("Header Name:", (await headerClassRoomChecklist.textContent())?.trim());
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Add Classroom Checklist' }).click();

await page.locator('#ClassroomNameDropdown_label').click();
await page.locator('#ClassroomNameDropdown_listbox').first().isVisible();
await page.locator('#ClassroomNameDropdown_listbox').first().click();
await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Not Applicable' }).first().click(); 
await page.waitForLoadState('networkidle');

await page.locator('#navigate-save').click();

await page.waitForLoadState('networkidle');
await page.locator('#ClassroomCheckListComplete').isVisible();
await page.locator('#ClassroomCheckListComplete').check();
await page.waitForLoadState('networkidle');


//Update Child Checklist
await page.locator('#inspectionTabStrip-tab-4').click();
const headerChildChecklist = page.getByLabel('Child Checklist').getByText('Child Checklist', { exact: true })
await expect(headerChildChecklist).toBeVisible();
console.log("Header Name:", (await headerChildChecklist.textContent())?.trim());
await page.waitForTimeout(2000);
await page.locator('#ChildCheckListComplete').isVisible();
await page.locator('#ChildCheckListComplete').check();

//Update Summary Page
await page.locator('#inspectionTabStrip-tab-8').click();
await page.waitForTimeout(2000);
await page.locator('button[id^="workflowButtonAction_"][class*="Amend"]').click();
await page.waitForLoadState('networkidle');
await page.locator('button[id^="workflowButtonAction_"][class*="Complete"]').click();
await page.waitForTimeout(2000); 

});


test('Complete the License Approval Process from CMS ', async ({context}) => {

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

const ApplicationID = InputDetails.applicationId; //ADDED THIS IN JASON

await page.getByLabel('Application ID').fill(ApplicationID);

await page.getByRole('button', { name: 'Search' }).click();

await page.waitForTimeout(3000);
const ApplicationIDLink = page.locator(`td[role="gridcell"] a:has-text("${ApplicationID}")`);
// Ensure it's visible and click
await expect(ApplicationIDLink).toBeVisible({ timeout: 5000 });

await page.locator('table tbody tr td a[href*="/Facility/"]').first().click();

await page.waitForLoadState('networkidle');

await page.getByRole('link', { name: 'License Authorization' }).click();

await page.waitForLoadState('networkidle');

await page.locator('#EffectiveDate').click();
await page.locator('#EffectiveDate').type('11/28/2023', { delay: 200 });

await page.locator('button[id^="workflowButtonAction_"][class*="IssueFullLicense"]').click();


});