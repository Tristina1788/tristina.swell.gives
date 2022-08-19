export class DonationsAmountPage{
    amountSelection = '.selector-button';
    divAmoutBeforeFee = '.progress_bar__flags--purchased'
    amoutBeforeFee ='.progress_bar__flags_value';
    amoutAfterFee = '[for="middle-label"]';
    coverTransactionFeeSelection = '#cover_fee_checkbox';
    recurrContributeSelection = '#recurring_checkbox';
    timeBill1stRadio = '[name="frequency1"]';
    timeBill15thRadio = '[name="frequency2"]';
    fullFillSelection = '#pledge_checkbox';
    firstNameInput = '[name="firstname"]';
    lastNameInput = '[name="lastname"]';
    emailInput = '[name="email"]';
    phoneNumberInput = '[name="phone"]';
    acknownSelection = '#acknowledgement_checkbox';
    warningAmountText = 'Please select an amount';
    warningtimeBillText = 'Please select the day of the month the recurring contribution should be charged';
    warningFullFillText = 'Please fill in your pledge details';
    pledgeBtn = 'Pledge';
    nextBtn = 'Next';
    textThankYouPledge = 'Thank you for your donation!';


    selectFee(amount : string){
        cy.get(this.amountSelection).contains(amount).click();
    }
    verifyFeeSelectionCorrect(amount : string){
        expect(cy.get(this.amoutBeforeFee).contains(amount+'.00')).to.exist;
        
    }

    selectCoverTransaction(){
        cy.get(this.coverTransactionFeeSelection).click({force: true});
    }

    verifyAmountAfterFee(amountPlusFee:string){
        cy.get(this.amoutAfterFee).contains(amountPlusFee).should('be.visible');
    }

    selectRecurringContribution(){
        cy.get(this.recurrContributeSelection).click({force: true});
    }

    verifyWarningBillTimeShow(amount:string){
        cy.get('h5').contains(this.warningtimeBillText).should('be.visible');
    }


    selectOption1stBill(){
        cy.get(this.timeBill1stRadio).click();
    }

    selectOption15thBill(){
        cy.get(this.timeBill15thRadio).click();
    }

    selectfullFillGiftLater(){
        cy.get(this.fullFillSelection).click({force: true});
    }

    verifyWarningFullFillShow(amount:string){
        cy.get('h5').contains(this.warningFullFillText).should('be.visible');
    }

    inputFormFullFillLater(firstName: string, lastName : string, email : string, phone : string){
        cy.get(this.firstNameInput).type(firstName);
        cy.get(this.lastNameInput).type(lastName);
        cy.get(this.emailInput).type(email);
        cy.get(this.phoneNumberInput).type(phone);
    }

    selectMakeGiftAnonymous(){
        cy.get(this.acknownSelection).click({force: true});
    }

    clickPledgeButton(){
        cy.get('.button').contains(this.pledgeBtn).click();
    }

    clickNextButton(){
        cy.get('.button').contains(this.nextBtn).click();
    }

    verifyShowThankYouPledge(amount:string){
        cy.wait(3000);
        cy.get('h5').contains(this.textThankYouPledge).should('be.visible');
    }
}