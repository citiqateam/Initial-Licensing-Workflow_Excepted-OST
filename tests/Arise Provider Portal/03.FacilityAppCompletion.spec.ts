import { test, expect, type BrowserContext, type Locator, Page } from '@playwright/test';
import { fillPlannedFields } from '../../Resources/Fixtures/fillPlannedFields';
import path from 'path';
import { ADDRGETNETWORKPARAMS } from 'dns';
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));



let webContext: BrowserContext;


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


test ('Verify Facility Application Page', async () => {
  const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  

await page.locator('a[href="/Facility/Facility"]').first().click();

  await expect(page).toHaveTitle('Arise - Facility Facility Management');
  console.log('Facility Application Page is displayed');

  await page.locator('a[href="/Facility/Facility"]').first().click();

// Locate the first link in the first data row of the Facility table
const firstFacilityLink = page.locator('table tbody tr:first-child td a');

// Wait until it’s visible and clickable
await firstFacilityLink.waitFor({ state: 'visible' });
await expect(firstFacilityLink).toBeEnabled();

// Click on the first Facility ID link
await firstFacilityLink.click();

await expect(page).toHaveTitle('Arise - Facility Facility Details');

console.log('Clicked the first Facility ID link successfully!');

 });


test ('Update Classroom Details', async () => {

const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  

await page.locator('a[href="/Facility/Facility"]').first().click();

// Locate the first link in the first data row of the Facility table
const firstFacilityLink = page.locator('table tbody tr:first-child td a');

// Wait until it’s visible and clickable
await firstFacilityLink.waitFor({ state: 'visible' });
await expect(firstFacilityLink).toBeEnabled();

// Click on the first Facility ID link
await firstFacilityLink.click();

const classroomLink = page.locator('a[href*="/Facility/"][href*="/Classroom"]');

await classroomLink.waitFor({ state: 'visible' });
await classroomLink.click();
console.log('Clicked Classroom link successfully!');

await page.getByRole('link', { name: 'Add New Classroom' }).isVisible();
await page.getByRole('link', { name: 'Add New Classroom' }).click();
console.log('Clicked Add New Classroom link successfully!');
await page.waitForTimeout(2000);

await page.getByPlaceholder('Classroom Name').fill('Automation Classroom 100'); 

// Click to open the Age Band dropdown
await page.locator('input[aria-controls="AgeBandTypeSelected_listbox"]').click();

// Wait for dropdown to become visible and stable
const listBox = page.locator('#AgeBandTypeSelected_listbox');
await listBox.waitFor({ state: 'visible', timeout: 5000 });

// Ensure all options are rendered
const options = listBox.locator('li');
await expect(options.first()).toBeVisible({ timeout: 5000 });

// ✅ Wait briefly for Kendo animation to complete
await page.waitForTimeout(1000);

// ✅ Click the first two options safely (force handles animation flicker)
await options.nth(0).click({ force: true });
await page.waitForTimeout(1000);
await options.nth(1).click({ force: true });

console.log('First two options selected successfully!');

await page.waitForTimeout(1000);

await page.locator('#Classroom_StartDate').click();
await page.locator('#Classroom_StartDate').type('01/01/2026', { delay: 100 });
await page.waitForTimeout(1000);
await page.locator('#Classroom_EndDate').click();
await page.locator('#Classroom_EndDate').type('12/31/2026', { delay: 100 });
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Save' }).click();
console.log('Classroom details saved successfully!');   
await page.waitForTimeout(2000);

const backToClassroom = page.getByRole('link', { name: 'Back To Classroom' });
await expect(backToClassroom).toBeVisible();
await backToClassroom.click();


await page.locator('input#classroomsComplete').isVisible
await page.locator('input#classroomsComplete').check();
console.log('Classroom section marked as complete successfully!');

});  
 
 

