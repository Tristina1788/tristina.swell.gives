export class FundraiserManagePage{
    codeColumn = '.sorting_1';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventattendees-list';
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

    clickRefreshBtn(){
        cy.get(this.refreshBtn).click();
    }

    clickAddBtn(){
        cy.get(this.addBtn).click();
    }

    selectNumberEntry(num : number){
        cy.get(this.paginationSelection).select(num);

    }

    inputSearch(searchInfor:string){
        cy.get(this.searchInput).type(searchInfor);
    }

    clickEditButton(code:string){
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code).parent('tr').children('td').find(this.editBtn).click();
    }

    clickDeleteButton(code:string){
        cy.get(this.searchInput).clear();
        cy.get(this.searchInput).type(code);
        cy.get(this.deleteBtn).click();
        cy.wait(2000);
        cy.get('button').contains(this.confirmDeleteBtn).click();

    }

    clickOKButton(){
        cy.wait(2000);
        cy.get(this.confirmBtn).click();
    }

    verifyDeleteSuccess(){
        cy.get('p').contains(this.successMsg).should('be.visible');
        
    }

    verifyFundraiserIsExist(name : string,code :string, email : string, isLeaderboard : boolean, group : string){
        cy.wait(2000);
        let isLB = 'No';
        console.log("email : "+email);
        if(isLeaderboard) isLB = 'Yes';
        cy.get(this.searchInput).type(name);
        cy.wait(2000);
        cy.get(this.codeColumn).contains(name);
        if(group!='')
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
            .next('td').children('a').contains(code.toLowerCase())
            .parent('td').next('td').children('a').contains(email)
            .parent('td').next('td').contains(isLB)
            .next('td').contains(group)
            .should('be.visible');
        else if(email!='')
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
            .next('td').children('a').contains(code.toLowerCase())
            .parent('td').next('td').children('a').contains(email)
            .parent('td').next('td').contains(isLB)
            .should('be.visible');
        else
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
            .next('td').children('a').contains(code.toLowerCase())
            .parent('td').next('td').next('td').contains(isLB)
            .should('be.visible');
    }

    verifyFundraiserIsNotExist(code:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code).should('not.exist');
    }

    visit(url: string){
        cy.visit(url);
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
        cy.get(this.emailResendInput).clear();
        cy.get(this.emailResendInput).type(email);
        cy.get(this.sendEmailBtn).click();
    }


}