export class ContentSetupPage{
    pageUrl = '#page_url';
    pageLink = '#page_link';
    sortOrder = '#sort_order';
    activeCheckbox = '#active';
    hiddenCheckbox = '#hidden';
    content = '#content';
    saveBtn = 'Save';
    ct = '.mce-content-body' //children('p')
    returnToListLink = 'Return to List';
    backManageContentBtn = '.fa-list-ol';

     getIframeDocument = () => {
        return cy
        .get('iframe#content_ifr.tox-edit-area__iframe')
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
      

    inputFormContent(url : string, link : string, order : number, isActive : boolean, isHidden : boolean, ct : string){
        cy.get(this.pageUrl).type(url);
        cy.get(this.pageLink).type(link);
        cy.get(this.sortOrder).clear();
        cy.get(this.sortOrder).type(order+'');
        if(isActive) cy.get(this.activeCheckbox).check();
        else cy.get(this.activeCheckbox).uncheck();
        if(isHidden) cy.get(this.hiddenCheckbox).check();
        else cy.get(this.hiddenCheckbox).uncheck();
        
        this.getIframeBody().invoke('text',ct)
        .then(text=> {
            cy.log("text iframe:"+text);
        });
        
    }

    updateFormContent(url : string, link : string, order : number, ct : string){
        cy.get(this.pageUrl).clear();
        cy.get(this.pageUrl).type(url);
        cy.get(this.pageLink).clear();
        cy.get(this.pageLink).type(link);
        cy.get(this.sortOrder).clear();
        cy.get(this.sortOrder).type(order+'');

        this.getIframeBody().invoke('text',ct)
        .then(text=> {
            cy.log("text iframe:"+text);
        });
        
    }
    verifyFormContent(url : string, link : string, order : number, isActive : boolean, isHidden : boolean, ct : string){
        cy.get(this.pageUrl).invoke('val').then(val => {
            expect(val).to.equal(url);
        });
        cy.get(this.pageLink).invoke('val').then(val => {
            expect(val).to.equal(link);
        });
        cy.get(this.sortOrder).invoke('val').then(val => {
            expect(val).to.equal(order);
        });
        if(isHidden)
            cy.get(this.hiddenCheckbox).should('be.checked');
        else
            cy.get(this.hiddenCheckbox).should('be.not.checked');
        
        if(isActive)
            cy.get(this.activeCheckbox).should('be.checked');
        else 
            cy.get(this.activeCheckbox).should('be.not.checked');
       
        
         cy.get(this.content).invoke('text').then(val => {
             expect(val).to.include(ct);
         });
        
        
    }

    clickSaveButton(){
        cy.get('button').contains(this.saveBtn).click();
    }

    clickBackManageContentPage(){
        cy.get('a').contains(this.returnToListLink).click();
    }



    
    
}