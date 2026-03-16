import { Page, Locator, expect } from '@playwright/test';

export class FacilityOperationInformationPage {
  readonly page: Page;

  // Navigation
  readonly applicationsButton: Locator;
  readonly actionNeededLink: Locator;
  readonly firstApplicationLink: Locator;
  readonly facilityOperationInfoLink: Locator;

  // Service Schedule and Hours of Operation
  readonly serviceScheduleDropdown: Locator;
  readonly serviceScheduleOptions: Locator;
  readonly openingTimeInput: Locator;
  readonly closingTimeInput: Locator;

  // Day Time, Age Range, and Numeric Inputs
  readonly dayTimeCheckbox: Locator;
  readonly dayStartInput: Locator;
  readonly dayEndInput: Locator;

  readonly startRangeDropdown: Locator;
  readonly startRangeListbox: Locator;
  readonly startRangeOptionYears: Locator;

  readonly endRangeDropdown: Locator;
  readonly endRangeListbox: Locator;
  readonly endRangeOptionYears: Locator;

  // Days of Week
  readonly mondayCheckbox: Locator;
  readonly tuesdayCheckbox: Locator;
  readonly wednesdayCheckbox: Locator;
  readonly thursdayCheckbox: Locator;
  readonly fridayCheckbox: Locator;

  readonly mondayOpenTime: Locator;
  readonly mondayCloseTime: Locator;
  readonly tuesdayOpenTime: Locator;
  readonly tuesdayCloseTime: Locator;
  readonly wednesdayOpenTime: Locator;
  readonly wednesdayCloseTime: Locator;
  readonly thursdayOpenTime: Locator;
  readonly thursdayCloseTime: Locator;
  readonly fridayOpenTime: Locator;
  readonly fridayCloseTime: Locator;

  // Multi-select Age Group
  readonly multiSelectInput: Locator;
  readonly multiSelectListBox: Locator;
  readonly multiSelectTags: (value: string) => Locator;

