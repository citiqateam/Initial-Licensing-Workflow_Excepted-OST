import { Page } from '@playwright/test';

export async function fillPlannedFields(page: Page, value = '10') {
  if (page.isClosed()) {
    console.warn('Page already closed before filling.');
    return;
  }

  // Locate only the relevant numeric inputs
  const plannedFields = page.locator(
    'input[name*="PlannedEnrollment"], input[name*="PlannedNoOfStaff"]'
  );

  const total = await plannedFields.count();
  console.log(`Found ${total} Planned fields to fill.`);

  for (let i = 0; i < total; i++) {
    const input = plannedFields.nth(i);

    try {
      const visible = await input.isVisible({ timeout: 2000 }).catch(() => false);
      const enabled = await input.isEnabled().catch(() => false);

      if (!visible || !enabled) {
        console.log(`Skipping field #${i + 1} (hidden/disabled).`);
        continue;
      }

      await input.scrollIntoViewIfNeeded();
      await input.click({ force: true });
      await input.fill('');
      await input.type(value);
      await input.press('Tab');
      console.log(`✅ Filled field #${i + 1} with ${value}`);
    } catch (err: any) {
      if (err.message?.includes('Target page, context or browser has been closed')) {
        console.warn('Page closed during filling — exiting.');
        return;
      }
      console.warn(`⚠️ Field #${i + 1} error: ${err.message}`);
    }
  }

  console.log('🎯 Finished filling all Planned fields.');
}
