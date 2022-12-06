import { isBuffer } from "cypress/types/lodash";

export class TransactionDetailManagePage {
    referralSelection = '#referral_id';
    newReferralBtn = '#attendeeButton';
    firstNameInput = '#fname';
    lastNameInput = '#lname';
    companyInput = '#company';
    emailInput = '#email';
    phoneInput = '#phone';
    donationSelection = '#type';
    amountInput = '#amount';
    honorOfInput = '[name="honorof"]';
    annonymousCheckBox = '#anonymous';
    transactionDesc = '#additional_info';
    saveBtn = 'Save';
    closeBtn = 'Close';

    fnameFundraiser = '#quick-fname';
    lnameFundraiser = '#quick-lname';
    companyFundraiser = '#quick-company';
    emailFundraiser = '#quick-attendee_email';
    LBFundraiserCb = '#show_on_leaderboard';
    numberFundraiser = '#quick-attendee_bidder';
    teamFundraiser = '#quick-team';
    saveFundraiserBtn = '[onclick="AttendeeManagement.quickAddAttendee()"]';
    OKBtn = 'OK';

    inputTranactionForm(referral: string, fnameTr: string, lnameTr: string, companyTr: string, emailTr: string, phoneTr : string, 
        donationType : string, amount : number, honorofTr : string, isAnonymous : boolean, note : string,
        fname: string, lname: string, company: string, email: string, isLB: boolean, number: string='', group: string='') {
        if (referral != '')
            cy.get(this.referralSelection).select(referral, { force: true });
        else {
            console.log("company : "+company);
            console.log("email : "+email);
            this.clickNewFReferalButton();
            this.inputNewReferal(fname, lname, company, email, isLB, number, group);
            this.clickSaveReferalButton();
            cy.wait(2000);
            this.clickOKButton();
        }
        cy.get(this.firstNameInput).clear();
        if(fnameTr != '')
            cy.get(this.firstNameInput).type(fnameTr);

        cy.get(this.lastNameInput).clear();
        if(lnameTr != '')
            cy.get(this.lastNameInput).type(lnameTr);

        cy.get(this.companyInput).clear();
        if(company != '')
            cy.get(this.companyInput).type(company);
        
        cy.get(this.emailInput).clear();
        if(email != '')
            cy.get(this.emailInput).type(email);

        cy.get(this.phoneInput).clear();
        if(phoneTr != '')
            cy.get(this.phoneInput).type(phoneTr);
            
        cy.get(this.donationSelection).select(donationType)
        cy.get(this.amountInput).clear();
        cy.get(this.amountInput).type(amount+'');

        cy.get(this.honorOfInput).clear();
        if(honorofTr != '')
        cy.get(this.honorOfInput).type(honorofTr);

        if(isAnonymous)
            cy.get(this.annonymousCheckBox).check();
        else
            cy.get(this.annonymousCheckBox).uncheck();

        cy.get(this.transactionDesc).clear();
        if(this.transactionDesc != '')
            cy.get(this.transactionDesc).type(note);

    }

    inputNewReferal(fname: string, lname: string, company: string , email: string, isLB: boolean, number: string  = '', group: string = '') {
        cy.get(this.fnameFundraiser).clear();
        if (fname != '')
            cy.get(this.fnameFundraiser).type(fname);
        if (lname != '')
            cy.get(this.lnameFundraiser).type(lname);
        if (company != '')
            cy.get(this.companyFundraiser).type(company);
        if (email != '')
            cy.get(this.emailFundraiser).type(email);
        if (isLB == true)
            cy.get(this.LBFundraiserCb).check();
        else
            cy.get(this.LBFundraiserCb).uncheck();
        if (number != '')
            cy.get(this.numberFundraiser).type(number);
        if (group != '')
            cy.get(this.teamFundraiser).select(group);
    }

    clickCloseButton() {
        cy.get(this.closeBtn).click({ force: true });
    }

    clickSaveButton() {
        cy.get('button').contains(this.saveBtn).click({ force: true });
        cy.reload();
    }

    clickNewFReferalButton() {
        cy.get(this.newReferralBtn).click({ force: true });
    }

    clickSaveReferalButton() {
        cy.get(this.saveFundraiserBtn).click({ force: true });
    }

    clickOKButton() {
        cy.get('button').contains(this.OKBtn).click({ force: true });
    }

}