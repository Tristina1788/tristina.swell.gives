
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
    imgEvent = '.event-image';
    imglogo = '.logo';
    emailBtn = '.fa-envelope-o';
    

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).eq(1).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
    }

    verifyImageHeaderSetupCorrectInBranding(){
       
        cy.get(this.imgEvent).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageHeader);
            });
            
        });
    }
    
    verifyEmailAdressIsDisplayed(email: string){
        cy.get(this.emailAddress).should('be.visible');
        cy.get(this.emailAddress).should('include.text', email);
    }

    clickNavigationTab(tabName: string) {
        cy.get(this.tabNavigation).contains(tabName).click();
    }

    verifyUserInformationInYourTableIsDisplayed(firstName: string, lastName: string, email: string, projectId : string = '1643'){
        let tableName = lastName + " Table";
        if(projectId != '1643')
            tableName = lastName+' ';
        cy.get(this.tableNameTextBox).should('have.value', tableName);
        cy.get(this.firstNameTextbox).should('have.value', firstName);
        cy.get(this.lastNameTextbox).should('have.value', lastName);
        cy.get(this.emailTextbox).should('have.value', email);
    }

    verifyYourTableFromManagePageIsDisplayed(tableName:string, firstName: string, lastName: string, email: string){
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

    inputGuestInformation(firstName: string, lastName: string, email: string, guest : number = 0){
        cy.wait(1000);
        cy.get(this.guestFNInput).eq(guest).type(firstName);
        cy.get(this.guestLNInput).eq(guest).type(lastName);
        cy.get(this.guestEmailInput).eq(guest).type(email);

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

    clickCancelInviteGuestButton(guest: number = 0){
        cy.get(this.cancelInviteBtn).eq(guest).click({force: true});
    }

    verifyCancelInviteGuestSuccess(){
        cy.get(this.guestFNInput).should('be.visible');
        cy.get(this.guestLNInput).should('be.visible');
        cy.get(this.guestEmailInput).should('be.visible');

    }

    verifyNumberTicketsInTable(amountk : string){
        cy.wait(10000);
        cy.get('body').contains('can have '+amountk).should('be.visible');
    }

    sendEmailGuest(guest:number){
        cy.get(this.emailBtn).eq(guest).click();
    }

}

