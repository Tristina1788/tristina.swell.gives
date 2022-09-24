export class GroupSetupPage{
    groupName = '[id="name"]';
    saveBtn = 'Save';
    closeBtn = 'Close';
    okBtn = '.confirm';
    saveSuccessTxt = 'Completed successfully!';

    inputGroupName(name: string){
        cy.wait(2000);
        cy.get(this.groupName).clear();
        cy.get(this.groupName).type(name);
    }

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click();
    }

    clickOkBtn(){
        cy.get(this.okBtn).click();
    }

    VerifyUpdateFormSuccess(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessTxt).should('be.visible');
    }
}