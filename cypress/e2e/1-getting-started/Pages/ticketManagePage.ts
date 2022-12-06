
export class TicketManagePage{
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcontents-list"]';
    searchInput = '[type="search"]';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#products-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';

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

    clickEditButton(name:string){
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).parent('tr').children('td').find(this.editBtn).click();
        //cy.get(this.editBtn).click();
    }

    clickDeleteButton(name:string){
        cy.get(this.searchInput).type(name);
        cy.get(this.deleteBtn).click();
        cy.wait(2000);
        cy.get('button').contains(this.confirmDeleteBtn).click();
        cy.get('button').contains(this.okBtn).click();

    }

    verifyDeleteSuccess(){
        cy.wait(2000);
        cy.get('p').contains(this.successMsg).should('be.visible');
        
    }
    
    verifyProductPageIsNotExist(name:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).should('not.exist');
        
    }

    verifyTicketIsCreated(guest : string, email : string, ticket : string){
        cy.wait(2000);
        cy.get(this.searchInput).type(guest);
        cy.get('td').contains(guest)
        .next('td').contains(email)
        .next('td').contains(ticket)
        .should('be.visible');
    }

    verifyTicketIsNotPresent(guest : string, email : string, ticket : string){
        cy.get(this.searchInput).type(guest);
        cy.get('td').contains(guest)
        .should('not.exist');
    }

    visit(url: string){
        cy.visit(url);
    }
}