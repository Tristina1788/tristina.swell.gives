
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
    sendEmailBtn = 'Yes - Send it!';
    emailInput = '#recipient';
    switchListView = '#send';
    tableLabel = '.page-title';
    seatsLabel = '.guest-list';
    iconGuestList = '.fa-group';
    tableHeader = '.portlet-header';
   // guestRow = '//div[@class="modal-body"]//table[contains(@class,"table-responsive")]//tr[contains(@id,"guest-ticket")]';
    guestRow = '.modal-body';
    clickRefreshBtn(){
        cy.get(this.refreshBtn).click();
        
        cy.get(this.addBtn).click();
    }

    clickAddBtn(){
        cy.get(this.addBtn).click();
    }

    clickEmailBtn(name : string){
        cy.get(this.searchInput).clear();
        cy.get(this.searchInput).type(name);
        cy.get(this.emailBtn).first().click();
        
    }

    inputEmailAndSend(email:string){
        cy.get(this.emailInput).clear();
        cy.get(this.emailInput).type(email);
        cy.wait(2000);
        cy.get('button').contains(this.sendEmailBtn).click({force: true});
    }

    clickRegisterBtn(name : string){
        cy.get(this.searchInput).type(name);
        cy.get(this.registerBtn).parent('a').invoke('attr','href').then(link=>{
           cy.forceVisit(link);
        });
    }

    clickFundraisingBtn(name : string){
        cy.get(this.searchInput).type(name);
        cy.get(this.fundraisingBtn).parent('a').invoke('attr','href').then(link=>{
            cy.forceVisit(link);
         });
    }

    clickSwitchListView(){
        cy.get(this.switchListView).click();
    }


    selectNumberEntry(num : number){
        cy.get(this.paginationSelection).select(num);

    }

    inputSearch(searchInfor:string){
        cy.get(this.searchInput).type(searchInfor);
    }

    clickEditButton(name:string){
        cy.wait(5000);
        cy.get(this.tableLabel).contains(name).click();

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
    
    clickGetSeats(name : string){
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        cy.get(this.seatsLabel).click();
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
            cy.get(this.tableList).children('tbody').children('tr').children('td')
            .children('a').contains(name).parent('td')
            .next('td').children('b').contains(number).parent('td')
            .next('td').contains(type)
            .next('td').contains(amount)
            .next('td').next('td').contains(hostName)
            .next('td').children('a').contains(seats).parent('td')
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

    clickGuestList(name : string){
        cy.get(this.tableLabel).contains(name).parentsUntil(this.tableHeader).nextUntil(this.iconGuestList).click();
    }

    verifyInforOfGuest(guestName : string, email : string){
        cy.get(this.guestRow).contains(guestName).should('be.visible');
        cy.get(this.guestRow).contains(email).should('be.visible');
    }


}