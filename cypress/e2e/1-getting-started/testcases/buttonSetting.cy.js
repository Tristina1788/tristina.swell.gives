import { HomePage } from "../Pages/homePage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { ButtonSettingPage } from "../Pages/buttonSettingPage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { getRandomText } from "./generalFunction.cy";

let homePage = new HomePage();
let loginManagePage =new LoginManagePage();
let buttonSettingPage = new ButtonSettingPage();
let settingSetupPage = new SettingSetupPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
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
