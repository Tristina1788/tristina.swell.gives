export class EmailEditorPage{
    iframe = '.second-row';
    titlePage = 'Email Template Editor';//h2
    guestCheckIn = 'Guest Check In';
    fundraiserReg = 'Fundraiser Registration';
    pledgeCreatation = 'Pledge Creation';
    pledgeReminder = 'Pledge Reminder';
    personTicketEmail = 'In-Person Ticket Email';
    virtualTicketEmail = 'Virtual Ticket Email';
    ticketPurchase = 'Ticket Purchase Receipt';
    liveStreamReminderEmail = 'Livestream Reminder Email';
    persionReminderEmail = 'In-Person Event Reminder Email';
    tableHostEmail = 'Table Host Email';
    emailToGuest = 'Email to Guest When Guest Declines';
    tbGuestInvitation = 'Table Guest Invitation';
    emailToHost = 'Email to Host When Guest Declines';
    tablePurchase = 'Table Purchase Receipt';
    compEmail = 'Comp Ticket Email';
    donationReceipt = 'Donation Receipt';
    successEmail = 'Referral Success Email';
    recurringDonationReceipt = 'Recurring Donation Receipt';
    sponsorshipPurchaseReceipt = 'Sponsorship Purchase Receipt';
    startEditingBtn = 'Start editing';
    cardBody = '.card-body';

    getIframeDocument = () => {
        return cy
        .get('iframe.second-row')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
    getIframeBody = () => {
        // get the document
        return this.getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    }

    verifyAllTemplateExist(){
        cy.wait(5000);
         this. getIframeBody().find('h2').contains(this.titlePage).should('be.visible');

        this. getIframeBody().find('h5').contains(this.guestCheckIn).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.fundraiserReg).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.pledgeCreatation).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.pledgeReminder).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.personTicketEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.virtualTicketEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.ticketPurchase).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.liveStreamReminderEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.persionReminderEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tableHostEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.emailToGuest).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tbGuestInvitation).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.emailToHost).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tablePurchase).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.compEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.donationReceipt).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.successEmail).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.recurringDonationReceipt).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.sponsorshipPurchaseReceipt).parent(this.cardBody).children('div').children('a').should('be.visible');
        
    }

    clickEmailTemplate(name : string){
        cy.wait(5000);
        this. getIframeBody().find('h5').contains(name).parent(this.cardBody).children('div').children('a').click();
    }

    
}