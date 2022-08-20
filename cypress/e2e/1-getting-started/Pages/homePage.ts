export class HomePage{
    giveAHost = '#join';
    giveNow = '[value="GIVE NOW"]';
    purchaseTickets = '[value="Purchase Tickets"]';
    becomeASponser = '[value="BECOME A SPONSOR"]';
    becomeAHost = '[value="BECOME A HOST"]';
    becomeAFund = '[value="BECOME A FUNDRAISER"]';
    swellName = '.swell-names';
    swellAmounts = '.swell-amounts'
    boardTopFundraisers = '[title="Top Fundraisers"]';
    boardMostSocial = '[title="Most Social"]';
    boardTable = '[title="Table"]';
    inputSearchName = '[ng-model="name"]'
    clickGiveAHostButton(){
        cy.get(this.becomeAHost).click();
    }

    clickGiveNowButton(){
        cy.get(this.giveNow).click();
    }

    clickPurchaseTickets(){
        cy.get(this.purchaseTickets).click();
    }

    verifyUserInTopFundraiser(userName:string, amount:number){
        
        cy.get(this.boardTopFundraisers).find(this.inputSearchName).type(userName);
        cy.get(this.boardTopFundraisers).find(this.swellName).contains(userName).should('be.visible');
        //cy.get(this.boardTopFundraisers).find(this.swellAmounts).contains('$'+amount).should('be.visible');
    }

    verifyUserInTopSocial(userName:string, amount:number){
        cy.get(this.boardMostSocial).find(this.inputSearchName).type(userName);
        cy.get(this.boardMostSocial).find(this.swellName).contains(userName).should('be.visible');
        cy.get(this.boardMostSocial).find(this.swellAmounts).contains(amount).should('be.visible');
    }

    verifyUserInTable(userName:string, amount:number){
        cy.get(this.boardTable).find(this.inputSearchName).type(userName);
        cy.get(this.boardTable).find(this.swellName).contains(userName).should('be.visible');
        //cy.get(this.boardTable).find(this.swellAmounts).contains(amount).should('be.visible');
    }
}
