export class UserManagementPage {
    addBtn = '.fa-plus-square';
    reloadBtn = '.fa-refresh';
    editBtn = '.fa-edit'
    userTableList = '.portlet-body';

    clickAddButton() {
        cy.get(this.addBtn).click();
    }

    clickReloadButton() {
        cy.get(this.reloadBtn).click();
    }

    verifyUser(firstname: string, lastname = '', email = '', isActive = '') {
        cy.get(this.userTableList).find('tbody>tr>td').contains(email)
            .parent('tr')
            .within(() => {
                cy.get('td').eq(1).contains(firstname).should('be.visible');
                if (lastname != '') {
                    cy.get('td').eq(2).contains(lastname).should('be.visible');
                };
                if (email != '') {
                    cy.get('td').eq(3).contains(email).should('be.visible');
                };
               
                    cy.get('td').eq(4).should('contain', isActive);
            })
    }

    clickUserEditButton(email: string) {
        cy.get(this.userTableList).find('tbody>tr>td').contains(email).parent('tr').find(this.editBtn).click();
    }
}