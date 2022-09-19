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
    invalidcc = '.ng-invalid #cc-number';
    validcc = '.jp-card-valid #cc-number';
    expiredYearcc = 'select#cc-year';
    optionexpiredYear = 'option'; //option
    disableBtn = 'disabled'
    invalidCVC = '.ng-invalid';
    validCVC = '.ng-valid';

    imgEvent = '.event-image';
    imglogo = '.logo';

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).children('a').children('img').invoke('attr', 'src')
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

    verifyPaymentPage(){
        cy.get(this.creditCardNumber).should('be.visible');
        cy.get(this.creditCardName).should('be.visible');
        cy.get(this.creditCardCVC).should('be.visible');
    }

    inputExpiredYear(year : string){
        cy.get(this.expiredYearcc).select(year);
    }

    verifyCreditCardNumberIsInvalid(){
        cy.get(this.invalidcc).should('be.visible');
    }

    verifyCreditCardNumberIsValid(){
        cy.get(this.validcc).should('be.visible');
    }

    verifyCreditCardVCVIsValid(){
        cy.get(this.validCVC).should('be.visible');
    }

    verifyCreditCardVCVIsInvalid(){
        cy.get(this.invalidCVC).should('be.visible');
    }

    inputCreditCard(ccNumber : string, ccName : string, ccCVC : string){
        cy.get(this.creditCardNumber).clear();
        cy.get(this.creditCardName).clear();
        cy.get(this.creditCardCVC).clear();
        cy.get(this.creditCardNumber).type(ccNumber);
        cy.get(this.creditCardName).type(ccName);
        cy.get(this.creditCardCVC).type(ccCVC);
    }

    inputCreditCardNumber(ccNumber : string){
        cy.get(this.creditCardNumber).clear();
        cy.get(this.creditCardNumber).type(ccNumber);
    }

    inputCreditCardTicket(ccNumber : string, ccCVC : string){
        cy.get(this.creditCardNumber).clear();
        cy.get(this.creditCardCVC).clear();
        cy.get(this.creditCardNumber).type(ccNumber);
        cy.get(this.creditCardCVC).type(ccCVC);
    }

    verifyPurchaseButtonDisable(){
        cy.get(':button').should('be.disabled');
    }

    clickDonateButton(amount:string=""){
        cy.get('button').contains(this.donateButton+' '+amount).click();
        
    }

    clickPurchase(amount:string){
        cy.get('button').contains(this.purchaseButton).click();
    }

    verifyTransactionFinish(){
        cy.wait(10000);
        cy.get('h5').contains(this.textCompletedTransaction, { timeout: 20000 }).should('be.visible');
        cy.get('h6').contains(this.textReceipEmail, { timeout: 20000 }).should('be.visible');
    }

    verifyTransactionTicketsFinish(){
        cy.wait(10000);
        cy.get('h5').contains(this.textCompletedTransaction, { timeout: 20000 }).should('be.visible');
        cy.get('h6').contains(this.textReceipEmailTickets, { timeout: 20000 }).should('be.visible');
    }

    verifyTransactionFailed(){
        cy.wait(10000);
        cy.get(this.alertPaymentFailed).contains(this.operationFailedText, { timeout: 20000 }).should('be.visible');
        cy.get(this.alertPaymentFailed).contains(this.tryAgainText, { timeout: 20000 }).should('be.visible');
        cy.get('p').contains(this.tryAgainText).children()
        .get('a').contains(this.emailSupport).should('be.visible');
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyNameSetupCorrect(name : string){
        cy.get('h1').contains(name).should('be.visible');
    }
}