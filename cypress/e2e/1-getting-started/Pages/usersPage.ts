export class UsersPage{
    giveNow = '[value="GIVE NOW"]';
    purchaseTickets = '[value="Purchase Tickets"]';
    becomeASponser = '[value="BECOME A SPONSOR"]';
    becomeAHost = '[value="BECOME A HOST"]';
    becomeAFund = '[value="BECOME A FUNDRAISER"]';
    giveNowActionForm = 'donations';
    purchaseTicketsActionForm = 'tickets/#ticket';
    becomeAsponsorActionForm = 'donations#/sponsorship';
    becomeAHostActionForm = 'donations#/table';
    becomeAFundraiserActionForm = 'register';
    individuallyRaisedText = 'Individually Raised';
    donorsReferredText = 'Donors Referred';
    tableFundraisedText = 'Table Fundraised';
    socialScoreText = 'Social Score';
    eventFundraisedText = 'Event Fundraised';

    verifyUIShowDonorInfo(){
        cy.get('span').contains(this.individuallyRaisedText).should('be.visible');
        cy.get('span').contains(this.donorsReferredText).should('be.visible');
        //cy.get('span').contains(this.tableFundraisedText).should('be.visible');
        cy.get('span').contains(this.socialScoreText).should('be.visible');
        cy.get('span').contains(this.eventFundraisedText).should('be.visible');
    }
    VerifyGiveNowButtonHasCorrectAction(url:string){
        cy.get(this.giveNow).should('be.visible');
        cy.get(this.giveNow).parent().invoke('attr','action')
        .should('eq',url+ this.giveNowActionForm);
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