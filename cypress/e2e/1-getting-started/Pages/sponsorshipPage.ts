export class SponsorshipPage{
    radioItem = '.radio';
    CreditSomeoneCheckBox = '[id="referral_checkbox"]';
    dropdownSelectButton = '.ngx-dropdown-button';
    searchText = '[name="search-text"]';
    avaibleItem = '.available-items';
    PreviousBtn = 'Previous';
    nextBtn = 'Next';

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