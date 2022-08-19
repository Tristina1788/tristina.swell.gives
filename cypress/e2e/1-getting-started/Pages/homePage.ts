export class HomePage{
    giveAHost = '#join';
    giveNow = '[value="GIVE NOW"]';
    purchaseTickets = '[value="Purchase Tickets"]';
    becomeASponser = '[value="BECOME A SPONSOR"]';
    becomeAHost = '[value="BECOME A HOST"]';
    becomeAFund = '[value="BECOME A FUNDRAISER"]';
    
    clickGiveAHostButton(){
        cy.get(this.becomeAHost).click();
    }

    clickGiveNowButton(){
        cy.get(this.giveNow).click();
    }

    clickPurchaseTickets(){
        cy.get(this.purchaseTickets).click();
    }
}

