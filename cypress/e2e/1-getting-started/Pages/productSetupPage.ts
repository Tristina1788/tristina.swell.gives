export class ProductSetupPage {
    typeProd = '#type';
    isActiveCheckBox = '#active';
    isHiddenCheckBox = '#hide_publicly';
    discountCp = '#discount';
    quantityAvailable = '#quantity_available';
    tkPerTB ='#product_quantity';
    tkTypeTB =  '#product_id';
    nameProd = '#name';
    priceProd = '#cost';
    saveBtn = 'Save';
    closeBtn = 'Close';

    inputProductForm(type : string, name : string, isActive : boolean, isHidden : boolean, price : number, maxPro : number, ticketPerTB : number = 0, tkType : string = ""){
        cy.wait(2000);
        cy.get(this.typeProd).select(type);
        if(isActive)
            cy.get(this.isActiveCheckBox).check();
        else cy.get(this.isActiveCheckBox).uncheck();
        if(isHidden)
            cy.get(this.isHiddenCheckBox).check();
        else 
            cy.get(this.isHiddenCheckBox).uncheck();
        cy.get(this.quantityAvailable).clear();
        cy.get(this.quantityAvailable).type(maxPro+'');

        if(ticketPerTB > 0){
        cy.get(this.tkPerTB).clear();
        cy.get(this.tkPerTB).type(ticketPerTB+'');
        }

        if(tkType!= "")
            cy.get(this.tkTypeTB).select(tkType);

        cy.get(this.nameProd).clear();
        cy.get(this.nameProd).type(name);
        cy.get(this.priceProd).clear();
        cy.get(this.priceProd).type(price+'');
    }

    editProductForm( name : string, isActive : boolean, isHidden : boolean, price : number, maxPro : number, ticketPerTB : number = 0, tkType : string = ""){
        cy.wait(2000);
        if(isActive)
            cy.get(this.isActiveCheckBox).check();
        else cy.get(this.isActiveCheckBox).uncheck();
        if(isHidden)
            cy.get(this.isHiddenCheckBox).check();
        else 
            cy.get(this.isHiddenCheckBox).uncheck();
        cy.get(this.quantityAvailable).clear();
        cy.get(this.quantityAvailable).type(maxPro+'');

        cy.get(this.nameProd).clear();
        cy.get(this.nameProd).type(name);
        cy.get(this.priceProd).clear();
        cy.get(this.priceProd).type(price+'');

        if(ticketPerTB > 0){
        cy.get(this.tkPerTB).clear();
        cy.get(this.tkPerTB).type(ticketPerTB+'');
        }

        if(tkType!= "")
            cy.get(this.tkTypeTB).select(tkType);
    }

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click();
    }
}