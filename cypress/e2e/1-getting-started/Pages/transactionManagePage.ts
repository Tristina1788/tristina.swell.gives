
export class TransactionManagePage{
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcontents-list"]';
    searchInput = '[type="search"]';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    sendBtn = '.fa-envelope';
    tableList = '#transactions-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';

    clickRefreshBtn(){
        cy.get(this.refreshBtn).click();
    }

    clickAddBtn(){
        cy.get(this.addBtn).click();
    }

    clickSendEmail(){
        cy.get(this.sendBtn).click();
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

    verifyTransactionIsCreated(type: string, fname : string, lname : string, email : string, amount : number, group : string = '', ticket : number = 0){
        cy.wait(2000);
        cy.get(this.searchInput).clear();
        cy.get(this.searchInput).type(fname);
        if(type != 'Ticket') ticket = 0;
        if(group == '')
            cy.get('td').contains(type)
            .next('td').contains(fname)
            .next('td').contains(lname)
            .next('td').contains(email)
            .next('td')
            .next('td').contains(ticket)
            .next('td').contains(amount)
            .should('be.visible');
        else  
            cy.get('td').contains(type)
            .next('td').contains(fname)
            .next('td').contains(lname)
            .next('td').contains(email)
            .next('td').contains(group)
            .next('td').contains(ticket)
            .next('td').contains(amount)
            .should('be.visible');
    }

    verifyTransactionIsNotPresent(email : string){
        cy.get(this.searchInput).type(email);
        cy.get('td').contains(email)
        .should('not.exist');
    }

    visit(url: string){
        cy.visit(url);
    }
}