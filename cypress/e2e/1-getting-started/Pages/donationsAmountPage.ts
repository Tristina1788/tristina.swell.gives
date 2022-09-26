export class DonationsAmountPage{
    amountSelection = '.selector-button';
    divAmoutBeforeFee = '.progress_bar__flags--purchased'
    amoutBeforeFee ='.progress_bar__flags_value';
    otherAmount ='[name="other_amount_input"]';
    amoutAfterFee = '[for="middle-label"]';
    coverTransactionFeeSelection = '#cover_fee_checkbox';
    recurrContributeSelection = '#recurring_checkbox';
    honorCheckbox = '#honor_checkbox';
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
    honoredNameInput = '[name="honoredName"]';
    creditGiftDdl = '[name="referrer"]';
    creditCheckbox = '#referral_checkbox';
    searchTextInput = 'name="search-text"';
    ddlBtn = '.ngx-dropdown-button';
    honorNameInput = '[name="honoredName"]';
    inputDDLCredit(){
        cy.get(this.ddlBtn).click();
        cy.get('li').eq(0).click();

    }

    inputHonorInfor(text : string ){
        cy.get(this.honorNameInput).type(text)

    }
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

    verifyFormApplyFromSetting(title: string, amount: number, isAnonymous: boolean, isPledge: boolean, isRec: boolean, issHonor: boolean, isGiftCredit: boolean,isFee:boolean,
        htitle: string = "", hdes: string = "", hstitle: string = "", hsPlaholder: string = "", errorMsg: string = "",
        isRequireCredit: boolean = false, ctitle: string = "", cSubtitle: string = "", cDecs: string = ""){
        cy.wait(5000);
        cy.get(this.amountSelection).contains('$'+amount).should('be.visible');
        cy.get('h1').contains(title).should('be.visible');
        if(isAnonymous){
            cy.get('span').contains('Make My Gift Anonymous').should('be.visible');
            expect(cy.get(this.acknownSelection)).to.exist;
        } else {
            cy.get('span').contains('Make My Gift Anonymous').should('be.not.visible');
            cy.get(this.acknownSelection).should('be.not.visible');
        }

        if(isPledge){
            cy.get('span').contains('Fulfill this gift at a later time').should('be.visible');
            cy.get('div').contains('Pledge your support now and give later.').should('be.visible');
            cy.get('label').contains(' Yes, pledge now and fulfill later ').should('be.visible');
            cy.get(this.fullFillSelection).should('be.exist');
        } else {
            cy.get('span').contains('Fulfill this gift at a later time').should('be.not.visible');
            cy.get('div').contains('Pledge your support now and give later.').should('be.not.visible');
            cy.get('label').contains(' Yes, pledge now and fulfill later ').should('be.not.visible');
            cy.get(this.fullFillSelection).should('be.not.visible');
        }

        if(isRec){
            cy.get('span').contains('Recurring Contribution').should('be.visible');
            cy.get('label').contains('Yes, make this a recurring contribution.').should('be.visible');
            cy.get(this.recurrContributeSelection).should('be.exist');
        } else {
            cy.get('span').contains('Recurring Contribution').should('be.not.visible');
            cy.get('label').contains('Yes, make this a recurring contribution.').should('be.not.visible');
            cy.get(this.recurrContributeSelection).should('be.not.visible');

        }

        if(isFee){
            cy.get('span').contains('Cover transaction fee').should('be.visible');
            cy.get('label').contains('ike to help cover the transaction fee for my gift. My total donation will be ').should('be.visible');
            cy.get(this.coverTransactionFeeSelection).should('be.exist');
        } else {
            cy.get('span').contains('Cover transaction fee').should('be.not.visible');
            cy.get('label').contains('ike to help cover the transaction fee for my gift. My total donation will be ').should('be.not.visible');
            

        }

        if(issHonor){
            cy.get('span').contains(htitle).should('be.visible');
            cy.get('div').contains(hstitle).should('be.visible');
            cy.get(this.honorCheckbox).should('be.exist')
            
            cy.get(this.honorCheckbox).check({force: true});
            cy.get('legend').contains(hdes).should('be.visible');
            cy.get(this.honoredNameInput).invoke('attr', 'placeholder')
            .then(text => {
                expect(text).equal(hsPlaholder);
            });
            cy.get('h5').contains(errorMsg).should('be.visible');

        } else {
            cy.get('span').contains(htitle).filter(':visible').should('be.not.exist');
            cy.get('div').contains(hstitle).filter(':visible').should('be.not.exist');
            cy.get(this.honorCheckbox).should('be.not.visible');
        }

        if(isGiftCredit){
            cy.get('span').contains(ctitle).should('be.visible');
            cy.get('div').contains(cSubtitle).should('be.visible');
            cy.get('span').contains(cDecs).should('be.visible');
            cy.get(this.creditGiftDdl).should('be.visible');
            if(isRequireCredit){
                cy.get(this.creditCheckbox).should('be.exist')
            } else {
                cy.get(this.creditCheckbox).should('be.not.visible')
            }
                 
            
        } else{
            cy.get('span').contains(ctitle).filter(':visible').should('be.not.exist');
            cy.get('label').contains(cSubtitle).filter(':visible').should('be.not.exist');
            cy.get('span').contains(cDecs).filter(':visible').should('be.not.exist');
            cy.get(this.creditGiftDdl).should('be.not.visible');
        }

        

    }
}