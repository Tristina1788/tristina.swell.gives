export class RegisterPage{
    registerTitle = 'Register';
    firstNameRegisterInput = '[name="attendee_name-firstName"]';
    lastNameRegisterInput = '[name="attendee_name-lastName"]';
    phoneRegisterInput = '[name="attendee_phone"]';
    emailAddress = '[name="attendee_email"]';
    registerBtn = '.nextButton';
    PreviousBtn = '.Previous';
    inforEvent = '.event-info';

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
}