export class TicketPage{
    choseTcText = 'Choose a Ticket';
    ticketBoxItem = '.ticket-box';
    testTicketLabel = 'Test Ticket';
    virtualTicketLabel = 'Virtual Test Ticket'
    firstNameTc = '[name="firstname"]';
    lastNameTc = '[name="lastname"]';
    emailTc = '[name="email"]';
    phoneTc = '[name="phone"]';
    AddTcBtn = 'Add Ticket';
    amountSelection = '.selector-button';
    otherAmount ='[name="other_amount_input"]';
    amoutAfterFee = '[for="middle-label"]';
    textDonation = 'Donation of $';
    textTotal = 'Total: $';
    ticketAddedText = ' Ticket added to your basket';
    addAnotherTicketbtn = 'Add another Ticket';
    thanksAddedTcText = 'Thanks for adding a ticket. Please be sure to complete your registration by clicking the Next Button below.';
    nextBtn = 'Next';
    PreviousBtn = 'Previous';

    verifyIsScreenSelectTickets(){
        cy.get('span').contains(this.choseTcText).should('be.visible');
    }
    selectTestTicket(item:number){
        cy.get(this.ticketBoxItem).eq(item).contains('SELECT').click();
    }

    verifyFormInforTc(item:number){
        cy.get(this.ticketBoxItem).eq(item).find(this.firstNameTc).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).find(this.lastNameTc).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).find(this.emailTc).should('be.visible');
        expect(cy.get(this.ticketBoxItem).eq(item).find(this.phoneTc)).to.exist;
    }

    selectTestTicket2(){
        cy.get(this.ticketBoxItem).eq(1).contains(this.virtualTicketLabel).click();
    }

    inputFormInforTc(item : number, fname : string, lname : string, email : string, phone : string){
        cy.get(this.ticketBoxItem).eq(item).find(this.firstNameTc).type(fname);
        cy.get(this.lastNameTc).type(lname);
        cy.get(this.emailTc).type(email);
        cy.get(this.phoneTc).type(phone);
    }

    clickAddTicket(item:number){
        cy.get(this.ticketBoxItem).eq(item).contains(this.AddTcBtn).click();
    }


    verifyTicketIsAdded(item:number, email : string){
        cy.get(this.ticketBoxItem).eq(item).contains(this.ticketAddedText).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).contains(this.addAnotherTicketbtn).should('be.visible');
        let summaryTextTc = '';
        if(item == 0){
            summaryTextTc += 'Ticket #1 $33 - ' +email;
            cy.get('li').contains(summaryTextTc).should('be.visible');
        } 
        if (item == 1) {
            summaryTextTc += 'Ticket #2 $51 - ' +email;
            cy.get('li').contains(summaryTextTc).should('be.visible');
        }
        
    }
 
    selectAmountItem(amount : string){
        cy.get(this.amountSelection).contains(amount).click();
    }
    inputOtherAmount(amount : string){
        cy.get(this.otherAmount).type(amount);   
    }

    verifySummaryAmount(numTicket1:number, numTicket2:number, amount:number){
        let sumAmount = amount + numTicket1 * 33 + numTicket2 * 51;
        cy.get('li').contains(this.textDonation+ ''+amount).should('be.visible');
        cy.get('span').contains(this.textTotal+ ''+sumAmount).should('be.visible');
    }

    clickButtonNext(){
        cy.get('.button').contains(this.nextBtn).click();
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

}