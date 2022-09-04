export class CouponSetupPage {
    codeCP = '#code';
    discountCp = '#discount';
    saveBtn = 'Save';
    closeBtn = 'Close';

    inputFormCoupon(code :string, discount : number){
        cy.wait(2000);
        cy.get(this.codeCP).clear();
        cy.get(this.codeCP).type(code);
        cy.get(this.discountCp).clear();
        cy.get(this.discountCp).type(discount+'');
    }

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click();
    }


}