  // Closure Section
  readonly addClosureButton: Locator;
  readonly closureReasonInput: Locator;
  readonly closureStartDateInput: Locator;
  readonly closureEndDateInput: Locator;
  readonly calendarPopup: Locator;
  readonly nextButton: Locator;
  readonly calendarTitle: Locator;
  readonly updateButton: Locator;
  readonly saveButton: Locator;
  readonly overlay: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.applicationsButton = page.getByRole('button', { name: 'Applications' });
    this.actionNeededLink = page.getByRole('link', { name: 'Action Needed' });
    this.firstApplicationLink = page.locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]').first();
    this.facilityOperationInfoLink = page.getByRole('link', { name: 'Facility Operation Information' });

    // Service Schedule + Hours
    this.serviceScheduleDropdown = page.locator('span.k-input-value-text').first();
    this.serviceScheduleOptions = page.locator('ul[aria-hidden="false"] li');
    this.openingTimeInput = page.locator('input#HoursOfOperation_OpenTime');
    this.closingTimeInput = page.locator('input#HoursOfOperation_CloseTime');

    // Day Time and Age Range
    this.dayTimeCheckbox = page.getByLabel('Day Time');
    this.dayStartInput = page.locator('span.k-numerictextbox input.k-input-inner[role="spinbutton"]:visible').nth(1);
    this.dayEndInput = page.locator('span.k-numerictextbox input.k-input-inner[role="spinbutton"]:visible').nth(3);

    // Dropdowns for Range Type
    this.startRangeDropdown = page.locator('span.k-picker[aria-controls="HoursOfOperation_FacilityOperationInformation_CareAgeDayStartRangeTypeID_listbox"]');
    this.startRangeListbox = page.locator('#HoursOfOperation_FacilityOperationInformation_CareAgeDayStartRangeTypeID_listbox');
    this.startRangeOptionYears = this.startRangeListbox.locator('li', { hasText: 'Years' });

    this.endRangeDropdown = page.locator('span.k-picker[aria-controls="HoursOfOperation_FacilityOperationInformation_CareAgeDayEndRangeTypeID_listbox"]');
    this.endRangeListbox = page.locator('#HoursOfOperation_FacilityOperationInformation_CareAgeDayEndRangeTypeID_listbox');
    this.endRangeOptionYears = this.endRangeListbox.locator('li', { hasText: 'Years' });

    // Days of the week
    this.mondayCheckbox = page.getByLabel('Monday');
    this.tuesdayCheckbox = page.getByLabel('Tuesday');
    this.wednesdayCheckbox = page.getByLabel('Wednesday');
    this.thursdayCheckbox = page.getByLabel('Thursday');
    this.fridayCheckbox = page.getByLabel('Friday');

    this.mondayOpenTime = page.locator('input#HoursOfOperation_DayOpenTimeMonday');
    this.mondayCloseTime = page.locator('input#HoursOfOperation_DayCloseTimeMonday');
    this.tuesdayOpenTime = page.locator('input#HoursOfOperation_DayOpenTimeTuesday');
    this.tuesdayCloseTime = page.locator('input#HoursOfOperation_DayCloseTimeTuesday');
    this.wednesdayOpenTime = page.locator('input#HoursOfOperation_DayOpenTimeWednesday');
    this.wednesdayCloseTime = page.locator('input#HoursOfOperation_DayCloseTimeWednesday');
    this.thursdayOpenTime = page.locator('input#HoursOfOperation_DayOpenTimeThursday');
    this.thursdayCloseTime = page.locator('input#HoursOfOperation_DayCloseTimeThursday');
    this.fridayOpenTime = page.locator('input#HoursOfOperation_DayOpenTimeFriday');
    this.fridayCloseTime = page.locator('input#HoursOfOperation_DayCloseTimeFriday');

    // Multi-select Age Group
    this.multiSelectInput = page.locator('input[aria-controls="FacilityOperationAgeGroupTypeIds_listbox"]');
    this.multiSelectListBox = page.locator('#FacilityOperationAgeGroupTypeIds_listbox');
    this.multiSelectTags = (value: string) => page.locator(`#FacilityOperationAgeGroupTypeIds_taglist >> text=${value}`);

    // Closure Section
    this.addClosureButton = page.getByRole('button', { name: 'Add Closure' });
    this.closureReasonInput = page.locator('input#ClosureReason');
    this.closureStartDateInput = page.locator('input#ClosureStartDate');
    this.closureEndDateInput = page.locator('input#ClosureEndDate');
    this.calendarPopup = page.locator('.k-animation-container[aria-hidden="false"]');
    this.nextButton = this.calendarPopup.locator('a.k-button[aria-label="Next"]');
    this.calendarTitle = this.calendarPopup.locator('.k-calendar-header .k-calendar-title');
    this.updateButton = page.locator('button.k-grid-update');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.overlay = page.locator('.k-overlay');
  }

  async waitForOverlayToDisappear(timeout = 10000): Promise<void> {
    if (await this.overlay.isVisible()) {
      await this.overlay.waitFor({ state: 'hidden', timeout });
    }
  }

  async navigateToFacilityOperationInformation(): Promise<void> {
    await this.applicationsButton.click();
    await this.actionNeededLink.click();
    const appId = await this.firstApplicationLink.innerText();
    console.log(`Clicked first Application ID: ${appId}`);
    await this.firstApplicationLink.click();
    await this.facilityOperationInfoLink.click();
  }

  async selectServiceSchedule(): Promise<void> {
    await this.serviceScheduleDropdown.click();
    await this.serviceScheduleOptions.first().waitFor();
    await this.serviceScheduleOptions.first().click();
  }

  async fillOperatingHours(openTime: string, closeTime: string): Promise<void> {
    await this.openingTimeInput.fill(openTime);
    await this.openingTimeInput.press('Enter');
    await this.closingTimeInput.fill(closeTime);
    await this.closingTimeInput.press('Enter');
  }

  async fillClosure(startDate: string, closureReason: string): Promise<void> {
    await this.addClosureButton.click();
    await this.closureReasonInput.fill(closureReason);

    // Open calendar and navigate
    await this.closureStartDateInput.click();
    await expect(this.calendarPopup).toBeVisible({ timeout: 5000 });

    for (let i = 0; i < 24; i++) {
      const title = await this.calendarTitle.innerText();
      if (title.includes('December 2026')) break;
      await this.nextButton.click();
      await this.page.waitForTimeout(200);
    }

    const dateLocator = this.calendarPopup.locator('a.k-link[data-value="2026/11/25"]');
    await dateLocator.click();

    await this.page.waitForLoadState('networkidle');
    await expect(this.updateButton).toBeVisible({ timeout: 5000 });
    await this.updateButton.click();
    await this.saveButton.click();
  }
}
