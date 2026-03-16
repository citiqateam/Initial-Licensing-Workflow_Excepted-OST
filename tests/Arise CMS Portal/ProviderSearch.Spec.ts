import {test, expect} from '@playwright/test';

test.describe('Provider Search Tests', () => {
    test('Search for a provider by Provider Status', async ({context}) => {
        const page = await context.newPage();
        await page.goto('https://al-arise-qa-main.citigovcloud.com/Account/Login');
        await page.fill('#UserName', 'SystemAdmin');
        await page.fill('#Password', 'Pass@123');
        await page.click('#btn-login');
        console.log('Login Successful');
        await page.getByRole('link', { name: 'Provider' }).click();
        await page.getByRole('link', { name: 'Providers' }).click();
        await page.waitForTimeout(3000);

const providerStatusDropdown = page.locator('#ProviderStatusId')
  .locator('xpath=ancestor::span[contains(@class,"k-dropdownlist")]');

const selectedValue = providerStatusDropdown.locator('.k-input-value-text');

// If already selected, do nothing
if ((await selectedValue.textContent())?.trim() !== 'Active') {
  await providerStatusDropdown.click();

  const listbox = page.locator('.k-list-container:visible');
  await listbox.locator('li[role="option"]', { hasText: 'Active' }).click();
}

// Assert selection
await expect(selectedValue).toHaveText('Active');
        await page.getByRole('button', { name: 'Search' }).click();

        // Verify that results are displayed
        const resultsGrid = page.locator('#ProvidersGrid');
        await expect(resultsGrid).toBeVisible();    
        const firstRow = resultsGrid.locator('tr.k-master-row').first();
        await expect(firstRow).toBeVisible();
        console.log('✅ Provider search by Status "Active" returned results successfully.');
    });
});
        