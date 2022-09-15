import { HomePage } from "../Pages/homePage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { DonationSettingPage } from "../Pages/donationSettingPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { DonationsAmountPage } from "../Pages/donationsAmountPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
let homePage = new HomePage();
let loginManagePage = new LoginManagePage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let settingSetupPage = new SettingSetupPage();
let donationSettingPage = new DonationSettingPage();
let donationsAmountPage = new DonationsAmountPage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();
let pageTitle = getRandomText();
let amount = Math.floor(Math.random() * 20) + 1;
let hntitle = getRandomText();
let hndesc = getRandomText();
let hnselectiontitle = getRandomText();
let hnselectionplacehoder = getRandomText();
let hnselectionpMsg = getRandomText();
let ctitle = getRandomText();
let cSubtitle = getRandomText();
let cdesc = getRandomText();
let hornorName = getRandomText();
Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

if(amount %2 == 0) amount= amount+1;

describe('Verify setup setting - donation page', () => {
    it.only('Verify update setting - donation page successfully', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingDonationPage();
        donationSettingPage.inputFormDonationSetting(pageTitle,amount,true,true,true,true,true,true,hntitle,hndesc,hnselectiontitle,hnselectionplacehoder,
            hnselectionpMsg,true,ctitle,cSubtitle,cdesc);
        donationSettingPage.clickSaveButton();
        donationSettingPage.verifySaveSuccessfully();  

    })

    it.only('Verify update setting enable apply to frontend with all options ', () => {
       
        cy.forceVisit(infors.url);
        
        homePage.clickGiveNowButton();
        
        donationsAmountPage.verifyFormApplyFromSetting(pageTitle,amount,true,true,true,true,true,true,hntitle,hndesc,hnselectiontitle,hnselectionplacehoder,
            hnselectionpMsg,true,ctitle,cSubtitle,cdesc);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        donationsAmountPage.selectFee(amount);
        donationsAmountPage.verifyFeeSelectionCorrect(amount);
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.selectfullFillGiftLater();
        donationsAmountPage.inputDDLCredit();
        donationsAmountPage.inputHonorInfor(hornorName)
        donationsAmountPage.verifyWarningFullFillShow();
        donationsAmountPage.inputFormFullFillLater(randomName, randomLastName, randomEmail, randomPhone);
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickPledgeButton();
        donationsAmountPage.verifyShowThankYouPledge();
     })

     it.only('Verify update setting enable apply to frontend with no option full fill later ', () => {
        cy.forceVisit(infors.url);
        
        homePage.clickGiveNowButton();
        
        donationsAmountPage.verifyFormApplyFromSetting(pageTitle,amount,true,true,true,true,true,true,hntitle,hndesc,hnselectiontitle,hnselectionplacehoder,
            hnselectionpMsg,true,ctitle,cSubtitle,cdesc);
        donationsAmountPage.selectFee(amount);
        donationsAmountPage.verifyFeeSelectionCorrect(amount);
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.inputDDLCredit();
        donationsAmountPage.inputHonorInfor(hornorName)
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, user.email, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCard(infors.creditCardNumber, user.firstName, infors.creditCardVCV);
        
        donationsPaymentPage.clickDonateButton();
        donationsPaymentPage.verifyTransactionFinish();
     })

     it.only('Verify update setting - donation page with all selection to false successfully', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingDonationPage();
        donationSettingPage.inputFormDonationSetting(pageTitle,amount,false,false,false,false,false,false,hntitle,hndesc,hnselectiontitle,hnselectionplacehoder,
            hnselectionpMsg,false,ctitle,cSubtitle,cdesc);
        donationSettingPage.clickSaveButton();
        donationSettingPage.verifySaveSuccessfully();  

    })

    
    it.only('Verify update setting enable apply to frontend with all selection to false ', () => {
        cy.forceVisit(infors.url);
        homePage.clickGiveNowButton();
        donationsAmountPage.verifyFormApplyFromSetting(pageTitle,amount,false,false,false,false,false,false,hntitle,hndesc,hnselectiontitle,hnselectionplacehoder,
            hnselectionpMsg,false,ctitle,cSubtitle,cdesc);
        
     })

     it.only('Back to setting - donation page with default setting ', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingDonationPage();
        donationSettingPage.inputFormDonationSetting("",0,true,true,true,true,true,true,"","","","",
            "",false,"","","");
        donationSettingPage.clickSaveButton();
        donationSettingPage.verifySaveSuccessfully();  

    })

})
