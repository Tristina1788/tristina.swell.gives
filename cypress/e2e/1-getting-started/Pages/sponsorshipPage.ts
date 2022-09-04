export class SponsorshipPage{
    radioItem = '.radio';
    CreditSomeoneCheckBox = '[id="referral_checkbox"]';
    dropdownSelectButton = '.ngx-dropdown-button';
    searchText = '[name="search-text"]';
    avaibleItem = '.available-items';
    PreviousBtn = 'Previous';
    nextBtn = 'Next';
    imgEvent = '.event-image';
    imglogo = '.logo';

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
    }

    verifyImageHeaderSetupCorrectInBranding(){
       
        cy.get(this.imgEvent).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageHeader);
            });
            
        });
    }

    verifySponsershipPage(){
        cy.get(this.radioItem).should('be.visible');
    }
    clickSponsorItem(spornsorItem:string){
        cy.get(this.radioItem).contains(spornsorItem).click();
    }
    clickButtonNext(){
        cy.get('.button').contains(this.nextBtn).click();
    }

    selectPersonReceiveCredit(personName:string){
        cy.get(this.dropdownSelectButton).click();
        cy.get(this.searchText).type(personName);
        cy.get(this.avaibleItem).contains(personName).click();
        
    }


}