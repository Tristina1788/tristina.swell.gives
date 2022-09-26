export class GroupManageSetupPage{
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventteams-list"]';
    searchInput = '[type="search"]';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventteams-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';
    groupName = '.sorting_1'

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
        cy.get(this.searchInput).clear();
        cy.get(this.searchInput).type(searchInfor);
    }

    verifyGroupNameHaveDisplay(name: string) {
        this.inputSearch(name)
        cy.get(this.groupName).should('have.text', name);
    }

    clickEditButton(name:string){
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).parent('tr').children('td').find(this.editBtn).click();
    }

    clickDeleteButton(name:string){
        this.inputSearch(name);
        cy.get(this.deleteBtn).click();
        cy.wait(2000);
        cy.get('button').contains(this.confirmDeleteBtn).click();

    }

    verifyDeleteSuccess(){
        cy.get('p').contains(this.successMsg).should('be.visible');
        
    }

    verifyGroupPageIsNotExist(code:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code).should('not.exist');
    }

}