export class TicketDetailManagePage{
    fundraiserSelection = '#attendee_id';
    newFundraiserBtn = '#attendeeButton';
    productSelection = '#product_id';
    statusTicketCb = '#status';
    teamSelection = '#table_id';
    noteAreaText = '#notes';
    closeBtn = 'Close';
    saveBtn = '[value="save"]';
    saveSendBtn = '#save-send';
    fnameFundraiser = '#quick-fname';
    lnameFundraiser = '#quick-lname';
    companyFundraiser = '#quick-company';
    emailFundraiser = '#quick-attendee_email';
    LBFundraiserCb = '#show_on_leaderboard';
    numberFundraiser = '#quick-attendee_bidder';
    teamFundraiser = '#quick-team';
    saveFundraiserBtn = '[onclick="AttendeeManagement.quickAddAttendee()"]';
    OKBtn = 'OK';
    confirmButton = '.confirm';

    inputTicketForm(fundraiser:string, ticket:string,isEnable : boolean, team : string, note : string, fname : string, lname : string, company : string, email : string, isLB : boolean,number : string, group : string){
        if(fundraiser!= '')
            cy.get(this.fundraiserSelection).select(fundraiser,{force: true});
        else {
            this.clickNewFundraiserButton();
            this.inputNewFundraiser(fname, lname, company, email, isLB, number, group);
            this.clickSaveFundraiserButton();
            cy.wait(2000);
            this.clickOKButton();
        }
        cy.get(this.productSelection).select(ticket,{force: true});
        if(isEnable)
            cy.get(this.statusTicketCb).check();
        else cy.get(this.statusTicketCb).uncheck();
        if(isEnable == true)
            cy.get(this.teamSelection);
        cy.get(this.noteAreaText).clear();
        cy.get(this.noteAreaText).type(note);
        

    }

    inputNewFundraiser(fname : string, lname : string, company : string, email : string, isLB : boolean, number : string, group : string){
        cy.get(this.fnameFundraiser).clear();
        if(fname !='')
            cy.get(this.fnameFundraiser).type(fname);
        if(lname !='')
            cy.get(this.lnameFundraiser).type(lname);
        if(company !='')
            cy.get(this.companyFundraiser).type(company);
        if(email !='')
            cy.get(this.emailFundraiser).type(email);
        if(isLB == true)
            cy.get(this.LBFundraiserCb).check();
        else 
            cy.get(this.LBFundraiserCb).uncheck();
        if(number !='')
            cy.get(this.numberFundraiser).type(number);
        if(group !='')
            cy.get(this.teamFundraiser).select(group);
    }

    clickCloseButton(){
        cy.get(this.closeBtn).click({force: true});
    }

    clickSaveButton(){
        cy.get(this.saveBtn).click({force: true});
    }

    clickSaveAndSendToGuestButton(){
        cy.get(this.saveSendBtn).click({force: true});
    }

    clickNewFundraiserButton(){
        cy.get(this.newFundraiserBtn).click({force: true});
    }

    clickSaveFundraiserButton(){
        cy.get(this.saveFundraiserBtn).click({force: true});
    }

    clickOKButton(){
        cy.get('button').contains(this.OKBtn).click({force: true});
    }

    clickConfirmButton(){
        cy.get(this.confirmButton).click({force: true});
    }

}