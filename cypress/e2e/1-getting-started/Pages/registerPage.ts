export class RegisterPage{
    registerTitle = 'Register';
    firstNameRegisterInput = '[name="attendee_name-firstName"]';
    lastNameRegisterInput = '[name="attendee_name-lastName"]';
    phoneRegisterInput = '[name="attendee_phone"]';
    emailAddress = '[name="attendee_email"]';
    registerBtn = '.nextButton';
    PreviousBtn = '.Previous';
    inforEvent = '.event-info';
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
    verifyRegisterPage(){
        cy.get('h1').contains(this.registerTitle).should('be.visible');
    }

    inputRegisterForm(fname : string, lname :string, phone : string, email:string){
        cy.get(this.firstNameRegisterInput).type(fname);
        cy.get(this.lastNameRegisterInput).type(lname);
        cy.get(this.phoneRegisterInput).type(phone);
        cy.get(this.emailAddress).type(email);
    }

    clickRegisterButton(){
        cy.get(this.registerBtn).click();
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyInforEventCorrect(date : string, time : string, location : string){
        cy.get('div').find(this.inforEvent).contains(date +' | '+ time + ' | ' + location).should('be.visible');
    }

    verifyNonProfitNameCorrect(nameNP : string){
        cy.get('strong').contains(nameNP).should('be.visible');
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
}