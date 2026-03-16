import {test, expect, BrowserContext} from '@playwright/test';
import { asyncWrapProviders } from 'async_hooks';
let webContext: BrowserContext;

test.beforeAll(async ({browser}) => {
  console.log('This runs before all tests');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await page.fill('#UserName', 'SystemAdmin');
  await page.fill('#Password', 'Pass@123');
  await page.click('#btn-login');
  console.log('Login Successful');
  await context.storageState({path: 'state.json'}); 
  webContext = await browser.newContext({storageState: 'state.json'}); 
});


test('Verify Dashboard Page', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await expect(page).toHaveTitle('Arise CMSDashboard');
  console.log('Dashboard Page Title Verified');
});


test('Verify all the cards availabile on the Dashboard', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');

  // Grab all card name spans inside clickable panels
  const cardSpans = page.locator('a.clickable-panel .panel-footer span');

  const cardCount = await cardSpans.count();
  console.log(`Total cards found: ${cardCount}`);

  const cardNames: string[] = [];
  for (let i = 0; i < cardCount; i++) {
    const text = await cardSpans.nth(i).innerText();
    cardNames.push(text.trim());
  }

  console.log('Card names:', cardNames);

  // Example assertion
  await expect(cardCount).toBeGreaterThan(0);

});

test('Verify My Cases Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await page.click('a:has-text("My Cases")');
    console.log('My Cases Page URL Verified');

});

test('Verify the Tasks Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  
  // Click on "View Tasks" card
  await page.click('a:has-text("View Tasks")');
  console.log('View Tasks Page URL Verified');
    await page.waitForTimeout(2000);

  // Scope only to the "Tasks" header inside the Tasks card
  const header = page.locator('a:has-text("View Tasks") >> div:text("Tasks")');
  // Get the text content
  const headerText = await header.innerText();
  console.log('Header Title:', headerText);
  // Assert it equals "Tasks"
  await expect(header).toHaveText('Tasks');

  await page.click('a:has-text("View Tasks")');
  await page.waitForLoadState('networkidle');   


}); 

test('Verify the Notices Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  
  // Click on "View Notices" card
  await page.click('a:has-text("View Notices")');
  console.log('View Notices Page URL Verified');
    await page.waitForTimeout(2000);

  // Scope only to the "Notices" header inside the Notices card
  const header = page.locator('a:has-text("View Notices") >> div:text("Notices")');
  // Get the text content
  const headerText = await header.innerText();
  console.log('Header Title:', headerText);
  // Assert it equals "Notices"
  await expect(header).toHaveText('Notices');

  await page.click('a:has-text("View Notices")');
  await page.waitForLoadState('networkidle');

}); 


test('Verify the Recently Cleared Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await page.click('a:has-text("Recently Cleared")');
  console.log('View Recently Cleared Page URL Verified');
  await page.waitForTimeout(2000);
  // Click on "Recently Cleared" card
  await page.click('a:has-text("Recently Cleared")');
  console.log('View Recently Cleared Page URL Verified');
  // Scope only to the "Recently Cleared" header inside the Recently Cleared card
  const header = page.locator('a:has-text("Recently Cleared") >> div:text("Recently Cleared")');
  // Get the text content
  const headerText = await header.innerText();
  console.log('Header Title:', headerText);
  // Assert it equals "Recently Cleared"
  await expect(header).toHaveText('Recently Cleared');

  await page.click('a:has-text("Recently Cleared")');
  await page.waitForLoadState('networkidle');

}); 

test('Verify the Supervising Workloads Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
  await page.click('a:has-text("Supervising Workloads")');
  await page.waitForTimeout(2000);
  console.log('View Supervising Workloads Page URL Verified');
  
  await page.click('a:has-text("Supervising Workloads")');
  await page.waitForLoadState('networkidle');

}); 

test('Verify the Schedule Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');

  // Click on "View Schedule" card
  await page.click('a:has-text("Schedule")');
  console.log('View Schedule Page URL Verified');
  await page.waitForTimeout(2000);
    
  // Scope only to the "Schedule" header inside the Schedule card
  const header = page.locator('a:has-text("Schedule") >> div:text("Schedule")');
  // Get the text content
  const headerText = await header.innerText();
  console.log('Header Title:', headerText);
  // Assert it equals "Schedule"
  await expect(header).toHaveText('Schedule');

  await page.click('a:has-text("Schedule")');
  await page.waitForLoadState('networkidle');

}); 

test('Verify the Messages Card', async () => {
  const page = await webContext.newPage();
  await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');

  // Click on "View Messages" card
  await page.click('a:has-text("Messages")');
  console.log('View Messages Page URL Verified');
  await page.waitForTimeout(2000);

  // Scope only to the "Messages" header inside the Messages card
  const header = page.locator('a:has-text("Messages") >> div:text("Messages")');
  // Get the text content
  const headerText = await header.innerText();
  console.log('Header Title:', headerText);
  // Assert it equals "Messages"
  await expect(header).toHaveText('Messages');
 
  await page.click('a:has-text("Messages")');
  await page.waitForLoadState('networkidle');

}); 