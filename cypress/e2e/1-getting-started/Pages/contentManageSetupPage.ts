export class ContentManageSetupPage{
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcontents-list"]';
    searchInput = '[type="search"]';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventcontents-list';
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

    clickEditButton(url:string){
        cy.get(this.searchInput).type(url);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(url).parent('tr').children('td').find(this.editBtn).click();
    }

    clickDeleteButton(url:string){
        cy.get(this.searchInput).type(url);
        cy.get(this.deleteBtn).click();
        cy.wait(2000);
        cy.get('button').contains(this.confirmDeleteBtn).click();

    }

    verifyDeleteSuccess(){
        cy.get('p').contains(this.successMsg).should('be.visible');
        
    }

    verifyNewContentPageIsCreated(url : string, link : string, order : number, isActive : boolean, isHidden : boolean, ct : string){
        var active = "No";
        var hidden = "No";
        if(isActive) 
            active = "Yes";
        if(isHidden) 
            hidden = "Yes";
        cy.get(this.searchInput).type(url);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(url)
        .next().contains(link)
        .next().contains(order)
        .next().contains(active)
        .next().contains(hidden).should('be.visible');
    }

    visit(url: string){
        cy.visit(url);
    }

}