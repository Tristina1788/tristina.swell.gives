export class CouponManageSetupPage{
    codeColumn = '.sorting_1';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventcoupons-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcoupons-list"]';
    searchInput = '[type="search"]';
    confirmBtn = '.confirm';

    clickRefreshBtn(){
        cy.get(this.refreshBtn).click();
        
        cy.get(this.addBtn).click();
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

    verifyCounponPageIsExist(code:string, discount:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code)
        .next().contains(discount).should('be.visible');
    }

    verifyCounponPageIsNotExist(code:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code).should('not.exist');
    }

    visit(url: string){
        cy.visit(url);
    }

}