export class TableDetailPage{
    nameInput = '#name';
    typedll = '#ddlType';
    tableNumberInput = '#table_number';
    hostNameInput = '#created_first_name';
    hostLNameInput = '#created_last_name';
    hostEmailInput = '#created_email';
    participatingSelection = '#create_attendee';
    saveBtn = 'button[name="save+only"]';
    closeBtn = 'Close';
    successText = 'Table/Team created!';
    confirmButton = '.confirm';

    inputTableForm(name : string, type : string, number : string, hfname : string, hlname : string,  hemail : string, isParticipate : boolean){
        cy.wait(3000);
        cy.get(this.nameInput).clear();
        cy.get(this.nameInput).type(name);
        cy.get(this.typedll).select(type);
        cy.get(this.tableNumberInput).clear();
        cy.get(this.tableNumberInput).type(number);
        cy.get(this.hostNameInput).clear();
        cy.get(this.hostNameInput).type(hfname);
        cy.get(this.hostLNameInput).clear();
        cy.get(this.hostLNameInput).type(hlname);
        cy.get(this.hostEmailInput).clear();
        cy.get(this.hostEmailInput).type(hemail);
    }

    clickSaveBtn(){
        cy.get(this.saveBtn).click();
    }

    clickCloseBtn(){
        cy.get('button').contains(this.closeBtn).click({force: true});
    }

    verifySaveSuccess(){
        cy.wait(2000);
        cy.get('p').contains(this.successText).should('be.visible');
    }

    clickConfirmButton(){
        cy.get(this.confirmButton).click({force: true});
    }

    
}