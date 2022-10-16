export class EmailEditorDetailPage {
    backToSelectionTxt = 'Back to selection';//a
    guestCheckIn = 'Guest Check In';//span
    sendPreviewBtn = 'Send Preview';//button
    emailInput = '[placeholder="Email address"]';
    sendEmailSuccess = 'The emails are being sent!'; //div
    subjectPart = '[ng-bind-html="subject | render : testVariables"]';//div
    headerImg = '.mcnImage';
    emailContentPart = '[ng-click="selectPart(line)"]';
    inputSubject = '[ng-model="subject"]';
    contentArear = '#ui-tinymce-1';
    directDonationURLTag = 'Direct Donation URL';
    eventBeneficiaryNameTag = 'Event Beneficiary Name';
    eventBeneficiaryUrlTag = 'Event Beneficiary Url';
    eventDateTag = 'Event Date';
    eventHashTag = 'Event Hashtag';
    eventNameTag = 'Event Name';
    eventTimeTag = 'Event Time';
    eventUrlTag = 'Event URL';
    eventVenueTag = 'Event Venue';
    fundraiserEmailAddressTag = 'Fundraiser Email Address';
    fundraiserFirstNameTag = 'Fundraiser First Name';
    fundraiserLastNameTag = 'Fundraiser Last Name';
    fundraiserProfileLinkTag = 'Fundraiser Profile Link';
    organizationNameTag = 'Organization Name';
    tableHostFirstNameTag = 'Table Host First Name';
    tableHostLastNameTag = 'Table Host Last Name';
    tableNumberTag = 'Table Number';
    ticketCodeTag = 'Ticket Code';
    ticketParentProductNameTag = 'Ticket Parent Product Name';
    ticketPriceTag = 'Ticket Price';
    ticketSeatNumberTag = 'Ticket Seat Number';
    saveBtn = 'Save';

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

    verifyTemplateEmailHasAllParts(name: string) {
        cy.wait(5000);
        this.getIframeBody().find('a').contains(this.backToSelectionTxt).should('be.visible');
        this.getIframeBody().find('div').contains(name).should('be.visible');
        this.getIframeBody().find('button').contains(this.sendPreviewBtn).should('be.visible');
        this.getIframeBody().find('button').contains(this.saveBtn).should('be.visible');
        this.getIframeBody().find(this.emailInput).should('be.visible');
       // this.getIframeBody().find('div').contains(this.sendEmailSuccess).should('be.visible');
        this.getIframeBody().find(this.subjectPart).should('be.visible');
        this.getIframeBody().find(this.headerImg).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(0).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(1).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(2).should('be.visible');
        this.getIframeBody().find(this.inputSubject).should('be.visible');
        this.getIframeBody().find(this.contentArear).should('be.exist');
        this.getIframeBody().find('a').contains(this.directDonationURLTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventBeneficiaryNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventBeneficiaryUrlTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventDateTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventHashTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventTimeTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventUrlTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventVenueTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserEmailAddressTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserFirstNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserLastNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserProfileLinkTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.organizationNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.tableHostFirstNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.tableHostLastNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.tableNumberTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.ticketCodeTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.ticketParentProductNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.ticketPriceTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.ticketSeatNumberTag).should('be.visible');
    }

    verifyTemplateEmailFundraiserRegistrationHasAllParts(name: string) {
        cy.wait(3000);
        this.getIframeBody().find('a').contains(this.backToSelectionTxt).should('be.visible');
        this.getIframeBody().find('div').contains(name).should('be.visible');
        this.getIframeBody().find('button').contains(this.sendPreviewBtn).should('be.visible');
        this.getIframeBody().find('button').contains(this.saveBtn).should('be.visible');
        this.getIframeBody().find(this.emailInput).should('be.visible');
       // this.getIframeBody().find('div').contains(this.sendEmailSuccess).should('be.visible');
        this.getIframeBody().find(this.subjectPart).should('be.visible');
        this.getIframeBody().find(this.headerImg).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(0).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(1).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(2).should('be.visible');
        this.getIframeBody().find(this.inputSubject).should('be.visible');
        this.getIframeBody().find(this.contentArear).should('be.exist');
        this.getIframeBody().find('a').contains(this.directDonationURLTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventBeneficiaryNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventBeneficiaryUrlTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventDateTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventHashTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventTimeTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.eventUrlTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserEmailAddressTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserFirstNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserLastNameTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.fundraiserProfileLinkTag).should('be.visible');
        this.getIframeBody().find('a').contains(this.organizationNameTag).should('be.visible');
    }

    clickSendPreview(){
        this.getIframeBody().find('button').contains(this.sendPreviewBtn).click();
    }

    updateSubject(subject : string){
        this.getIframeBody().find(this.inputSubject).clear();
        this.getIframeBody().find(this.inputSubject).type(subject);
    }

    clickSaveBtn(){
        this.getIframeBody().find('button').contains(this.saveBtn).click();
    }

    verifySubjectAfterUpdate(subject : string){
        this.getIframeBody().find(this.subjectPart).invoke('text').then(subjectText => {
            expect(subjectText).equals(subject);
        });
        
    }

    inputEmail(email : string){
        this.getIframeBody().find(this.emailInput).clear();
        this.getIframeBody().find(this.emailInput).type(email);
    }

    clickSendEmail(){
        this.getIframeBody().find('button').contains(this.sendPreviewBtn).click();
    }

    verifySendEmailSuccess(){
        this.getIframeBody().find('div').contains(this.sendEmailSuccess).should('be.visible');
    }



}