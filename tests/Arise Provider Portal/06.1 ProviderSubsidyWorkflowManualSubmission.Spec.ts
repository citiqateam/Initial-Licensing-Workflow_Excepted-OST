import { test, expect, BrowserContext } from '@playwright/test'; 
import path from 'path/win32';
import fs from 'fs';
const InputDetails = JSON.parse(JSON.stringify(require("../../Resources/TestData/InputDetails.json")));


let authContext: BrowserContext;

test.beforeAll(async ({browser}) => {
  console.log('This runs before all tests');
  let context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  await page.fill('#UserName', InputDetails.EmailID);
  await page.fill('#Password', InputDetails.Password);
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('Login Successful');
  await context.storageState({path: 'state2.json'});
  authContext = await browser.newContext({storageState: 'state2.json'});
});


test ('Verify if the Subsidy Application available on a Provider Portal', async ({context}) => {
  const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);  
  console.log('Navigated to Provider Home Page');
  
await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();
await page.waitForTimeout(2000);

// Grid rows
const gridRows = page.locator('#inpogressapplications tbody tr');

const count = await gridRows.count();
console.log(`Rows found: ${count}`);

if (count === 0) {
    const noRecordText = await page.locator('#inpogressapplications .k-pager-info').textContent();
    console.log("Grid message:", noRecordText?.trim());
} else {
    for (let i = 0; i < count; i++) {
        console.log("Row", i + 1, "=>", await gridRows.nth(i).textContent());
    }
}

});   


test ('Apply for Subsidy from Provider > Licence Status', async ({context}) => {
 const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');
  
await page.getByRole('button', { name: 'Provider', exact: true }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'License Status' }).click();
await page.waitForTimeout(2000);

const rows = page.locator('#facilityApplications tbody tr');
const rowCount = await rows.count();

for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const facilityId = (await row.locator('td').nth(0).innerText()).trim();
    const facilityName = (await row.locator('td').nth(1).innerText()).trim();

    console.log(`Row ${i + 1}: ${facilityId} | ${facilityName}`);
}

await rows.nth(0).getByRole('button', { name: 'Apply for Subsidy' }).click();
await page.waitForTimeout(2000);
 
// Wait for confirmation popup to appear
await page.waitForSelector('#actionText', { timeout: 5000 });

// Extract and print the message
const confirmationMessage = await page.locator('#actionText').textContent();
console.log("Confirmation Message:", confirmationMessage?.trim());

await page.getByRole('button', { name: 'OK' }).click();

});


test ('Update Facility Subsidy Rates', async ({context}) => {
  const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');

await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();

await page.waitForLoadState('networkidle'); 
// Click on the first application in the grid

// Find dynamic grid by table ID prefix
// Get all rows inside the main grid
const rows = page.locator('#inpogressapplications tbody tr');
const rowCount = await rows.count();

console.log("Total rows:", rowCount);

for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const status = (await row.locator('td').nth(5).innerText()).trim();
    const appId = (await row.locator('td').nth(0).innerText()).trim();

    console.log(`Row ${i + 1}: ${appId} | Status: ${status}`);

    if (status === "In Progress") {
        console.log("Clicking Application:", appId);

        await row.locator('td').nth(0).locator('a').click();
        break; // stop after clicking
    }
}


await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Submit Facility Subsidy Rates' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('link', { name: 'Create New Rate Set' }).click();
await page.waitForLoadState('networkidle');

await page.locator('#EffectiveDate').click();
await page.locator('#EffectiveDate').type('10/10/2025', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(0).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(0).type('75', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(1).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(1).type('45', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(2).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(2).type('45', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(3).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(3).type('65', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(4).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(4).type('74', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(5).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(5).type('35', { delay: 100 });

await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(6).click();
await page.locator('input.k-input-inner[placeholder="Enter Rate"]').nth(6).type('100', { delay: 100 });
await page.waitForTimeout(2000);


await page.getByRole('button', { name: 'Save' }).click();
await page.waitForLoadState('networkidle');
await page.getByRole('button', { name: 'Submit' }).click();

await page.waitForTimeout(2000); 

});


test ('Update Supporting Documents', async ({context}) => {
  const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');

  await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();

await page.waitForLoadState('networkidle'); 
// Click on the first application in the grid

// Find dynamic grid by table ID prefix
// Get all rows inside the main grid
const rows = page.locator('#inpogressapplications tbody tr');
const rowCount = await rows.count();

console.log("Total rows:", rowCount);

for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const status = (await row.locator('td').nth(5).innerText()).trim();
    const appId = (await row.locator('td').nth(0).innerText()).trim();

    console.log(`Row ${i + 1}: ${appId} | Status: ${status}`);

    if (status === "In Progress") {
        console.log("Clicking Application:", appId);

        await row.locator('td').nth(0).locator('a').click();
        break; // stop after clicking
    }
}


await page.waitForLoadState('networkidle');
await page.getByRole('treeitem', { name: 'Supporting Documents' }).click();
await page.waitForLoadState('networkidle');

// Click the upload section based on text "W-9 Form"
await page.getByRole('button', { name: /W-9 Form/i }).click();

// Upload using the nearest file input
const fileInput = page.locator('input[type="file"]').first();
await fileInput.setInputFiles('W9 Form.docx');

await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'upload' }).click();
await page.waitForTimeout(2000);
console.log('W-9 Form uploaded successfully!'); 

// Click the upload section based on text "Policies and Procedures"
await page.getByRole('button', { name: /Policies and Procedures/i }).click();

// Upload using the nearest file input
const fileInput1 = page.locator('input[type="file"]').nth(1);
await fileInput1.setInputFiles('Policies and Procedures.docx');

await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'upload' }).click();
await page.waitForTimeout(2000);
console.log('Policies and Procedures uploaded successfully!'); 

await page.getByRole('link', { name: 'Continue' }).click();
await page.waitForTimeout(2000);

});

