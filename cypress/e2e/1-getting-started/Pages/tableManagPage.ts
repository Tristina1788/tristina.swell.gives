require("cypress-plugin-tab");
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
    addASeaBtn = 'Add a Seat/Ticket';
    cancelAddSeatBtn = 'No, leave the table alone!';
    yesAddSeatBtn = 'Yes, add it!';
    assignBtn = 'Assign';
   // guestRow = '//div[@class="modal-body"]//table[contains(@class,"table-responsive")]//tr[contains(@id,"guest-ticket")]';
    guestRow = '.modal-body';
    guestAddressBtn = '.fa-address-book-o';
    fnameInput ='[data-parsley-id="8"]';
    lnameInput ='[data-parsley-id="10"]';
    emailInputFundraiser ='[data-parsley-id="12"]';
    companyInput ='[data-parsley-id="14"]';
    groupSelection = '[data-parsley-id="16"]';
    unSelectGroup = '.search-choice-close';
    removeSeatBtn = '.remove-seat';
    removeFundraiserBtn = '.fa-unlink';
    guestBodyListRow = '.table-responsive >tbody >tr';
    getIframeDocument = () => {
        return cy
            .get('iframe.second-row')
            // Cypress yields jQuery element, which has the real
            // DOM element under property "0".
            // From the real DOM iframe element we can get
            // the "document" element, it is stored in "contentDocument" property
            // Cypress "its" command can access deep properties using dot notation
            // https://on.cypress.io/its
            .its('0.contentDocument').should('exist')
    }

    getIframeBody = () => {
        // get the document
        return this.getIframeDocument()
            // automatically retries until body is loaded
            .its('body').should('not.be.undefined')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            .then(cy.wrap)
    }

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
        cy.get(this.tableLabel).contains(name, {timeout: 5000}).click();

    }

    clickAddASeatButton(name:string){
        cy.wait(1000);
        cy.get('a').contains(this.addASeaBtn,{timeout:10000}).click();

    }

    clickDeleteButton(name:string){
        cy.get(this.searchInput).type(name);
        cy.get(this.deleteBtn).click();
        cy.wait(2000);
        cy.get('button').contains(this.confirmDeleteBtn,{timeout:10000}).click();
        cy.get('button').contains(this.okBtn,{timeout:10000}).click();

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

    verifyInforOfGuestDontExit(guestName : string, email : string){
        cy.get(this.guestAddressBtn).parents('tr').should('not.contain', guestName);
        cy.get(this.guestAddressBtn).parents('tr').should('not.contain', email);
    }

    verifyPopupAddingSeat(){
        cy.wait(1000);
        cy.get('p').contains('You will be adding an additional seat to the table!').should('be.visible');
        cy.get('button').contains(this.cancelAddSeatBtn).should('be.visible');
        cy.get('button').contains(this.yesAddSeatBtn).should('be.visible');
    }

    verifyPopupCancelSeat(){
        cy.get('p').contains('Your table was left alone.').should('be.visible');
    }

    clickCancelAddSeatBtn(){
       cy.get('.sweet-alert').find('button.cancel').contains(this.cancelAddSeatBtn).click({ multiple: true });
        
    }

    clickYesAddSeatBtn(){
        cy.wait(1000);
        cy.get('.sweet-alert').find('button.confirm').contains(this.yesAddSeatBtn).click({ multiple: true });
    }

    verifyAddedSeatConfirmation(){
        cy.get('p').contains('A new seat was added successfully!').should('be.visible');
    }

    clickOKButtonInPopupConfirm(){
        cy.wait(1000)
        cy.get('button').contains(this.okBtn,{timeout:5000}).click();
    }

    clickAddressGuestButton(){
        cy.wait(1000);
        cy.get(this.guestBodyListRow).last().children('td').children('button').first().click();
    }

    clickNewFundraiser(){
        cy.get('.fa-plus-circle').click();
    }

    clickSaveBtn(){
        cy.get('button').contains('Save').click();
    }

    clickAssignBtn() {
        cy.wait(1000)
        cy.get('button').contains(this.assignBtn,{timeout:5000}).click();
    }

    verifyRemoveSeatIsDisabled(isDisable: Boolean) {
        cy.wait(1000);
        switch(isDisable){
            case true:
                cy.get(this.guestBodyListRow).last().children('td').last().children(this.removeSeatBtn).should('have.attr', 'disabled', 'disabled');
                break;
            case false:
                cy.get(this.guestBodyListRow).last().children('td').last().children(this.removeSeatBtn).should('not.have.attr', 'disabled');
                break;
        }
    }

    verifyDeleteGuestSuccess(){
        cy.get(this.guestAddressBtn).should('not.exist');
    }

    getGuestNumber(){
        cy.get(this.guestBodyListRow).then((row)=>{
            return row.length;
        })
    }

    clickRemoveSeatBtn(){
        cy.get(this.guestBodyListRow).last().children('td').last().children(this.removeSeatBtn).click();
        cy.wait(2000)
        cy.get('.sweet-alert').find('button.confirm').contains(this.confirmDeleteBtn).click({ force: true });
    }

    clickRemoveFundraiserBtn() {
        cy.get(this.guestBodyListRow).last().children('td').last().children('button').click();
    }

    inputFundraiserTableForm(fname : string, lname : string, email : string,  company : string, group : string){
        cy.wait(3000);
        cy.get(this.fnameInput).clear();
        cy.get(this.fnameInput).type(fname);
        cy.get(this.lnameInput).clear();
        cy.get(this.lnameInput).type(lname);
        cy.get(this.companyInput).clear();
        cy.get(this.companyInput).type(company);
        cy.get(this.emailInputFundraiser).clear();
        if(email!='')
        cy.get(this.emailInputFundraiser).type(email);
        if(group == '')
            cy.get(this.unSelectGroup).click();
        else 
            cy.get(this.groupSelection).select(group,{force: true});
        
    }
}