test ('Update Staff Details', async () => {

const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
await page.locator('a[href="/Facility/Facility"]').first().click();

// Locate the first link in the first data row of the Facility table
const firstFacilityLink = page.locator('table tbody tr:first-child td a');

// Wait until it’s visible and clickable
await firstFacilityLink.waitFor({ state: 'visible' });
await expect(firstFacilityLink).toBeEnabled();

// Click on the first Facility ID link
await firstFacilityLink.click();

const staffManagementLink = page.locator('a[href*="/Facility/"][href*="/StaffManagement"]');

await staffManagementLink.waitFor({ state: 'visible' });
await staffManagementLink.click();
console.log('Clicked Staff Management link successfully!');

await page.getByRole('link', { name: 'Add New Staff' }).isVisible();
await page.getByRole('link', { name: 'Add New Staff' }).click();
console.log('Clicked Add New Staff link successfully!');
await page.waitForTimeout(2000);

await page.getByPlaceholder('First Name').fill('Lara');
await page.getByPlaceholder('Last Name').fill('Desouza');
await page.getByRole('textbox', { name: 'Street 1' }).fill('1234 Elm Street');
await page.getByRole('textbox', { name: 'Street 2' }).fill('Park Avenue Street, NY');
await page.getByRole('textbox', { name: 'City' }).fill('Auburn');

// Step 1: Click on the Kendo dropdown to open the list
const stateDropdown = page.locator('span[aria-labelledby="MainAddress_State_label"]');
await stateDropdown.waitFor({ state: 'visible', timeout: 10000 });
await stateDropdown.click();
await page.waitForTimeout(1000);

// Step 2: Wait for the dropdown list to appear and select "AL"
const stateOption = page.locator('ul[aria-hidden="false"] li', { hasText: 'AL' });
await stateOption.waitFor({ state: 'visible', timeout: 5000 });
await stateOption.click();

console.log('✅ Successfully selected "AL" from State dropdown');
await page.waitForTimeout(1000);
await page.getByRole('textbox', { name: 'Zip' }).type('32002', { delay: 100 });
await page.waitForTimeout(1000);

// Step 1: Click on the County dropdown to open it
const countyDropdown = page.locator('span[aria-labelledby="MainAddress_CountyNameID_label"]');
await countyDropdown.waitFor({ state: 'visible', timeout: 10000 });
await countyDropdown.click();
await page.waitForTimeout(1000);

// Step 2: Wait for the dropdown list to appear and select "Perry"
const countyOption = page.locator('ul[aria-hidden="false"] li', { hasText: 'Perry' });
await countyOption.waitFor({ state: 'visible', timeout: 10000 });
await countyOption.click();

console.log('✅ Successfully selected "Perry" from County dropdown');


await page.getByRole('combobox', { name: 'Primary Phone Number Type' }).isVisible();
await page.getByRole('combobox', { name: 'Primary Phone Number Type' }).click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Cell Phone' }).click();
await page.getByRole('textbox', { name: 'Primary Phone Number' }).type('8523696336', { delay: 100 });
await page.waitForTimeout(1000);

await page.locator('#Staff_Email').fill('Lara.jane@example.com');
await page.waitForTimeout(1000);

await page.getByRole('combobox', { name: 'Date of Birth' }).isVisible();
await page.getByRole('combobox', { name: 'Date of Birth' }).click();
await page.getByRole('combobox', { name: 'Date of Birth' }).type('01/25/1995', { delay: 100 });

await page.waitForTimeout(1000);

await page.getByRole('combobox', { name: 'Gender' }).click();
await page.waitForTimeout(1000);
await page.getByRole('option', { name: 'Female' }).click();
await page.waitForTimeout(1000);



await page.locator('input[type="checkbox"][name="NoSSN"]').isVisible();
await page.locator('input[type="checkbox"][name="NoSSN"]').check();

await page.waitForTimeout(1000);

// ✅ Step 1: Click the visible Kendo dropdown (not the hidden input)
const staffTypeDropdown = page.locator('span[aria-labelledby="StaffCharacteristic_StaffTypeID_label"]');
await staffTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
await staffTypeDropdown.click();
await page.waitForTimeout(1000);

// ✅ Step 2: Wait for dropdown options and select "Assistant Teacher"
const option = page.locator('ul[aria-hidden="false"] li', { hasText: 'Aids' });
await option.waitFor({ state: 'visible', timeout: 5000 });
await option.click();

console.log('✅ Successfully selected "Assistant Teacher" from Staff Type dropdown');

await page.getByRole('spinbutton', { name: 'Yrs. of Teaching Exp' }).isVisible();
await page.getByRole('spinbutton', { name: 'Yrs. of Teaching Exp' }).click();
await page.getByRole('spinbutton', { name: 'Yrs. of Teaching Exp' }).fill('4');  


await page.getByRole('combobox', { name: 'Date Hired' }).isVisible();
await page.getByRole('combobox', { name: 'Date Hired' }).click();
await page.getByRole('combobox', { name: 'Date Hired' }).type('01/25/2025', { delay: 100 });

// Open dropdown safely
await page.locator('[aria-controls="StaffCharacteristicCareLevelIDs_listbox"]').click();

// Wait for dropdown animation/rendering to complete
const visibleListbox = page.locator('#StaffCharacteristicCareLevelIDs_listbox[aria-hidden="false"]');
await expect(visibleListbox).toBeVisible({ timeout: 5000 });

// Wait until options are rendered
const preschoolOption = visibleListbox.locator('li', { hasText: 'School-Age (60 - 96 Months)' });
await preschoolOption.waitFor({ state: 'visible', timeout: 5000 });

// Ensure element is stable before click (avoid "intercepts pointer" issue)
await page.waitForTimeout(300); // let Kendo animation finish

// Click safely
await preschoolOption.scrollIntoViewIfNeeded();
await preschoolOption.click({ timeout: 5000 });

console.log('✅ Selected "PreSchool (60 - 96 Months)" successfully!');



const yesRadio = page.locator('input[type="radio"][id="accessapplication_yes"]');
await yesRadio.waitFor({ state: 'visible' });
await yesRadio.check();
console.log('✅ Clicked "Yes" radio button successfully!');

// Open dropdown safely
await page.locator('[aria-controls="RoleID_listbox"]').click();

// Wait for the specific listbox to become visible
const listbox = page.locator('#RoleID_listbox');
await expect(listbox).toBeVisible({ timeout: 10000 });

// Ensure it's the active (visible) one, not a cached hidden copy
await page.waitForSelector('#RoleID_listbox[aria-hidden="false"]', { timeout: 5000 });

// Click the first visible option
const firstOption = page.locator('#RoleID_listbox[aria-hidden="false"] li').first();
await firstOption.click();

console.log('Successfully selected the first Role option');

await page.getByRole('button', { name: 'Save' }).click();
console.log('Staff details saved successfully!');   

await page.locator('input#staffComplete').isVisible
await page.locator('input#staffComplete').check();
console.log('Staff have been added successfully!');

await page.waitForTimeout(2000);

});

