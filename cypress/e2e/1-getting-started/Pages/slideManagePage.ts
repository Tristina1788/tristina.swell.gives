import { find } from "cypress/types/lodash";

export class SlideManagePage{
    navBar = '.navbar'
    settingBtn = 'Settings';
    slideBtn = 'Slides';
    backgroundBtn = 'Backgrounds';

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

    clickSettingTab() {
        this.getIframeBody().find('.nav-text .text-xs').contains(this.settingBtn).click();
    }

    clickSlideTab() {
        this.getIframeBody().find('.nav-text .text-xs').contains(this.slideBtn).click();
    }

    clickBackgroundTab() {
        this.getIframeBody().find('.nav-text .text-xs').contains(this.backgroundBtn).click();
    }

}