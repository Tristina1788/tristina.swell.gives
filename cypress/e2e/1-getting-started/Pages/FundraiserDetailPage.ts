export class FundraiserDetailPage{
    referalSelection ='[data-parsley-id="8"]';
    fnameInput ='[data-parsley-id="10"]';
    lnameInput ='[data-parsley-id="12"]';
    companyInput ='[data-parsley-id="14"]';
    emailInput ='[data-parsley-id="16"]';
    leadboardCheckbox ='[data-parsley-id="19"]';
    phoneInput ='[data-parsley-id="21"]';
    biderNumber ='[data-parsley-id="23"]';
    typeSelection = '[data-parsley-id="25"]';
    groupSelection = '[data-parsley-id="27"]';
    saveBtn = 'Save';
    closeBtn = 'Close';
    successText = 'Completed successfully!';
    confirmButton = '.confirm';
    unSelectGroup = '.search-choice-close';

    inputFundraiserForm(referal : string, fname : string, lname : string, company : string, email : string,  isShowLb : string, phone : string, bidNumber : string, type : string, group : string){
        cy.wait(3000);
        cy.get(this.referalSelection).select(referal,{force: true});
        cy.get(this.fnameInput).clear();
        cy.get(this.fnameInput).type(fname);
        cy.get(this.lnameInput).clear();
        cy.get(this.lnameInput).type(lname);
        cy.get(this.companyInput).clear();
        cy.get(this.companyInput).type(company);
        cy.get(this.emailInput).clear();
        if(email!='')
        cy.get(this.emailInput).type(email);
        if(isShowLb)
            cy.get(this.leadboardCheckbox).check();
        else
            cy.get(this.leadboardCheckbox).uncheck();
        cy.get(this.phoneInput).clear();
        cy.get(this.phoneInput).type(phone);
        cy.get(this.biderNumber).clear();
        cy.get(this.biderNumber).type(bidNumber);
        cy.get(this.typeSelection).select(type);
        if(group == '')
            cy.get(this.unSelectGroup).click();
        else 
            cy.get(this.groupSelection).select(group,{force: true});
        
    }

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click();
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