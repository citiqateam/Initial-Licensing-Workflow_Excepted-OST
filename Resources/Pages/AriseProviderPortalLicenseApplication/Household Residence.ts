import {expect, Locator, Page} from '@playwright/test';

export class HouseholdResidencePage {
  readonly page: Page;
  
  readonly applicationsButton: Locator;
  readonly actionNeededLink: Locator
  readonly householdResidenceLink: Locator;
  readonly householdresidentButton: Locator;
  readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly relationshipDropdown: Locator;
    readonly relationshipOption: Locator;
    readonly saveButton: Locator;


    // Define locators and methods for Household Residence page here
    constructor(page: Page) {
        this.page = page;
        this.applicationsButton = page.getByRole('button', { name: 'Applications' });
        this.actionNeededLink = page.getByRole('link', { name: 'Action Needed' });
        this.householdResidenceLink = page.getByRole('link', { name: 'Household Residents' });
        this.householdresidentButton = page.getByRole('link', { name: 'Add Household Resident' });
        this.firstNameInput = page.locator('#Person_FirstName');
        this.lastNameInput = page.locator('#Person_LastName');
        this.dateOfBirthInput = page.locator('#DateOfBirth');
        this.relationshipDropdown = page.locator('span[aria-controls="RelationshipID_listbox"]');
        this.relationshipOption = page.locator('li[role="option"]', { hasText: 'Brother' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        




    }
    
    async navigateToFirstApplication() {
    await this.applicationsButton.click();
    await this.page.waitForTimeout(1000);
    await this.actionNeededLink.click();

    const firstAppLink = this.page.locator('a[href*="/FacilityApplication/"][href*="/FacilityInformation"]').first();
    const appId = await firstAppLink.innerText();
    await firstAppLink.click();
    console.log(`Opened Application ID: ${appId}`);
  }
    
    
    
    async navigateToHouseholdResidence() {
        await this.applicationsButton.click();
        await this.page.waitForTimeout(1000);
        //await this.actionNeededLink.click();
        await this.householdResidenceLink.click();
    } 

    async addHouseholdResident(firstName: string, lastName: string, dateOfBirth: string) {
        await this.householdresidentButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.dateOfBirthInput.fill(dateOfBirth);
        await this.relationshipDropdown.click();
        await this.relationshipOption.click();
        await this.saveButton.click();
    }

    

}