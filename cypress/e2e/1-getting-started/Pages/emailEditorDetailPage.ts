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
    emailTag = 'Email';
    eventBeneficiaryUrlTag = 'Event Beneficiary Url';
    eventDateTag = 'Event Date';
    eventHashTag = 'Event Hashtag';
    eventNameTag = 'Event Name';
    eventTimeTag = 'Event Time';
    eventUrlTag = 'Event URL';
    eventVenueTag = 'Event Venue';
    firstNameTag = 'First Name';
    lastNameTag = 'Last Name';
    fullFillmentURLTag = 'Fulfillment URL';
    fundraiserEmailAddressTag = 'Fundraiser Email Address';
    fundraiserFirstNameTag = 'Fundraiser First Name';
    fundraiserLastNameTag = 'Fundraiser Last Name';
    fundraiserProfileLinkTag = 'Fundraiser Profile Link';
    organizationNameTag = 'Organization Name';
    transactionAddressTag = 'Transaction Address';
    transactionAmountTag = 'Transaction Amount';
    tableHostFirstNameTag = 'Table Host First Name';
    tableHostLastNameTag = 'Table Host Last Name';
    tableNumberTag = 'Table Number';
    ticketCodeTag = 'Ticket Code';
    ticketParentProductNameTag = 'Ticket Parent Product Name';
    ticketPriceTag = 'Ticket Price';
    ticketSeatNumberTag = 'Ticket Seat Number';
    saveBtn = 'Save';
    fullFillPledgeBtn = 'FULFILL YOUR PLEDGE';

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

    verifyMainPartTemplateIsPresent(name : string){
        this.getIframeBody().find('a').contains(this.backToSelectionTxt).should('be.visible');
        this.getIframeBody().find('div').contains(name).should('be.visible');
        this.getIframeBody().find('button').contains(this.sendPreviewBtn).should('be.visible');
        this.getIframeBody().find('button').contains(this.saveBtn).should('be.visible');
        this.getIframeBody().find(this.emailInput).should('be.visible');
        this.getIframeBody().find(this.subjectPart).should('be.visible');
        this.getIframeBody().find(this.headerImg).should('be.visible');
        this.getIframeBody().find(this.emailContentPart).eq(0).should('be.visible');
        if (name != 'In-Person Event Reminder Email')
            this.getIframeBody().find(this.emailContentPart).eq(1).should('be.visible');
        this.getIframeBody().find(this.inputSubject).should('be.visible');
        this.getIframeBody().find(this.contentArear).should('be.exist');
    }
    verifyTemplateEmailHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        this.getIframeBody().find(this.emailContentPart).eq(2).should('be.visible');
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Event Venue", "Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Organization Name", "Table Host First Name",
                      "Table Host Last Name", "Table Number", "Ticket Code", "Ticket Parent Product Name", "Ticket Price", "Ticket Seat Number"];
    
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
        
    }

    verifyTemplateEmailFundraiserRegistrationHasAllParts(name: string) {
        cy.wait(3000);
        this.verifyMainPartTemplateIsPresent(name);
        this.getIframeBody().find(this.emailContentPart).eq(2).should('be.visible');
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL","Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Organization Name"];
    
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
        
    }

    verifyTemplateEmailPledgeCreationHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        this.getIframeBody().find('a').contains(this.fullFillPledgeBtn).should('be.visible');
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "First Name", "Fulfillment URL",
                      "Last Name", "Organization Name", "Transaction Amount"];
    
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplateEmailPledgeReminderHasAllParts(name: string) {
        cy.wait(5000);
        this.verifyMainPartTemplateIsPresent(name);
        this.getIframeBody().find('a').contains(this.fullFillPledgeBtn).should('be.visible');
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url","Email", "Event Date" , "Event Hashtag",
        "Event Name", "Event Time", "Event URL", "Event Venue", "First Name", "Fulfillment URL",
        "Last Name", "Transaction Address", "Organization Name", "Transaction Amount"];

        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplateEmailTicketHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Event Venue", "Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Organization Name", "Promotion Code", "Table Host Email Address",
                      "Table Host First Name", "Table Host Last Name", "Table Name", "Table Number", "Table Profile URL","Table Type",
                      "Ticket Code", "Ticket Parent Product Name", "Ticket Price", "Ticket Seat Number", "Total Seats"];
    
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplateVirtualTicketEmailtHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        this.getIframeBody().find(this.emailContentPart).eq(2).should('be.visible');
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Organization Name", "Promotion Code", 
                      "Ticket Code", "Ticket Parent Product Name", "Ticket Price"];
    
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplateTicketPurchaseReceipttHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        let tagArr = ["Direct Donation URL", "Email", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Event Venue", "First Name","Last Name","Organization Name", "Quantity purchased",
                      "Referring user's first name", "Referring user's last name", "Referring user's URL", 
                       "Ticket Price", "Transaction Address", "Transaction Amount" , "Transaction Date"];
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplateLivestreamReminderEmailtHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Organization Name", "Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Livestream Login Link",
                      "Organization Name", "Promotion Code", "Ticket Code", "Ticket Parent Product Name",
                       "Ticket Price"];
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
    }

    verifyTemplatePersonEventReminderEmailtHasAllParts(name: string) {
        this.verifyMainPartTemplateIsPresent(name);
        let tagArr = ["Direct Donation URL", "Event Beneficiary Name", "Event Beneficiary Url", "Event Date" , "Event Hashtag",
                      "Event Name", "Event Time", "Event URL", "Event Venue", "Fundraiser Email Address", "Fundraiser First Name",
                      "Fundraiser Last Name", "Fundraiser Profile Link", "Organization Name", "Promotion Code", "Ticket Code",
                      "Ticket Parent Product Name", "Ticket Price"];
        for(let i = 0; i < tagArr.length; i++)
            this.getIframeBody().find('a').contains(tagArr[i]).should('be.visible');
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