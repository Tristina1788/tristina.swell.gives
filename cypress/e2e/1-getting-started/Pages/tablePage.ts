export class TablePage{
    giveNowBtn = '.expanded';
    giveNowText = 'To give to this Table click a Guest and donate through their page.';
    purchaseTickets = '[value="Purchase Tickets"]';
    becomeASponser = '[value="BECOME A SPONSOR"]';
    becomeAHost = '[value="BECOME A HOST"]';
    becomeAFund = '[value="BECOME A FUNDRAISER"]';
    giveNowActionForm = 'donations';
    purchaseTicketsActionForm = 'tickets/#ticket';
    becomeAsponsorActionForm = 'donations#/sponsorship';
    becomeAHostActionForm = 'donations#/table';
    becomeAFundraiserActionForm = 'register';
    tableRaisedText = 'Table Raised';
    socialScoreText = 'Social Score';
    totalAmountRaised = 'Total Amount Raised';

    verifyUIShowDonorInfo(){
        cy.get('span').contains(this.tableRaisedText).should('be.visible');
        cy.get('span').contains(this.socialScoreText).should('be.visible');
        cy.get('span').contains(this.totalAmountRaised).should('be.visible');
    }
    
    VerifyGiveNowButtonHasCorrectAction(url:string){
        cy.get(this.giveNowBtn).contains(this.giveNowText).should('be.visible');
    }

    verifyBecomeAHostButtonHasCorrectAction(url:string){
        cy.get(this.becomeAHost).should('be.visible');
        cy.get(this.becomeAHost).parent().invoke('attr','action')
        .should('eq',url+ this.becomeAHostActionForm);
    }

    verifyBecomeASponsorshipButtonHasCorrectAction(url:string){
        cy.get(this.becomeASponser).should('be.visible');
        cy.get(this.becomeASponser).parent().invoke('attr','action')
        .should('eq',url+ this.becomeAsponsorActionForm);
    }

    verifyPurchaseTicketsButtonHasCorrectAction(url:string){
        cy.get(this.purchaseTickets).should('be.visible');
        cy.get(this.purchaseTickets).parent().invoke('attr','action')
        .should('eq',url+ this.purchaseTicketsActionForm);
    }

    verifyBecomeAFundraiserButtonHasCorrectAction(url:string){
        cy.get(this.becomeAFund).should('be.visible');
        cy.get(this.becomeAFund).parent().invoke('attr','action')
        .should('eq',url+ this.becomeAFundraiserActionForm);
    }

    verifyTheUsersIsSponsor(userPage : string, sponsorName : string){
        cy.visit(userPage);
        cy.get('div').contains(sponsorName).should('be.visible');
    }
}