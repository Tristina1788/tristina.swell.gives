export class TableSettingPage {
    formInput = 'div[id="tabs-5"]>form';
    pageTitleInput = 'input[placeholder="Make Your Gift Today"]';
    tableTypeInput = 'input[placeholder="Table"]';
    tableSectionTextarea = 'textarea[name="sponsorshipLabel"]';
    enableDonation = 'input[name="tweet-donation"]';
    donationTitleInput = 'input[placeholder="Add a donation!"]';
    orderSummaryInput = 'input[placeholder="Order Summary"]';
    donationSummaryInput = 'input[placeholder="Donation of"]';
    saveButton = 'Save Changes';
    saveSuccessText = 'Saved successfully!';
    okBtn = 'button[class="confirm"]';

    inputGeneralTableSetting(pageTitle: string, tableType: string, tableSection: string, donationTitle: string, orderSummary: string, donationSummary: string, isDonation: boolean = true) {

        cy.get(this.formInput).within(() => {
            cy.get(this.pageTitleInput).clear();
            if (pageTitle != '') {
                cy.get(this.pageTitleInput).type(pageTitle);
            } 

            cy.get(this.tableTypeInput).clear();
            if (tableType != '') {
                cy.get(this.tableTypeInput).type(tableType);
            } 

            cy.get(this.tableSectionTextarea).clear();
            if (tableSection != '') {
                cy.get(this.tableSectionTextarea).type(tableSection);
            } 

            cy.get(this.orderSummaryInput).clear();
            if (orderSummary != '') {
                cy.get(this.orderSummaryInput).type(orderSummary);
            } 

            cy.get(this.donationSummaryInput).clear();
            if (donationSummary != '') {
                cy.get(this.donationSummaryInput).type(donationSummary);
            }

            if (isDonation) {
                cy.get(this.enableDonation).check({ force: true });
                cy.get(this.donationTitleInput).clear();
                if (donationTitle != '')
                    cy.get(this.donationTitleInput).type(donationTitle);
            } else {
                cy.get(this.enableDonation).uncheck({ force: true });
            }
        })
    }

    clickSaveButton() {
        cy.get(this.formInput).within(() => {
            cy.get('button').contains(this.saveButton).click({ force: true });
        })
    }

    verifySaveSuccessfully() {
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
        cy.get(this.okBtn).click();
    }
}