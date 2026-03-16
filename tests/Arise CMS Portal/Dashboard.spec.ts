import { test, expect, BrowserContext } from '@playwright/test';
import { LoginPage } from '../../Resources/Pages/AriseCMS/LoginPage';
import { DashboardPage } from '../../Resources/Pages/AriseCMS/DashboardPage';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
  console.log('Login and store state...');
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('SystemAdmin', 'Pass@123');
  console.log('Login Successful');

  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Verify Dashboard Title', async () => {
  const page = await webContext.newPage();
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await dashboard.verifyTitle('Arise CMSDashboard');
  console.log('Dashboard Page Title Verified');
});

test('Verify all cards on Dashboard', async () => {
  const page = await webContext.newPage();
  const dashboard = new DashboardPage(page);
  await dashboard.goto();

  const cardNames = await dashboard.getAllCards();
  console.log('Cards found:', cardNames);
  await expect(cardNames.length).toBeGreaterThan(0);
});

for (const cardName of [
  'My Cases',
  'View Tasks',
  'View Notices',
  'Recently Cleared',
  'Supervising Workloads',
  'Schedule',
  'Messages'
]) {
  test(`Verify the ${cardName} card`, async () => {
    const page = await webContext.newPage();
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await dashboard.clickCard(cardName);
    await dashboard.verifyCardHeader(cardName);
    console.log(`${cardName} Card Verified`);
  });
}
