export class RegisterCompsPage{
    registerTitle = 'Register';
    registerCompTitle = 'Confirm your Registration';
    firstNameRegisterInput = '[name="firstname"]';
    lastNameRegisterInput = '[name="lastname"]';
    phoneRegisterInput = '[name="phone"]';
    emailAddress = '[name="email"]';
    orderBtn = '.expanded';
    PreviousBtn = '.Previous';
    inforEvent = '.event-info';
    imgEvent = '.bg-stretch';
    imglogo = '.logo';
    teamSelect = 'select';
    addTKBtn = 'Add ticket';
    removeTKBtn = '.fa-remove';

   
    
    verifyRegisterPageForComp(){
        cy.get('h1').contains(this.registerCompTitle).should('be.visible');
    }

    inputRegisterForm(fname : string, lname :string, phone : string, email:string){
        cy.get(this.firstNameRegisterInput).type(fname);
        cy.get(this.lastNameRegisterInput).type(lname);
        cy.get(this.phoneRegisterInput).type(phone);
        cy.get(this.emailAddress).type(email);
    }

    clickOrderButton(){
        cy.get(this.orderBtn).click();
    }

    clickButtonAddAnotherTicket(){
        cy.get('button').contains(this.addTKBtn).should('be.visible');
    }

    verifyButtonAddTicketIsAvailable(){
        cy.get('button').contains(this.addTKBtn).should('be.visible');
    }

    verifyButtonAddTicketIsNotAvailable(){
        cy.get('button').contains(this.addTKBtn).should('be.not.visible');
    }

    clickButtonRemoveTicket(){
        cy.get(this.removeTKBtn).click();
    }

    verifyButtonRemoveTicketIsAvailable(){
        cy.get(this.removeTKBtn).should('be.visible');
    }

    verifyButtonRemoveTicketIsNotAvailable(){
        cy.get(this.removeTKBtn).should('be.not.visible');
    }

    clickAddTicket(){
        cy.get('button').contains(this.addTKBtn).click();
    }

    clickRemoveTicketButton(){
        cy.get(this.removeTKBtn).click();
    }

    verifyRegisterTicketIsPresent(ticketNumber : number, email : string){
        let ticket = 'Ticket #'+ticketNumber+' ' +email;
        cy.get('li').contains(ticket).should('be.visible');
    }

    verifyRegisterTicketIsNotPresent(ticketNumber : number, email : string){
        let ticket = 'Ticket #'+ticketNumber+' ' +email;
        cy.get('li').contains(ticket).should('be.not.visible');
    }

    verifyNewTeamDisplayInRegisterPage(newTeam: string) {
        cy.get(this.teamSelect).select(newTeam);
        cy.get(this.teamSelect).should('contain', newTeam);
    }

    verifyOrderIsCorrect(numberTicket : number){
        cy.get(this.orderBtn).contains('Order '+numberTicket+' Ticket').should('be.visible');
        cy.get('div').contains('There are '+(2 - numberTicket)+' tickets remaining on this ticket link');
    }

    verifyTeamIsNotExist(team: string) {
        cy.get('option').contains(team).should('be.not.exist');
    }
}