export class ThankYouPage{
    titleThankYouPage  = 'Thank you for supporting';
    fundraiserText = 'Your event fundraising page is located at:'; // h3
    fundraiserLink = '[href="https://tristina.swell.gives/users/';

    verifyThankYouPageAfterFundraiserSuccess(fname:string, lname:string){
        cy.wait(4000);
        cy.get('h1').contains(this.titleThankYouPage).should('be.visible');
        cy.get('h3').contains(this.fundraiserText).should('be.visible');
        let link = this.fundraiserLink+fname+'.'+lname+'"]';
        cy.get(link.toLowerCase()).should('be.visible');
    }

    clickFundraiserUserLinks(fname:string, lname:string){
        let link = this.fundraiserLink+fname+'.'+lname+'"]';
        cy.get(link.toLowerCase()).click();
    }

    verifyNonProfitNameSetupCorrect(nameNP : string){
        cy.get('h1').contains(nameNP).should('be.visible');
    }

    
    verifyNameSetupCorrect(name : string){
        cy.get('p').contains(name).should('be.visible');
        cy.get('a').contains(name).should('be.visible');
    }
}