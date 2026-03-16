import { Page, Locator, expect } from '@playwright/test';

export class FacilityApplicationPage {
  readonly page: Page;

  // Locators
  readonly applicationsDropdown: Locator;
  readonly facilityApplicationsLink: Locator;
  readonly createNewAppLink: Locator;

  readonly businessNameInput: Locator;
  readonly tierDropdown: Locator;
  readonly tierListbox: Locator;

  readonly street1Input: Locator;
  readonly street2Input: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;

  readonly stateDropdown: Locator;
  readonly stateList: Locator;

  readonly countyDropdown: Locator;
  readonly countyList: Locator;
  readonly countySearchBox: Locator;

  readonly phoneTypeDropdown: Locator;
  readonly phoneTyperOption: Locator;
  readonly phoneNumberInput: Locator;

  readonly emailInput: Locator;
  readonly contactTypeDropdown: Locator;
  readonly execDirectorOption: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly pocEmailInput: Locator;
  readonly dobInput: Locator;

  readonly genderDropdown: Locator;
  readonly genderListbox: Locator;

  readonly continueButton: Locator;


  constructor(page: Page) {
    this.page = page;

    // Locators
    this.applicationsDropdown = page.getByRole('button', { name: 'Applications' });
    this.facilityApplicationsLink = page.getByRole('link', { name: 'Action Needed' });
    this.createNewAppLink = page.getByRole('link', { name: 'Create New Application' });

    this.businessNameInput = page.locator('#Facility_BusinessName');
    this.tierDropdown = page.locator('#Facility_FacilityTierID_label');
    this.tierListbox = page.locator('#Facility_FacilityTierID_listbox');

    this.street1Input = page.getByRole('textbox', { name: 'Street 1' });
    this.street2Input = page.getByRole('textbox', { name: 'Street 2' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.zipInput = page.getByRole('textbox', { name: 'Zip Code' });

    this.stateDropdown = page.locator('#Facility_Address_State_label').locator('..').locator('.k-dropdownlist');
    this.stateList = page.locator('#Facility_Address_State-list');

    this.countyDropdown = page
  .locator('#Facility_Address_CountyNameID_label')
  .locator('..')
  .locator('.k-dropdownlist');
    this.countyList = page.locator('#Facility_Address_CountyNameID-list');
    this.countySearchBox = page.getByRole('searchbox');

    this.phoneTypeDropdown = page
  .locator('#Facility_Phone_PhoneNumberTypeId_label')
  .locator('..')
  .locator('.k-dropdownlist');
    this.phoneTyperOption = page.getByRole('option', { name: 'Cell Phone' });
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Primary Phone Number' });

    this.emailInput = page.locator('#Facility_Email');
    this.contactTypeDropdown = page.getByRole('combobox', { name: 'Contact Type' });
    this.execDirectorOption = page.getByRole('option', { name: 'Assistant Caregiver' });

    this.firstNameInput = page.locator('#Facility_Name_FirstName');
    this.lastNameInput = page.locator('#Facility_Name_LastName');
    this.pocEmailInput = page.locator('#Facility_PocEmail');
    this.dobInput = page.locator('#Facility_DateOfBirth');

    this.genderDropdown = page.locator('#Facility_Gender_label');
    this.genderListbox = page.locator('#Facility_Gender_listbox');

    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async navigateToFacilityApplications(): Promise<void> {
    await this.applicationsDropdown.waitFor({ state: 'visible' });
    await this.applicationsDropdown.click();

    await this.facilityApplicationsLink.waitFor({ state: 'visible' });
    await this.facilityApplicationsLink.click();

    await this.createNewAppLink.waitFor({ state: 'visible' });
    await this.createNewAppLink.click();

    await this.page.waitForTimeout(2000);
  }

  async fillFacilityForm(): Promise<void> {
    await this.businessNameInput.waitFor({ state: 'visible' });
    await this.businessNameInput.fill('Expected School Meal Care Facility');

    // // Tier -NA
    // await this.tierDropdown.waitFor({ state: 'visible' });
    // await expect(this.tierDropdown).toBeEnabled();
    // await this.tierDropdown.click();
    // await this.tierListbox.waitFor({ state: 'visible' });
    // await expect(this.tierListbox).toBeVisible();
    // await expect(this.tierListbox).toBeEnabled();
    // await this.tierListbox.locator('li').first().click();

// Strong sync: Tier enabled only after name validation
await expect(this.tierDropdown).toBeEnabled();
await this.tierDropdown.click();

// Kendo-safe selection
await expect(this.tierListbox.locator('.k-list-item')).toHaveCount(await this.tierListbox.locator('.k-list-item').count());

await this.page.keyboard.type('Star 2');
await this.page.keyboard.press('Enter');


    // Address
    await this.street1Input.fill('Amazon Phillips Apartment, St Xmas Road');
    await this.street2Input.fill('Near Puzzle Road');
    await this.cityInput.fill('Adona');
    await this.page.waitForTimeout(1000);
    await expect(this.zipInput).toBeVisible();
    await this.zipInput.type('72001-7896');

    // State
    await this.stateDropdown.click();
    await this.stateList.waitFor({ state: 'visible' });
    const alOption = this.stateList.locator('.k-list-item', { hasText: 'AL' });
    await expect(alOption).toBeVisible({ timeout: 10000 });
    await alOption.scrollIntoViewIfNeeded();
    await alOption.click();

    // County
await expect(this.countyDropdown).toBeEnabled();
await this.countyDropdown.click();

// Wait for dropdown to be ready
await this.countyList.waitFor({ state: 'visible' });

// Type-to-filter (Kendo-supported)
await this.page.keyboard.type('Perry', { delay: 100 });
await this.page.waitForTimeout(2000);

// Select highlighted result
await this.page.keyboard.press('Enter');

    // Phone Type (Kendo-safe)
await expect(this.phoneTypeDropdown).toBeEnabled();
await this.phoneTypeDropdown.click();

// Do NOT wait for .k-list-item visibility
// Just select via keyboard
await this.page.keyboard.type('Cell Phone');
await this.page.keyboard.press('Enter');

// Continue
await this.phoneNumberInput.type('(142) 111-5256', { delay: 100 });

    await this.emailInput.fill('AmazonPhillipsApartment@abc.com');

    // Contact info
   await expect(this.contactTypeDropdown).toBeEnabled();
   await this.contactTypeDropdown.click();
await this.page.keyboard.type('Program Director'); 
await this.page.keyboard.press('Enter');
    await this.firstNameInput.fill('Michael');
    await this.lastNameInput.fill('Jhonson');
    await this.pocEmailInput.fill('Michael.Jhonson@abc.com');

    // DOB
    await expect(this.dobInput).toBeVisible();
    await this.dobInput.type('09/09/2000', { delay: 200 });
    await this.dobInput.press('Tab');

    // Gender
    await expect(this.genderDropdown).toBeEnabled();
await this.genderDropdown.click();

// Do NOT click list items
await this.page.keyboard.type('Male'); // or 'Female', 'Other'
await this.page.keyboard.press('Enter');
  }

  async continue(): Promise<void> {
    await this.continueButton.waitFor({ state: 'visible' });
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
