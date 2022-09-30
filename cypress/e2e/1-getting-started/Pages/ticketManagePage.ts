
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
        cy.get('p').contains(this.successMsg).should('be.visible');
        
    }
    
    verifyProductPageIsNotExist(name:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).should('not.exist');
        
    }

    verifyNewProductIsCreated(type : string, name : string, isActive : boolean, isHidden : boolean, price : number, maxPro : number, ticketPerTB : number =0, ticketType : string =''){
        let active = 'Inactive';
        if(isActive) active = 'Active';
        
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        if(ticketType !='')
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(type)
            .next().contains(name)
            .next().contains('$'+price +'.00')
            .next().contains(active+'')
            .next().contains(maxPro)
            .next().contains(ticketType+'')
            .next().contains(ticketPerTB)
            .should('be.visible');
        else 
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(type)
            .next().contains(name)
            .next().contains('$'+price +'.00')
            .next().contains(active+'')
            .next().contains(maxPro)
            .next().next().contains(ticketPerTB)
            .should('be.visible');
    }

    visit(url: string){
        cy.visit(url);
    }
}