test ('Update Capacity', async () => {

const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
await page.locator('a[href="/Facility/Facility"]').first().click();

// Locate the first link in the first data row of the Facility table
const firstFacilityLink = page.locator('table tbody tr:first-child td a');

// Wait until it’s visible and clickable
await firstFacilityLink.waitFor({ state: 'visible' });
await expect(firstFacilityLink).toBeEnabled();

// Click on the first Facility ID link
await firstFacilityLink.click();

const CapacityLink = page.locator('a[href*="/Facility/"][href*="/Capacity"]');

await CapacityLink.waitFor({ state: 'visible' });
await CapacityLink.click();
console.log('Clicked Capacity link successfully!');

await page.waitForLoadState('networkidle');

await page.waitForLoadState('networkidle');
const plannedEnrollmentWrapper = page
  .locator('#AgeBandChildrenDay_0__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper.click();
await page.keyboard.type('5', { delay: 100 });


const plannedEnrollmentWrapper1 = page
  .locator('#AgeBandChildrenDay_1__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper1.click();
await page.keyboard.type('5', { delay: 100 });

const plannedEnrollmentWrapper2 = page
  .locator('#AgeBandChildrenDay_2__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper2.click();
await page.keyboard.type('5', { delay: 100 });

const plannedEnrollmentWrapper3 = page
  .locator('#AgeBandChildrenDay_3__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper3.click();
await page.keyboard.type('6', { delay: 100 });

const plannedEnrollmentWrapper4 = page
  .locator('#AgeBandChildrenDay_4__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper4.click();
await page.keyboard.type('7', { delay: 100 });

const plannedEnrollmentWrapper5 = page
  .locator('#AgeBandChildrenDay_5__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper5.click();
await page.keyboard.type('9', { delay: 100 });

const plannedEnrollmentWrapper6 = page
  .locator('#AgeBandChildrenDay_6__PlannedEnrollment')
  .locator('..');

await plannedEnrollmentWrapper6.click();
await page.keyboard.type('10' , { delay: 100 });

const plannedNumberofStaff = page
  .locator('#AgeBandChildrenDay_0__PlannedStaff')
  .locator('..');

await plannedNumberofStaff.click();
await page.keyboard.type('1' , { delay: 100 });


const plannedNumberofStaff1 = page
  .locator('#AgeBandChildrenDay_1__PlannedStaff')
  .locator('..');
await plannedNumberofStaff1.click();
await page.keyboard.type('1' , { delay: 100 });  

const plannedNumberofStaff2 = page
  .locator('#AgeBandChildrenDay_2__PlannedStaff')
  .locator('..');
await plannedNumberofStaff2.click();
await page.keyboard.type('1' , { delay: 100 });

const plannedNumberofStaff3 = page
  .locator('#AgeBandChildrenDay_3__PlannedStaff')
  .locator('..');
await plannedNumberofStaff3.click();
await page.keyboard.type('1' , { delay: 100 });

const plannedNumberofStaff4 = page
  .locator('#AgeBandChildrenDay_4__PlannedStaff')
  .locator('..');
await plannedNumberofStaff4.click();
await page.keyboard.type('1' , { delay: 100 });          

const plannedNumberofStaff5 = page
  .locator('#AgeBandChildrenDay_5__PlannedStaff')
  .locator('..');
await plannedNumberofStaff5.click();
await page.keyboard.type('1' , { delay: 100 });

const plannedNumberofStaff6 = page
  .locator('#AgeBandChildrenDay_6__PlannedStaff')
  .locator('..');
await plannedNumberofStaff6.click();
await page.keyboard.type('1' , { delay: 100 });

//await page.pause();

await page.getByRole('spinbutton', { name: 'Number of Changing Tables ' }).isVisible();
await page.getByRole('spinbutton', { name: 'Number of Changing Tables ' }).click();
await page.getByRole('spinbutton', { name: 'Number of Changing Tables ' }).fill('25');

await page.getByRole('spinbutton', { name: 'Number of Sinks' }).isVisible();
await page.getByRole('spinbutton', { name: 'Number of Sinks' }).click();
await page.getByRole('spinbutton', { name: 'Number of Sinks' }).fill('45');

await page.getByRole('spinbutton', { name: 'Number of Toilets' }).isVisible();
await page.getByRole('spinbutton', { name: 'Number of Toilets' }).click();
await page.getByRole('spinbutton', { name: 'Number of Toilets' }).fill('74');

await page.getByRole('spinbutton', { name: 'Playground 1 Square Footage' }).isVisible();
await page.getByRole('spinbutton', { name: 'Playground 1 Square Footage' }).click();
await page.getByRole('spinbutton', { name: 'Playground 1 Square Footage' }).fill('96');

await page.getByRole('spinbutton', { name: 'Playground 2 Square Footage' }).isVisible();
await page.getByRole('spinbutton', { name: 'Playground 2 Square Footage' }).click();
await page.getByRole('spinbutton', { name: 'Playground 2 Square Footage' }).fill('42');

await page.getByRole('spinbutton', { name: 'Total Facility Square Footage' }).isVisible();
await page.getByRole('spinbutton', { name: 'Total Facility Square Footage' }).click();
await page.getByRole('spinbutton', { name: 'Total Facility Square Footage' }).fill('65');

await page.getByRole('spinbutton', { name: 'Number of Cribs' }).isVisible();
await page.getByRole('spinbutton', { name: 'Number of Cribs' }).click();
await page.getByRole('spinbutton', { name: 'Number of Cribs' }).fill('50');

await page.getByRole('spinbutton', { name: 'Number of Cots' }).isVisible();
await page.getByRole('spinbutton', { name: 'Number of Cots' }).click();
await page.getByRole('spinbutton', { name: 'Number of Cots' }).fill('75');

const dropdown = page.getByRole('combobox', { name: 'Adult Bathrooms' });
await dropdown.click();
await page.waitForTimeout(1000);

await page.getByRole('option', { name: 'Yes' }).click();


// Wait for the "Yes" radio button to be visible and check it
const yesRadio = page.locator('input[name="IsThePlaygroundFencedInWith4ftfencing"][value="True"]');
await yesRadio.waitFor({ state: 'visible' });
await yesRadio.check();
await expect(yesRadio).toBeChecked();

console.log('✅ Selected "Yes" option successfully!');
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Save' }).click();
console.log('Capacity details saved successfully!');  
await page.waitForTimeout(2000);

await page.locator('input#capacityComplete').isVisible
await page.locator('input#capacityComplete').check();
console.log('Capacity section marked as complete successfully!');

});


test ('Update Background Checks', async () => {

const page = await webContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
await page.locator('a[href="/Facility/Facility"]').first().click();

// Locate the first link in the first data row of the Facility table
const firstFacilityLink = page.locator('table tbody tr:first-child td a');

// Wait until it’s visible and clickable
await firstFacilityLink.waitFor({ state: 'visible' });
await expect(firstFacilityLink).toBeEnabled();

// Click on the first Facility ID link
await firstFacilityLink.click();

const CapacityLink = page.locator('a[href*="/Facility/"][href*="/BackgroundCheck"]');

await CapacityLink.waitFor({ state: 'visible' });
await CapacityLink.click();
console.log('Clicked Background Checks link successfully!');

await page.waitForLoadState('networkidle');

// Helper to process a single table
  const processTable = async (tableSelector: string) => {
    await page.waitForSelector(tableSelector);

    const rows = page.locator(`${tableSelector} tbody tr`);
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);

      const bcIdLink = row.locator('td:first-child a');

      const cbcDocLink = row.locator('td:has-text("CBC_Doc") a');
      const canDocLink = row.locator('td:has-text("CBN_Doc") a');

      const hasCBC = (await cbcDocLink.count()) > 0;
      const hasCAN = (await canDocLink.count()) > 0;

      // ✅ Only process rows with BOTH docs missing
      if (hasCBC || hasCAN) {
        console.log('⏭ Skipping – documents already present');
        continue;
      }

      const bcId = (await bcIdLink.textContent())?.trim();
      console.log(`🟢 Processing Background Check ID: ${bcId}`);

      // Open BC details
      await bcIdLink.click();

      await page.waitForSelector('text=Background Check', {
        timeout: 10000
      });

      const addCbcBtn = page.getByRole('link', {
        name: 'Add Criminal Background Check'
      });

      if (!(await addCbcBtn.isVisible().catch(() => false))) {
        console.log(`⚠ Add CBC not available for ${bcId}`);
        await page.goBack({ waitUntil: 'networkidle' });
        continue;
      }

      // ---- Add CBC ----
      await addCbcBtn.click();
      await page.waitForSelector('#Documents', { timeout: 10000 });

      await page.locator('#IssuedDate').type('01/01/2025' , { delay: 100 });
      await page.locator('#ReceivedDate').type ('02/01/2025', { delay: 100 });

      const cbcPath = path.resolve(__dirname, '../CBC_Doc_Test.docx');
      await page.setInputFiles('#Documents', cbcPath);

      await page.getByRole('button', { name: 'Save' }).click();

      // Back to details
      await page.getByRole('link', {
        name: 'Back to Background Check Details'
      }).click();

      // ---- Upload CA/N ----
      await page.getByRole('link', {
        name: 'Upload CA/N Authorization Document'
      }).click();

      const canPath = path.resolve(__dirname, '../CBN_Doc_Test.docx');
      await page.setInputFiles('#Documents', canPath);

      await page.getByRole('button', { name: 'Save' }).click();

      // Back + submit
      await page.getByRole('link', {
        name: 'Back to Background Check Details'
      }).click();

      await page.getByRole('button', { name: 'Submit' }).click();

      const backgroundChecksLink = page.locator('a[href*="/Facility/"][href*="/BackgroundCheck"]');

await expect(backgroundChecksLink).toBeVisible({ timeout: 10000 });
await backgroundChecksLink.click();

// Wait for grid to reload
await expect(page.locator(tableSelector)).toBeVisible({ timeout: 10000 })

      console.log(`✅ Completed Background Check for ${bcId}`);
    }
  };

  // ---- Process both tables ----
  console.log('🔵 Processing Current Staff');
  await processTable('#gridBackgroundCheck');

  console.log('🔵 Processing Household Members');
  await processTable('#gridBackgroundCheckforHouseholdMembers');

  console.log('🎉 All eligible Background Checks processed');


});


