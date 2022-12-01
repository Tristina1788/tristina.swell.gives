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
    successEmail = 'Fundraiser Success Email';
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
        cy.wait(10000);
         this. getIframeBody().find('h2').contains(this.titlePage,{timeout:30000}).should('be.visible');

        this. getIframeBody().find('h5').contains(this.guestCheckIn,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.fundraiserReg,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.pledgeCreatation,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.pledgeReminder,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.personTicketEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.virtualTicketEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.ticketPurchase,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.liveStreamReminderEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.persionReminderEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tableHostEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.emailToGuest,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tbGuestInvitation,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.emailToHost,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.tablePurchase,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.compEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.donationReceipt,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.successEmail,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.recurringDonationReceipt,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        this. getIframeBody().find('h5').contains(this.sponsorshipPurchaseReceipt,{timeout:30000}).parent(this.cardBody).children('div').children('a').should('be.visible');
        
    }

    clickEmailTemplate(name : string){
        cy.wait(5000);
        this. getIframeBody().find('h5').contains(name,{timeout:10000}).parent(this.cardBody).children('div').children('a').click();
    }

    
}