export class UserManagementDetailPage {
    firstNameInput = '#first_name';
    lastNameInput = '#last_name';
    usersRoleSelect = '#role';
    emailAddressInput = '#email';
    passwordInput = '#password';
    userActiveSelect = '#active';
    chooseFileAvatarBtn = 'input[name="avatar"]';
    closeBtn = 'button[class="close"]';
    saveBtn = 'button[type="submit"]';
    oKBtn = 'button[class="confirm"]';
    successMsg = 'Completed successfully!';

    inputUserForm(firstname : string,lastname = '',selectRole = '',email = '',password = '',selectActive = '',chooseFileBtn = '') {
        
        cy.get(this.firstNameInput).clear().type(firstname);

        if(lastname != '') {
            cy.get(this.lastNameInput).clear().type(lastname);
        };
        if(selectRole != '') {
            cy.get(this.usersRoleSelect).select(selectRole)
        };
        if(email != '') {
            cy.get(this.emailAddressInput).clear().type(email);
        };
        if(password != '') {
            cy.get(this.passwordInput).clear().type(password);
        };
        if(selectActive != '') {
            cy.get(this.userActiveSelect).select(selectActive)
        };
        if(chooseFileBtn != '') {
            cy.get(this.chooseFileAvatarBtn).selectFile(chooseFileBtn,{force: true}); //./data/img_test/logo2.jpg
        };
    }

    clickSaveButton() {
        cy.get(this.saveBtn).click();
        cy.wait(3000);
        cy.contains(this.successMsg).should('be.visible');
        cy.get(this.oKBtn).click();
    }

    clickCloseButton() {
        cy.get(this.closeBtn).click();
    }

   
}