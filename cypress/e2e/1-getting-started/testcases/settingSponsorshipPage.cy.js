import { HomePage } from "../Pages/homePage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { SponsorshipSettingPage } from "../Pages/sponsorshipSettingPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
let homePage = new HomePage();
let loginManagePage = new LoginManagePage();

let settingSetupPage = new SettingSetupPage();
let sponsorshipSettingPage = new SponsorshipSettingPage();
let sponsorshipPage = new SponsorshipPage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let pageTitle = getRandomText();
let sponsorTitle = getRandomText();
let sponsorLabel = getRandomText();
let randomName = getRandomText();
let randomLastName = getRandomText();
let randomEmail = getRandomEmail();
let randomPhone = getRandomNumber();


Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup sponsorship setting page', () => {

    it.only('setup sponsorship setting page with full input successfully', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingSponsorshipPage();
        sponsorshipSettingPage.inputSponsorshipForm(pageTitle, sponsorTitle, sponsorLabel);
        sponsorshipSettingPage.clickSaveBtn();
        sponsorshipSettingPage.verifySaveSuccessfully();  
        sponsorshipSettingPage.clickOKButton();
    })

    it.only('Verify sponsor setting can be applied in frontend successfully ', () => {
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorSettingCorrectly(pageTitle, sponsorTitle, sponsorLabel);
        sponsorshipPage.clickSponsorItem(infors.sponsorItemName);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.verifyPaymentPage();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionFinish();

    })

    it.only('setup sponsorship setting page with all empty input successfully', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingSponsorshipPage();
        sponsorshipSettingPage.inputSponsorshipForm("", "", "Thank you for considering a sponsorship.<br>Please select the sponsorship type from the menu.<br>We will follow up about the details of your sponsorship package including your company logo,<br>complimentary tickets and additional perks.");
        sponsorshipSettingPage.clickSaveBtn();
        sponsorshipSettingPage.verifySaveSuccessfully();  
        sponsorshipSettingPage.clickOKButton();
    })

    it.only('Verify sponsor setting can be applied in frontend successfully ', () => {
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorSettingCorrectly("", "Choose a Sponsorship", "Thank you for considering a sponsorship.");
        sponsorshipPage.clickSponsorItem(infors.sponsorItemName);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.verifyPaymentPage();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionFinish();

    })

})
