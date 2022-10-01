export class CompSetupPage{
    code = '[id="code"]';
    ticketSelection = '#product';
    remainingInput = '#remaining';
    noteTextarear = '#notes';
    fnameInput = '#fname';
    lnameInput = '#lname';
    emailInput = '#email';
    closebtn = '#close-assign-dialog';
    savebtn = '[name="save+only"]';
    saveASendbtn = '[name="save+send"]';
    okBtn = '.confirm';
    saveSuccessTxt = 'Comp created!';

    inputCompTicketsForm(code : string, ticketType : string, amount : number, internalNote :string, lname: string, fname : string, email : string){
        cy.wait(3000);
        cy.get(this.code).clear();
        cy.get(this.code).type(code);
        cy.wait(1000);
        cy.get(this.ticketSelection).select(ticketType);
        cy.get(this.remainingInput).clear();
        cy.get(this.remainingInput).type(amount+'');
        cy.get(this.noteTextarear).clear();
        cy.get(this.noteTextarear).type(internalNote);
        cy.get(this.lnameInput).clear();
        cy.get(this.lnameInput).type(lname);
        cy.get(this.fnameInput).clear();
        cy.get(this.fnameInput).type(fname);
        cy.get(this.emailInput).clear();
        cy.get(this.emailInput).type(email);

    }

    clickCloseButton (){
        cy.get(this.closebtn).click();
    }

    clickSaveOnlyButton (){
        cy.get(this.savebtn).click();
    }

    clickSaveAndSendEmailButton (){
        cy.get(this.saveASendbtn).click();
    }

    clickOkBtn(){
        cy.get(this.okBtn).click();
    }

    VerifyUpdateFormSuccess(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessTxt).should('be.visible');
    }

}