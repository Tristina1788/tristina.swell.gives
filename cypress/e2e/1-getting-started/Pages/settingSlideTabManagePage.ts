import { find } from "cypress/types/lodash";
import { TestPhoneNumberOptionsToJSON } from "mailslurp-client";

export class SettingSlideTabManagePage {
    customizeForm = 'form[name="form.customize"]';
    customizeOperationForm = 'form[name="form.settings"]';
    customizeBackgroundBlueValue = '[class="bubble low ng-binding"]';
    backgroundimageSelect = '[ng-model="config.backgroundPosition"]';
    fontSize = '[ng-model="config.fontSize"]';
    foregroundFontcolor = 'Foreground (FONT) color';//next() verify value
    kcolorpickerValue = 'span.k-colorpicker';
    backgroundColor = 'Background color';//next() verify value
    kColorValueInput = 'input[title="Color Hexadecimal Code"]';
    saveBtn = 'Save';
    showHashTagSelection = '[ng-model="config.showHashtag"]';
    showAmountRaiseSelection = '[ng-model="config.showAmountRaised"]';
    pointerBGBlurSlide = '[class="pointer low"]';//white-space: nowrap; position: absolute; display: block; z-index: 1; left: 136.291px; = 87%
    style87percent = 'white-space: nowrap; position: absolute; display: block; z-index: 1; left: 31.3312px;';
    percentBGBlurSlide = '[class="bubble low ng-binding"]';//ng-bind-template="87%" // 87% //white-space: nowrap; position: absolute; display: block; z-index: 1; left: 136.291px;
    percentBGBlurStyleSlide = 'white-space: nowrap; position: absolute; display: block; z-index: 1; left: 28.7656px;';
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

    changeValueCustomizeForm(imageSelect: string, fontSize: string, forceGroudColor: string, backgroudColor: string) {
        this.getIframeBody().find(this.customizeForm).find(this.pointerBGBlurSlide).invoke('attr','style',this.style87percent);
        this.getIframeBody().find(this.customizeForm).find(this.percentBGBlurSlide).invoke('attr','ng-bind-template','20%');
        
        this.getIframeBody().find(this.customizeForm).find(this.percentBGBlurSlide).invoke('attr','style',this.percentBGBlurStyleSlide);
        this.getIframeBody().find(this.percentBGBlurSlide).invoke('html','20%');
        this.getIframeBody().find(this.percentBGBlurSlide).invoke('html').then(value => {
            cy.log(value+'');
        });
        cy.wait(2000);
        this.getIframeBody().find(this.customizeForm).find(this.backgroundimageSelect).select(imageSelect);
        this.getIframeBody().find(this.customizeForm).find(this.fontSize).select(fontSize);
        this.getIframeBody().contains(this.foregroundFontcolor).next().find('.k-select').click({ force: true })
        this.getIframeBody().find(this.kColorValueInput).click({ force: true });
        cy.wait(1000);
        this.getIframeBody().find(this.kColorValueInput).click({ force: true }).clear();
        this.getIframeBody().find(this.kColorValueInput).click({ force: true }).type(forceGroudColor+'');
        this.getIframeBody().contains(this.backgroundColor).next().find('.k-select').click({ force: true })
        this.getIframeBody().find(this.kColorValueInput).eq(1).click({ force: true }).clear();
        
        this.getIframeBody().find(this.kColorValueInput).eq(1).click({ force: true }).type(backgroudColor+'');
        this.getIframeBody().find(this.customizeForm).contains(this.saveBtn).click({ force: true });
    }

    changeValueCustomizeOperationForm(isHashTag : boolean , isRaiseAmount : boolean){
        if(isHashTag)
            this.getIframeBody().find(this.showHashTagSelection).check({force: true});
        else this.getIframeBody().find(this.showHashTagSelection).uncheck();
        if(isRaiseAmount)
            this.getIframeBody().find(this.showAmountRaiseSelection).check({force: true});
        else this.getIframeBody().find(this.showAmountRaiseSelection).uncheck();
        
        this.getIframeBody().find(this.customizeOperationForm).contains(this.saveBtn).click({ force: true });
    }

    verifyCustomizeForm(imageSelect: string, fontSize: string, forceGroudColor: string, backgroudColor: string) {
        //this.getIframeBody().find(this.percentBGBlurSlide).invoke('html').should('equal', '20%');
        
        this.getIframeBody().find(this.customizeForm).find(this.backgroundimageSelect).contains(imageSelect).invoke('attr', 'selected').should('equal', 'selected');
        this.getIframeBody().find(this.customizeForm).find(this.fontSize).contains(fontSize).invoke('attr', 'selected').should('equal', 'selected');
        this.getIframeBody().contains(this.foregroundFontcolor).next(this.kcolorpickerValue).invoke('attr', 'aria-label').should('equal', 'Current selected color is '+forceGroudColor);
        this.getIframeBody().contains(this.backgroundColor).next(this.kcolorpickerValue).invoke('attr', 'aria-label').should('equal', 'Current selected color is '+backgroudColor);
    }

    verifyCustomizeOperationForm(isHashTag : boolean , isRaiseAmount : boolean){
        if(isHashTag)
            this.getIframeBody().find(this.showHashTagSelection).should('have.class','ng-not-empty');
        else
            this.getIframeBody().find(this.showHashTagSelection).should('have.class','ng-empty');

        if(isRaiseAmount)
            this.getIframeBody().find(this.showAmountRaiseSelection).should('have.class','ng-not-empty');
        else
            this.getIframeBody().find(this.showAmountRaiseSelection).should('have.class','ng-empty');
    }
}