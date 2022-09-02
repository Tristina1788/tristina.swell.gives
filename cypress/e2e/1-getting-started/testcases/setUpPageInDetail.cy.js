import { HomePage } from "../Pages/homePage";
import { DetailSetupPage } from "../Pages/detailSetupPage";
import { getCurrentDateTime, getCurrentTime, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TicketPage } from "../Pages/ticketPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let loginManagePage =new LoginManagePage();
let ticketPage = new TicketPage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let detailSetupPage =new DetailSetupPage();
describe('Verify setup Detail page', () => {
    
    it('Verify set up page in detail page and front end will update follow this setup',()=>{
        let noneProfitName = getRandomText();
        let name = getRandomText();
        let desc = getRandomText();
        let dateCurrent = getCurrentDateTime();
        let time = getCurrentTime();
        let location = getRandomLocation();
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        detailSetupPage.visit(infors.urlManage+'events/'+infors.idProject+'/details');
        detailSetupPage.inputNonProfitNameDetails(noneProfitName);
        detailSetupPage.inputNameEventDetails(name);
        detailSetupPage.inputDescriptionEventDetails(desc);
        detailSetupPage.inputDateEventDetails(dateCurrent);
        detailSetupPage.inputTimeEventDetails(time);
        detailSetupPage.inputLocationEventDetails(location);
        detailSetupPage.clickSaveBtn();
        detailSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        
        detailSetupPage.VerifyUpdateCorrectlyInfors(noneProfitName, name, desc, dateCurrent, time, location, infors.timezone);
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.verifyInforEventCorrect(dateCurrent,time,location);
        homePage.clickBecomeAFundraiser();
        
        registerPage.verifyRegisterPage();
        registerPage.verifyNonProfitNameCorrect(noneProfitName);
        registerPage.verifyInforEventCorrect(dateCurrent,time,location);
        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        thankYouPage.verifyNameSetupCorrect(name);
        thankYouPage.verifyNonProfitNameSetupCorrect(noneProfitName);
        cy.forceVisit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.verifyNameSetupCorrect(name);
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.verifyNameSetupCorrect(name);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.verifyNameSetupCorrect(name);
    })

})
