export class DonationsAddressPage{
    fistNameTextbox = 'input[name="firstname"]';
    lastNameTextbox = 'input[name="lastname"]';
    emailTextbox = 'input[name="email"]';
    phoneTextbox = 'input[name="phone"]';
    companyTextbox = 'input[name="company"]';
    address1Textbox = 'input[name="address1"]';
    address2Textbox = 'input[name="address2"]';
    cityTextbox = 'input[name="city"]';
    stateTextbox = 'input[name="state"]';
    zipTextbox = 'input[name="zip"]';
    buttons = 'button[type="button"]';
    nextBtn = 'Next';
    PreviousBtn = 'Previous';
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

    verifyAddressInforPage(){
        cy.get(this.fistNameTextbox).should('be.visible');
        cy.get(this.lastNameTextbox).should('be.visible');
        cy.get(this.emailTextbox).should('be.visible');
        cy.get(this.phoneTextbox).should('be.visible');
        cy.get(this.companyTextbox).should('be.visible');
        cy.get(this.address1Textbox).should('be.visible');
        cy.get(this.address2Textbox).should('be.visible');
        cy.get(this.cityTextbox).should('be.visible');
        cy.get(this.stateTextbox).should('be.visible');
        cy.get(this.zipTextbox).should('be.visible');
    }
    inputAddressInfor(firstName: string, lastName: string, email: string, phone: string,
        company: string, address1: string, address2: string, city: string, state: string,
        zip: string){
        cy.get(this.fistNameTextbox).type(firstName);
        cy.get(this.lastNameTextbox).type(lastName);
        cy.get(this.emailTextbox).type(email);
        cy.get(this.phoneTextbox).type(phone);
        cy.get(this.companyTextbox).type(company);
        cy.get(this.address1Textbox).type(address1);
        cy.get(this.address2Textbox).type(address2);
        cy.get(this.cityTextbox).type(city);
        cy.get(this.stateTextbox).type(state);
        cy.get(this.zipTextbox).type(zip);
        //cy.get(this.buttons).contains('Complete').click();
    }

    inputAddressInforTickets(company: string, address1: string, address2: string, city: string, state: string,
        zip: string){
        
        cy.get(this.companyTextbox).type(company);
        cy.get(this.address1Textbox).type(address1);
        cy.get(this.address2Textbox).type(address2);
        cy.get(this.cityTextbox).type(city);
        cy.get(this.stateTextbox).type(state);
        cy.get(this.zipTextbox).type(zip);
        //cy.get(this.buttons).contains('Complete').click();
    }

    clickNextButton(){
        cy.get('.button').contains(this.nextBtn).click();
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyNameSetupCorrect(name : string){
        cy.get('h1').contains(name).should('be.visible');
    }
}

