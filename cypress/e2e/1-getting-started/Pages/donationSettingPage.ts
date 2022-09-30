export class DonationSettingPage {
    titlePage = 'Page Title';
    suggestedAmount = 'Suggested amounts (Comma separated amounts)';
    enableAnonymousDona = 'Enable Anonymous Donations';
    enableFeeCovering = 'Enable Fee Covering (ability to choose to cover the donations fees)';
    enablePledge = 'Enable Pledging';
    enableRecurring = 'Enable Recurring donations (Only works if your gateway supports it)';
    enableFee = 'Enable Fee Covering (ability to choose to cover the donations fees)';
    enableHonor = 'Enable Honoring of persons';
    honorTitle = 'Honor Person Title';
    honorDesc = 'Honor Person Description';
    honorSelectionTitle = 'Honor Person Selection Title';
    honorSelectionPlacehoder = 'Honor Person Selection Placeholder';
    honorSelectionErrorMsg = 'Honor Selection Error Message';
    enableGifCredit = 'Enable Gift Crediting';
    requireGiftCredit = 'Require Gift Crediting';
    creditPersionTitle = 'Credit Person Title';
    creditPersionSubtitle = 'Credit Person Subtitle';
    creditPersionDesc = 'Credit Person Description';
    saveButton = 'Save Changes';
    saveSuccessText = 'Saved successfully!';
    defaultAmount = '50,75,100,250,500,1000';

    inputFormDonationSetting(title: string, amount: number, isAnonymous: boolean, isPledge: boolean, isRec: boolean, issHonor: boolean, isGiftCredit: boolean,isFee :boolean,
        htitle: string = "", hdes: string = "", hstitle: string = "", hsPlaholder: string = "", errorMsg: string = "",
        isRequireCredit: boolean = false, ctitle: string = "", cSubtitle: string = "", cDecs: string = "") {

        cy.get('label').contains(this.titlePage).next('input').clear();
        if(title != "")
            cy.get('label').contains(this.titlePage).next('input').type(title);
        cy.get('label').contains(this.suggestedAmount).next('input').clear();
        if(amount != 0)
            cy.get('label').contains(this.suggestedAmount).next('input').type(this.defaultAmount+',' + amount);
        if (isAnonymous)
            cy.get('label').contains(this.enableAnonymousDona).next('input').check();
        else cy.get('label').contains(this.enableAnonymousDona).next('input').uncheck();

        if (isPledge)
            cy.get('label').contains(this.enablePledge).next('input').check();
        else cy.get('label').contains(this.enablePledge).next('input').uncheck();

        if (isRec)
            cy.get('label').contains(this.enableRecurring).next('input').check();
        else cy.get('label').contains(this.enableRecurring).next('input').uncheck();
        if(isFee)
            cy.get('label').contains(this.enableFee).next('input').check();
        else cy.get('label').contains(this.enableFee).next('input').uncheck();
        if (issHonor){
            cy.get('label').contains(this.enableHonor).next('input').check();
            cy.get('label').contains(this.honorTitle).next('input').clear();
            if(htitle != "")
                cy.get('label').contains(this.honorTitle).next('input').type(htitle);
            cy.get('label').contains(this.honorDesc).next('textarea').clear();
            if(hdes != "")
                cy.get('label').contains(this.honorDesc).next('textarea').type(hdes);
            cy.get('label').contains(this.honorSelectionTitle).next('input').clear();
            if(hstitle != "")
                cy.get('label').contains(this.honorSelectionTitle).next('input').type(hstitle);
            cy.get('label').contains(this.honorSelectionPlacehoder).next('input').clear();
            if(hsPlaholder != "")
                cy.get('label').contains(this.honorSelectionPlacehoder).next('input').type(hsPlaholder);
            cy.get('label').contains(this.honorSelectionErrorMsg).next('input').clear();
            if(errorMsg != "")
                cy.get('label').contains(this.honorSelectionErrorMsg).next('input').type(errorMsg);
        }    
        else cy.get('label').contains(this.enableHonor).next('input').uncheck();

        if (isGiftCredit){
            cy.get('label').contains(this.enableGifCredit).next('input').check();
            if(isRequireCredit)
                cy.get('label').contains(this.requireGiftCredit).next('input').check();
            else
                cy.get('label').contains(this.requireGiftCredit).next('input').uncheck();
            cy.get('label').contains(this.creditPersionTitle).next('input').clear();
            if(ctitle != "")
                cy.get('label').contains(this.creditPersionTitle).next('input').type(ctitle);
            cy.get('label').contains(this.creditPersionSubtitle).next('input').clear();
            if(cSubtitle != "")
                cy.get('label').contains(this.creditPersionSubtitle).next('input').type(cSubtitle);
            cy.get('label').contains(this.creditPersionDesc).next('input').clear();
            if(cDecs != "")
                cy.get('label').contains(this.creditPersionDesc).next('input').type(cDecs);
            
        } else cy.get('label').contains(this.enableGifCredit).next('input').uncheck();

            
    }

    clickSaveButton(){
        cy.get('button').contains(this.saveButton).click();
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }
}