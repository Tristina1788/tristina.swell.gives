export class BackgroudSlideTabManagePage {
    uploadImageBtn = '[id="file"]';
    importImageBGBtn = '[ng-click="openBackgroundModal()"]';
    removeImgSlideShowBtn = 'Remove from slideshow';
    uploadedImg = '.hoverZoomLink';
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

    uploadImageToSlide(path : string){
        this.getIframeBody().find(this.uploadImageBtn).selectFile(path,{force: true}); //./data/img_test/logo2.jpg
    }

    clickRemoveImgSlideShowBtn(){
        this.getIframeBody().find('span').contains(this.removeImgSlideShowBtn).click();
    }

    verifyUploadImageSuccessfully(){
        this.getIframeBody().find(this.uploadedImg).should('be.visible');
    }

    verifyImageIsNotPresent(){
        this.getIframeBody().find(this.uploadedImg).should('not.exist');
    }

}