import { HomePage } from "../Pages/homePage";
import { DetailSetupPage } from "../Pages/detailSetupPage";
import { getCurrentDateTime, getCurrentTime, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TicketPage } from "../Pages/ticketPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { ButtonSettingPage } from "../Pages/buttonSettingPage";
import { SettingSetupPage } from "../Pages/settingSetupPage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let loginManagePage =new LoginManagePage();
let ticketPage = new TicketPage();
let donationsAddressPage = new DonationsAddressPage();
let buttonSettingPage = new ButtonSettingPage();
let settingSetupPage = new SettingSetupPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let detailSetupPage =new DetailSetupPage();
let giveNowLLb = getRandomText();
let purchaseLb = getRandomText();
let becomeHostLb = getRandomText();
let becomeFundraiser = getRandomText();
let becomeSponsor = getRandomText();
describe('Verify setup Button General Setting page', () => {
    
    it.only('Verify setup Button Setting with fundraiser true and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingButtonPage();
        buttonSettingPage.inputGeneralButtonSetting(giveNowLLb, purchaseLb, becomeHostLb, becomeFundraiser,becomeSponsor);
        buttonSettingPage.clickSaveButton();
        buttonSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingButtonSuccessfully(giveNowLLb, purchaseLb, becomeHostLb, becomeFundraiser,becomeSponsor);
       
    })

    it.only('Verify setup Button Setting with fundraiser false and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingButtonPage();
        buttonSettingPage.inputGeneralButtonSetting(giveNowLLb, purchaseLb, becomeHostLb, becomeFundraiser,becomeSponsor,false);
        buttonSettingPage.clickSaveButton();
        buttonSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingButtonSuccessfully(giveNowLLb, purchaseLb, becomeHostLb, becomeFundraiser,becomeSponsor,false);
       
    })

    it.only('Verify setup Button Setting as default and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingButtonPage();
        buttonSettingPage.inputGeneralButtonSetting("", "", "", "","",true);
        buttonSettingPage.clickSaveButton();
        buttonSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingButtonSuccessfully("GIVE NOW", "Purchase Tickets", "BECOME A HOST", "BECOME A FUNDRAISER","BECOME A SPONSOR",true);
       
    })

})
