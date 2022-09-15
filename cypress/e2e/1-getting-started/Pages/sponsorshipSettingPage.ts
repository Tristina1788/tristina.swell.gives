export class SponsorshipSettingPage{
    titlePage = '[data-parsley-id="60"]';
    sponsorSectionTitle = 'Sponsorship Section Title';
    sponsorSectionLabel = 'Sponsorship Section Label';
    saveBtn = 'Save Changes';
    previewLink = 'Preview Page';
    saveSuccessText = 'Saved successfully!';

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click({force: true});
    }

    clickOKButton(){
        cy.get('button').contains('OK').click({force: true});
    }

    clickReviewPage(){
        cy.get('a').contains(this.previewLink).click({force: true});
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }

    inputSponsorshipForm(titlePage:string, sponsorTitle: string, sponsorLabel:string){
        cy.get(this.titlePage).clear();
        if(titlePage != "")
            cy.get(this.titlePage).type(titlePage);

        cy.get('label').contains(this.sponsorSectionTitle).parent('div').children('input').clear();
        if(sponsorTitle != "")
            cy.get('label').contains(this.sponsorSectionTitle).parent('div').children('input').type(sponsorTitle);

        cy.get('label').contains(this.sponsorSectionLabel).parent('div').children('textarea').clear();
        if(sponsorLabel != "")
            cy.get('label').contains(this.sponsorSectionLabel).parent('div').children('textarea').type(sponsorLabel);
    }
}