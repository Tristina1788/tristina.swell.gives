import { DetailSetupPage } from "./detailSetupPage";

export class DashboardPage {
    logoutBtn = 'Log Out';
    profileBtn = 'My Profile';
    dashboarBtn = 'Dashboard';

    logoutManagePage(email: string, pass: string) {
        
        cy.get('ul.nav.navbar.navbar-top-links.navbar-right.mbn').first().click();
        cy.get('a').contains(this.logoutBtn).click();
        
    }

    clickProfileBtn(){
        cy.get('a').contains(this.profileBtn).click();
    }

    verifyLoginSuccess(){
        cy.get('span').contains(this.dashboarBtn).should('be.visible');
    }
}