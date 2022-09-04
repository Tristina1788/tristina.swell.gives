export class DonationsAmountPage{
    amountSelection = '.selector-button';
    divAmoutBeforeFee = '.progress_bar__flags--purchased'
    amoutBeforeFee ='.progress_bar__flags_value';
    otherAmount ='[name="other_amount_input"]';
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
    PreviousBtn = 'Previous';
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

    verifyDonationAmountPage(){
        cy.get(this.amountSelection).should('be.visible');
        expect(cy.get(this.coverTransactionFeeSelection)).to.exist;
        expect(cy.get(this.recurrContributeSelection)).to.exist;
        expect(cy.get(this.acknownSelection)).to.exist;
    }

    selectFee(amount : string){
        cy.get(this.amountSelection).contains(amount).click();
    }
    verifyFeeSelectionCorrect(amount : string){
        expect(cy.get(this.amoutBeforeFee).contains(amount+'.00')).to.exist;
        
    }

    inputOtherAmount(amount : string){
        cy.get(this.otherAmount).type(amount);   
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

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyShowThankYouPledge(amount:string){
        cy.wait(3000);
        cy.get('h5').contains(this.textThankYouPledge).should('be.visible');
    }
}