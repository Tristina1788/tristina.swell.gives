export class DonationsPaymentPage{
    creditCardNumber = '#cc-number';
    creditCardName = '#cc-name';
    creditCardCVC = '#cc-cvc';
    donateButton = 'Donate';
    purchaseButton = 'Purchase';
    textCompletedTransaction = 'Your transaction is complete.';
    textReceipEmail = 'Your receipt has been sent to your email address.';
    textReceipEmailTickets = 'Your receipt and tickets have been sent to your email address.';
    operationFailedText ='Operation failed'//h5
    errorPaymentText ='There was an error during the payment process'//p
    tryAgainText ='Please try again or e-mail'//p
    emailSupport = 'info@swellfundraising.com.'//p
    alertPaymentFailed = '.alert';
    PreviousBtn = 'Previous';

    verifyPaymentPage(){
        cy.get(this.creditCardNumber).should('be.visible');
        cy.get(this.creditCardName).should('be.visible');
        cy.get(this.creditCardCVC).should('be.visible');
    }

    inputCreditCard(ccNumber : string, ccName : string, ccCVC : string){
        cy.get(this.creditCardNumber).type(ccNumber);
        cy.get(this.creditCardName).type(ccName);
        cy.get(this.creditCardCVC).type(ccCVC);
    }

    inputCreditCardTicket(ccNumber : string, ccCVC : string){
        cy.get(this.creditCardNumber).type(ccNumber);
        cy.get(this.creditCardCVC).type(ccCVC);
    }

    clickDonateButton(amount:string){
        cy.get('button').contains(this.donateButton+' '+amount).click();
    }

    clickPurchase(amount:string){
        cy.get('button').contains(this.purchaseButton).click();
    }

    verifyTransactionFinish(){
        cy.wait(3000);
        cy.get('h5').contains(this.textCompletedTransaction).should('be.visible');
        cy.get('h6').contains(this.textReceipEmail).should('be.visible');
    }

    verifyTransactionTicketsFinish(){
        cy.wait(5000);
        cy.get('h5').contains(this.textCompletedTransaction).should('be.visible');
        cy.get('h6').contains(this.textReceipEmailTickets).should('be.visible');
    }

    verifyTransactionFailed(){
        cy.wait(4000);
        cy.get(this.alertPaymentFailed).contains(this.operationFailedText).should('be.visible');
        cy.get(this.alertPaymentFailed).contains(this.tryAgainText).should('be.visible');
        cy.get('p').contains(this.tryAgainText).children()
        .get('a').contains(this.emailSupport).should('be.visible');
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

}