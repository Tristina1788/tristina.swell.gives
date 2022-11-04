import { DetailSetupPage } from "./detailSetupPage";

export class LoginManagePage {
    emai = '#email';
    password = '#password';
    signInBtn = 'Sign In';

    visit(url: string) {
        cy.visit(url,{ headers: { "Accept-Encoding": "gzip, deflate" } }, {setTimeout: 30000});
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    }
    inputloginForm(email: string, pass: string) {
        
        cy.get("body").then($body => {
            if ($body.find('button[type="submit"]').length > 0) {   
                cy.get(this.emai).type(email);
                cy.get(this.password).type(pass);
                cy.get('button').contains(this.signInBtn).click();
            }
        });
       
        

    }
}