test ('Update Orientation', async ({context}) => {
  const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');

  await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();

await page.waitForLoadState('networkidle'); 
// Click on the first application in the grid

// Find dynamic grid by table ID prefix
// Get all rows inside the main grid
const rows = page.locator('#inpogressapplications tbody tr');
const rowCount = await rows.count();

console.log("Total rows:", rowCount);

for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const status = (await row.locator('td').nth(5).innerText()).trim();
    const appId = (await row.locator('td').nth(0).innerText()).trim();

    console.log(`Row ${i + 1}: ${appId} | Status: ${status}`);

    if (status === "In Progress") {
        console.log("Clicking Application:", appId);

        await row.locator('td').nth(0).locator('a').click();
        break; // stop after clicking
    }
}

await page.waitForLoadState('networkidle');

await page.getByRole('treeitem', { name: 'Orientation' })
  .getByRole('link')
  .click();

await page.getByRole('link', { name: 'Click here' }).isVisible();
await page.getByRole('link', { name: 'Click here' }).click();

await page.getByRole('link', { name: 'Take Orientation Quiz' }).isVisible();
await page.getByRole('link', { name: 'Take Orientation Quiz' }).click();

await page.waitForLoadState('networkidle');

await page.locator('#Questions_0__Options_3__IsSelected').check(); 
await page.locator('#Questions_1__Options_0__IsSelected').check(); 
await page.locator('#Questions_2__Options_2__IsSelected').check();
await page.locator('#Questions_3__Options_2__IsSelected').check();

await page.locator('#Questions_4__Options_0__IsSelected').check();
await page.locator('#Questions_5__Options_1__IsSelected').check(); 
await page.locator('#Questions_6__Options_0__IsSelected').check(); 
await page.locator('#Questions_7__Options_1__IsSelected').check(); 
await page.locator('#Questions_8__Options_3__IsSelected').check(); 

await page.locator('#Questions_9__Options_0__IsSelected').check();
await page.locator('#Questions_10__Options_1__IsSelected').check();

await page.locator('#Questions_11__Options_0__IsSelected').check();
await page.locator('#Questions_12__Options_0__IsSelected').check();
await page.locator('#Questions_13__Options_0__IsSelected').check();

await page.locator('#Questions_14__Options_3__IsSelected').check();
await page.locator('#Questions_15__Options_0__IsSelected').check();

await page.locator('#Questions_16__Options_0__IsSelected').check();
await page.locator('#Questions_17__Options_1__IsSelected').check();
await page.locator('#Questions_18__Options_1__IsSelected').check();
await page.locator('#Questions_19__Options_1__IsSelected').check();

await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Save' }).isVisible();
await page.getByRole('button', { name: 'Save' }).click();

});



test ('Final Submit of Subsidy Application', async ({context}) => {
  const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');

await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();

await page.waitForLoadState('networkidle'); 
// Click on the first application in the grid

// Find dynamic grid by table ID prefix
// Get all rows inside the main grid
const rows = page.locator('#inpogressapplications tbody tr');
const rowCount = await rows.count();

console.log("Total rows:", rowCount);

for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const status = (await row.locator('td').nth(5).innerText()).trim();
    const appId = (await row.locator('td').nth(0).innerText()).trim();

    console.log(`Row ${i + 1}: ${appId} | Status: ${status}`);

    if (status === "In Progress") {
        console.log("Clicking Application:", appId);

        await row.locator('td').nth(0).locator('a').click();
        break; // stop after clicking
    }
}

await page.waitForLoadState('networkidle');

// await page.locator('#RegistrationPolicylink').click();
// await page.waitForLoadState('networkidle'); 
await page.locator('#Signature_IsReadRegistrationPolicy').check(); 

await page.locator('#ReadChildLawlink').click();
await page.waitForLoadState('networkidle'); 
await page.locator('#Signature_IsReadChildLaw').check();
await page.waitForTimeout(1000);

await page.locator('#Signature_Certify').check();
await page.waitForTimeout(1000);



await page.locator('#Signature_Signature').fill('Martin Sam');
await page.waitForTimeout(1000);

await page.getByRole('button', { name: 'Submit' }).click();
await page.waitForLoadState('networkidle');

console.log('Subsidy Application Submitted Successfully!');

});


test ('Capture Subsidy ID from Provider Portal', async ({context}) => {
const page = await authContext.newPage();
  await page.goto(InputDetails.ProviderPortalURL);
  console.log('Navigated to Provider Home Page');

await page.getByRole('button', { name: 'Applications' }).click();
await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Subsidy Applications' }).click();

// Wait for Submitted Subsidy Applications grid
await expect(page.locator('#completedapplications')).toBeVisible();

// Locate rows
const rows = page.locator('#completedapplications table tbody tr');



// Capture Application ID from first row
const subsidyApplicationID = (
  await rows.first().locator('td').first().innerText()
).trim();

console.log('Subsidy Application ID:', subsidyApplicationID);

  // ✅ Read existing JSON
  const filePath = path.resolve(
    __dirname,
    '../../Resources/Test Data/InputDetails.json'
  );

  let data: any = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // ✅ Add new value (DO NOT overwrite others)
  data.subsidyApplicationId = subsidyApplicationID;

  // ✅ Write merged JSON back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


});

test .afterAll(async () => {
  console.log('This runs after all tests');
});