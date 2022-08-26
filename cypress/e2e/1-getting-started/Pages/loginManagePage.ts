export class LoginManagePage{
    emai = '#email';
    password = '#password';
    signInBtn = 'Sign In';

    inputloginForm(email : string, pass : string){
        cy.get(this.emai).type(email);
        cy.get(this.password).type(pass);
        cy.get('button').contains(this.signInBtn).click();
    }
}