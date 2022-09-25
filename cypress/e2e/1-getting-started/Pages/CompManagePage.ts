export class CompManagePage{
    codeColumn = '.sorting_1';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventtickespromo-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    compLink = '.fa-external-link';
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

    accessCompLink(code : string){
        cy.get(this.searchInput).type(code);    
        cy.get(this.compLink).parent('a').invoke('attr','href').then(link => {
            console.log("link:"+link);
            cy.forceVisit(link);
        });

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
        //cy.get(this.editBtn).click();
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
    verifycompTicketIsExist(code : string, ticketType : string, amount : number, internalNote :string,lname: string, fname : string, email : string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(fname)
        .next('td').contains(lname)
        .next('td').contains(email)
        .next('td').contains(code)
        .next('td').contains(ticketType)
        .next('td').contains(amount)
        .next('td').contains(internalNote)
        .should('be.visible');
    }

    verifyCompTicketIsNotExist(code : string){
        cy.wait(2000);
        cy.get(this.searchInput).type(code);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(code).should('not.exist');
    }

    visit(url: string){
        cy.forcevisit(url);
    }

}