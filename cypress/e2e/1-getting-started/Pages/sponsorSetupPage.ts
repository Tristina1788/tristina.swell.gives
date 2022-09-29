export class SponsorSetupPage{
    sponsorName = 'Organization or Sponsors Name';
    sortOrder = 'Sort Order';
    sponsorUrl = 'Sponsors URL (please enter a full URL e.g. http://www.domain.com)';
    sponsorImg = '[name="logo"]';
    saveBtn = 'Save';
    okBtn = 'OK';

    inputSponsorFormSetupPage(sponsorName : string, order : number, url : string, image : string){
        cy.wait(3000);
        cy.get('li').contains(this.sponsorName).next('li').children('input').clear();
        cy.get('li').contains(this.sponsorName).next('li').children('input').type(sponsorName);

       // cy.get('li').contains(this.sortOrder).next('li').children('select').select(''+order);
        cy.get('li').contains(this.sponsorUrl).next('li').children('input').clear();
        cy.get('li').contains(this.sponsorUrl).next('li').children('input').type(url);

        cy.get(this.sponsorImg).selectFile(image,{force: true});

    }

    clickSaveBtn(){
        cy.wait(5000);
        cy.get('button').contains(this.saveBtn).click();
    }

    clickOKButton(){
        cy.wait(2000);
        cy.get('.sa-confirm-button-container').find('button').contains(this.okBtn).click();
    }
    

}