
export class DonationsRegisterTablePage{
    emailAddress = 'h2';
    title = 'h1';
    tabNavigation = 'ul[id="table-tabs"] li';
    tableNameTextBox = 'input[id="table_name"]';
    firstNameTextbox = 'input[id="user_name-firstName"]';
    lastNameTextbox = 'input[id="user_name-lastName"]';
    emailTextbox = 'input[id="user_email"]';
    
    verifyEmailAdressIsDisplayed(email: string){
        cy.get(this.emailAddress, { timeout: 50000 }).should('be.visible');
        cy.get(this.emailAddress).should('include.text', email);
    }

    clickNavigationTab(tabName: string) {
        cy.get(this.tabNavigation).contains(tabName).click();
    }

    verifyUserInformationIsDisplayed(firstName: string, lastName: string, email: string){
        let tableName = lastName + " Table";
        cy.get(this.tableNameTextBox).should('have.value', tableName);
        cy.get(this.firstNameTextbox).should('have.value', firstName);
        cy.get(this.lastNameTextbox).should('have.value', lastName);
        cy.get(this.emailTextbox).should('have.value', email);
    }
}

