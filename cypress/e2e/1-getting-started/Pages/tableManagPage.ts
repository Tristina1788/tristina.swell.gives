
export class TableManageSetupPage{
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcontents-list"]';
    searchInput = '[type="search"]';
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    emailBtn = '.fa-envelope-o';
    registerBtn = '.fa-sign-in';
    fundraisingBtn = '.fa-share-square-o';
    tableList = '#eventtables-list';
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

    clickEmailBtn(){
        cy.get(this.emailBtn).click();
    }

    clickRegisterBtn(){
        cy.get(this.registerBtn).click();
    }

    clickFundraisingBtn(){
        cy.get(this.fundraisingBtn).click();
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
    
    verifyTableIsNotExist(name:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).should('not.exist');
    }

    verifyTableIsExist(name : string, number : string, type : string, hostName : string, amount : number = 0, seats : number = 2, confirmNumber : number = 0, unconfirmNumber : number = 0)
    {
        let empty = seats - confirmNumber - unconfirmNumber;
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        if(amount > 0)
            cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
            .next().contains(number)
            .next('td').contains(type)
            .next('td').contains(amount)
            .next('td').contains(hostName)
            .next('td').contains(seats)
            .next('td').contains(confirmNumber)
            .next('td').contains(unconfirmNumber)
            .next('td').contains(empty)
            .should('be.visible');
        else
            cy.get(this.tableList).children('tbody').children('tr').children('td')
            .children('a').contains(name).parent('td')
            .next('td').children('b').contains(number).parent('td')
            .next('td').contains(type)
            .next('td').next('td').contains(hostName)
            .next('td').children('a').contains(seats).parent('td')
            .next('td').contains(confirmNumber)
            .next('td').contains(unconfirmNumber)
            .next('td').contains(empty)
            .should('be.visible');
        
    }

    visit(url: string){
        cy.visit(url);
    }
}