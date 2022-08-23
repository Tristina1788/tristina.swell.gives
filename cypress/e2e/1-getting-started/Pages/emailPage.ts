export class EmailPage{
    emailInput ='[type="email"]';
    passInput = '[type="password"]';
    buttonNext = 'button';
    searchBar = '[aria-label="Search in mail"]';

    inputEmail(email:string){
        cy.get(this.emailInput).type(email);
    }

    clickNextButton(){
        cy.get(this.buttonNext).click();
    }

    inputPassword(password:string){
        cy.get(this.passInput).type(password);
    }

    searchMessage(msg:string){
        cy.get(this.passInput).type(msg+'{enter}');
    }

}