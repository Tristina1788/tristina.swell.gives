
export class DonationsRegisterTablePage{
    emailAddress = 'h2';
    title = 'h1';
    customizeTableTitle = 'Customize Your Test Table';
    tabNavigation = 'ul[id="table-tabs"] li';
    tableNameTextBox = 'input[id="table_name"]';
    firstNameTextbox = 'input[id="user_name-firstName"]';
    lastNameTextbox = 'input[id="user_name-lastName"]';
    emailTextbox = 'input[id="user_email"]';
    guestFNInput = '[name="first_name[]"]';
    guestLNInput = '[name="last_name[]"]';
    guestEmailInput = '[name="email_address[]"]';
    inviteGuestBtn = '[data-action="invite"]';
    resendInviteBtn = '[data-action="send"]';
    cancelInviteBtn = '[data-action="cancel"]';
    
    verifyEmailAdressIsDisplayed(email: string){
        cy.get(this.emailAddress).should('be.visible');
        cy.get(this.emailAddress).should('include.text', email);
    }

    clickNavigationTab(tabName: string) {
        cy.get(this.tabNavigation).contains(tabName).click();
    }

    verifyUserInformationInYourTableIsDisplayed(firstName: string, lastName: string, email: string){
        let tableName = lastName + " Table";
        cy.get(this.tableNameTextBox).should('have.value', tableName);
        cy.get(this.firstNameTextbox).should('have.value', firstName);
        cy.get(this.lastNameTextbox).should('have.value', lastName);
        cy.get(this.emailTextbox).should('have.value', email);
    }

    verifyUserInformationInGuestTableIsDisplayed(firstName: string, lastName: string, email: string){
        cy.get('h2').contains(firstName).should('be.visible')
        .parent().next().get('h2').contains(lastName).should('be.visible')
        .parent().next().get('h2').contains(email).should('be.visible');
    }

    inputGuestInformation(firstName: string, lastName: string, email: string){
        cy.get(this.guestFNInput).type(firstName);
        cy.get(this.guestLNInput).type(lastName);
        cy.get(this.guestEmailInput).type(email);

    }

    clickInviteGuestButton(){
        cy.get(this.inviteGuestBtn).click();
    }

    verifyInviteSuccess(firstName: string, lastName: string, email: string){
        cy.get('h2').contains(firstName).should('be.visible')
        .parent().next().get('h2').contains(lastName).should('be.visible')
        .parent().next().get('h2').contains(email).should('be.visible');
        cy.get(this.resendInviteBtn).should('be.visible');
        cy.get(this.cancelInviteBtn).should('be.visible');
    }

    clickCancelInviteGuestButton(){
        cy.get(this.cancelInviteBtn).click();
    }

    verifyCancelInviteGuestSuccess(){
        cy.get(this.guestFNInput).should('be.visible');
        cy.get(this.guestLNInput).should('be.visible');
        cy.get(this.guestEmailInput).should('be.visible');

    }

}

