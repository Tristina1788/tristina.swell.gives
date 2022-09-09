import { HomePage } from "../Pages/homePage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { TicketsSettingPage } from "../Pages/ticketsSettingPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { DonationsAmountPage } from "../Pages/donationsAmountPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { TicketPage } from "../Pages/ticketPage";



let homePage = new HomePage();
let loginManagePage = new LoginManagePage();
let ticketPage = new TicketPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let settingSetupPage = new SettingSetupPage();
let ticketsSettingPage = new TicketsSettingPage();
let donationsAmountPage = new DonationsAmountPage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();
let pageTitle = getRandomText();
let amount = Math.floor(Math.random() * 20) + 1;
let title = getRandomText();
let name = getRandomText();
let promo = getRandomText();
let orderLb = getRandomText();
let donaLb = getRandomText();
let teamselectiont = getRandomText();
let teamCreatetitle = getRandomText();
let donatitle = getRandomText();


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

describe('Verify setup setting - ticket page', () => {
    it.only('Verify update setting - ticket page successfully', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingTicketPage();
        
        ticketsSettingPage.inputTicketSetingForm(title, name, promo,teamselectiont, teamCreatetitle, donatitle, true, true, orderLb, donaLb);
        ticketsSettingPage.clickSaveButton();
        ticketsSettingPage.verifySaveSuccessfully();  
        ticketsSettingPage.clickOKButton();
    })

    it('Verify update setting enable apply to ticket frontend with all options ', () => {
        cy.forceVisit(infors.url);
        
        // let randomName = getRandomText();
        // let randomLastName = getRandomText();
        // let randomEmail = getRandomEmail();
        // let randomPhone = getRandomNumber();
        // homePage.clickPurchaseTickets();
        // ticketPage.verifyIsScreenSelectTickets();
        // ticketPage.selectTestTicket(0);
        // ticketPage.verifyFormInforTc(0);
        // ticketPage.inputTicketSetingForm(title, name, promo,teamselectiont, teamCreatetitle, donatitle, true, true, orderLb, donaLb);
        // ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        // ticketPage.clickAddTicket(0);
        // ticketPage.verifyTicketIsAdded(0, randomEmail);
        // ticketPage.selectAmountItem('$'+infors.amountTicket);
        // ticketPage.verifySummaryAmount(true,false,infors.amountTicket);
        // ticketPage.clickButtonNext();
        // donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
        //     user.zip);
        // donationsAddressPage.clickNextButton();
        // donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        // donationsPaymentPage.clickPurchase();
        // donationsPaymentPage.verifyTransactionTicketsFinish();
    })

    it.only('update setting - ticket to default page successfully', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingTicketPage();
        ticketsSettingPage.inputTicketSetingForm("", "", "", "", "", "",true, true, "", "");
        ticketsSettingPage.clickSaveButton();
        ticketsSettingPage.verifySaveSuccessfully();  
        ticketsSettingPage.clickOKButton();

    })
})
