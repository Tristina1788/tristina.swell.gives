export class ButtonSettingPage{
    giveNow = '[name="GivenowButtonLabel"]';
    purchaseTickets = '[name="TicketsButtonLabel"]';
    becomeHost = '[name="TableButtonLabel"]';
    enableFundraiser = '[data-parsley-id="30"]';
    becomeFundraiser = '[name="FundraiserButtonLabel"]';
    becomeSponsor = '[name="SponsorshipButtonLabel"]';
    saveButton = 'Save Changes';
    saveSuccessText = 'Saved successfully!';

    inputGeneralButtonSetting(giveNowLLb : string, purchaseLb : string, becomeHostLb : string, becomeFundraiser : string, becomeSponsor : string, isFundraiser : boolean = true){
        cy.get(this.giveNow).clear();
        if(giveNowLLb != "")
            cy.get(this.giveNow).type(giveNowLLb);
        
        cy.get(this.purchaseTickets).clear();
        if(purchaseLb != "") 
            cy.get(this.purchaseTickets).type(purchaseLb);

        cy.get(this.becomeHost).clear();
        if(becomeHostLb != "") 
            cy.get(this.becomeHost).type(becomeHostLb);

        

        cy.get(this.becomeSponsor).clear();
        if(becomeSponsor != "") 
            cy.get(this.becomeSponsor).type(becomeSponsor);

        if(isFundraiser) {
            cy.get(this.enableFundraiser).check({force: true});
                cy.get(this.becomeFundraiser).clear();
            if(becomeFundraiser != "") 
                cy.get(this.becomeFundraiser).type(becomeFundraiser);
        }
        
        else cy.get(this.enableFundraiser).uncheck({force: true});
    }

    clickSaveButton(){
        cy.get('button').contains(this.saveButton).click({force: true});
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }



}