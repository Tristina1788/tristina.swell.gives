export class ThankYouPage{
    titleThankYouPage  = 'Thank you for supporting';
    fundraiserText = 'Your event fundraising page is located at:'; // h3
    fundraiserSuccess = 'Your transaction was successful and we just sent you an email';//p
    confirmPurchaseTxt = 'This confirms you purchased a ticket.';
    fundraiserLink = '[href="https://tristina.swell.gives/users/';
    imgEvent = '.bg-stretch';
    imglogo = '.logo';

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).eq(1).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
    }
    verifyThankYouPageAfterFundraiserSuccess(fname:string, lname:string){
        cy.wait(6000);
        cy.get('h1').contains(this.titleThankYouPage).should('be.visible');
        cy.get('h3').contains(this.fundraiserText).should('be.visible');
        let link = this.fundraiserLink+fname+'.'+lname+'"]';
        cy.get(link.toLowerCase()).should('be.visible');
    }

    verifyThankYouPageAfterFundraiserSuccessForComp(fname:string, lname:string, ticketType : string){
        cy.wait(6000);
        cy.get('h1').contains(this.titleThankYouPage).should('be.visible');
        cy.get('p').contains(this.fundraiserSuccess).should('be.visible');
        let link = this.fundraiserLink+fname+'.'+lname+'"]';
        //cy.get(link.toLowerCase()).should('be.visible');
        cy.get('td').contains(ticketType).should('be.visible');
        cy.get('th').contains(this.confirmPurchaseTxt).should('be.visible');
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

    verifyImageHeaderSetupCorrectInBranding(){
       
        cy.get(this.imgEvent).children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageHeader);
            });
            
        });
    }

    verifyTitlePageCorrect(title :string){
        cy.get('h1').contains(title).should('be.visible');
    }
}