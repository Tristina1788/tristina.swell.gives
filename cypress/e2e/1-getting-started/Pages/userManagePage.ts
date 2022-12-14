export class UserManagePage{
    codeColumn = '.sorting_1';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventattendees-list"]';
    searchInput = '[type="search"]';
    confirmBtn = '.confirm';
    saveBtn = 'Save';
    confirmDeleteButton = 'Yes, delete it!';
    emailButton = '.fa-envelope-o';
    emailResendInput = '[data-parsley-id="4"]';
    sendEmailBtn = '#send';
    userFirstName = '#first_name';
    userLastName = '#last_name';
    userPw = '#password';
    userRole = '#role';
    userEmail = '#email';
    userActive = '#active';
    userAvatar = '[type="file"]';
    clickRefreshBtn(){
        cy.get(this.refreshBtn).click();
    }

    clickAddBtn(){
        cy.get(this.addBtn).click();
    }

    clickSaveBtn(){
        cy.wait(3000);
        cy.get('button').contains(this.saveBtn).click();
    }

   
    inputSearch(searchInfor:string){
        cy.get(this.searchInput).type(searchInfor);
    }

    clickOKButton(){
        cy.wait(2000);
        cy.get(this.confirmBtn).click();
    }

    visit(url: string){
        cy.visit(url);
    }

    visitVerifyLink(){
        cy.readFile('./data/data.json',{timeout:2000}).then((data)=> {
            cy.forceVisit(data.verifyLink);
        });
    }

    verifySendEmailExist(){
        cy.get(this.emailButton).should('be.visible');
    }

    verifySendEmailIsNotExist(){
        cy.get(this.emailButton).should('be.not.exist');
    }

    clickSendEmail(){
        cy.get(this.emailButton).click();
    }

    inputEmailAndResend(email : string){
        cy.wait(2000);
        cy.get(this.emailResendInput).clear();
        cy.get(this.emailResendInput).type(email);
        cy.get(this.sendEmailBtn).click();
    }

    verifySaveSuccess(){
        cy.wait(2000);
        cy.get('p').contains(this.successMsg).should('be.visible');
    }

    clickConfirmButton(){
        cy.get(this.confirmBtn).click({force: true});
    }

    addNewUser(fn : string, ln : string, role : string, email : string, pass : string, isActive : string, avatar : string){
        cy.wait(1000);
        cy.get(this.userFirstName).type(fn);
        cy.get(this.userLastName).type(ln);
        cy.get(this.userRole).select(role);
        cy.get(this.userEmail).type(email);
        cy.get(this.userPw).type(pass);
         cy.get(this.userActive).select(isActive);
        //cy.get(this.userAvatar).selectFile(avatar);
        
    }

    updateUser(fn : string, ln : string, role : string, email : string, pass : string, isActive : string, avatar : string){

        cy.wait(1000);
        if(fn!='') cy.get(this.userFirstName).clear();
        cy.get(this.userFirstName).type(fn);
        if(ln!='') cy.get(this.userLastName).clear();
        cy.get(this.userLastName).type(ln);
        if(email!='') cy.get(this.userEmail).clear();
        cy.get(this.userEmail).type(email);
        cy.get(this.userRole).select(role);
        if(pass!='') cy.get(this.userPw).clear();
        cy.get(this.userPw).type(pass);
        cy.get(this.userActive).select(isActive);
        
    }

    verifyUserIsExist(fn : string, ln : string, email : string, role : string, pass : string, isActive : string, avatar : string){
        cy.wait(2000);
        
        cy.get('td').contains(fn)
        .next('td').contains(ln)
        .next('td').contains(email)
        .next('td').contains('No')
        //.next('td').next('td').contains(isActive)
        .should('be.visible');
    }
}