export class SponsorManageSetupPage{
    editBtn = '.fa-edit';
    deleteBtn = '.fa-remove';
    tableList = '#eventsponsors-list';
    confirmDeleteBtn = 'Yes, delete it!';
    successMsg = 'Completed successfully!'; //p
    okBtn = 'OK';
    refreshBtn = '.fa-refresh';
    addBtn = '.fa-plus-square';
    paginationSelection = '[aria-controls="eventcoupons-list"]';
    searchInput = '[type="search"]';
    confirmBtn = '.confirm';
    logoImage = '.img-square';
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

    verifySposorIsExist(name:string, link : string, order : number){
        
        cy.wait(2000);
        let linklogo = '';
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
        .next().contains(link).next('td').contains(order).next('td').children('img').invoke('attr', 'src')
        .then(linklog => {
            const link = linklog?.substring(linklog.length-29,linklog.length); //419/1661783284-76906394.jpg
            linklogo = link+'';
            cy.writeFile('./data/images.json',{imageLogoSponsor:linklogo})
            console.log("link image"+linklogo);
        })
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name)
        .next().contains(link).should('be.visible');
       
    }

    verifyCSposorPageIsNotExist(name:string){
        cy.wait(2000);
        cy.get(this.searchInput).type(name);
        cy.get(this.tableList).children('tbody').children('tr').children('td').contains(name).should('not.exist');
    }

    getNameLogoImage(){
        let linklogo = '';
        cy.get('h4').contains(this.logoImage).invoke('attr', 'src')
        .then(linklog => {
            const link = linklog?.substring(linklog.length-29,linklog.length); //419/1661783284-76906394.jpg
            linklogo = link+'';
            cy.writeFile('./data/images.json',{imageLogoSponsor:linklogo})
            console.log("link image"+linklogo);
        })

    }

    visit(url: string){
        cy.visit(url);
    }
}