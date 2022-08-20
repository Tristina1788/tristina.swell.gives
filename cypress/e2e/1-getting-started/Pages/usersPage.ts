export class UsersPage{

    verifyTheUsersIsSponsor(userPage : string, sponsorName : string){
        cy.visit(userPage);
        cy.get('div').contains(sponsorName).should('be.visible');
    }
}