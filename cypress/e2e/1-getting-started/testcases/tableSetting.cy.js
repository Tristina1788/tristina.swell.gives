import { HomePage } from "../Pages/homePage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TableSettingPage } from "../Pages/tableSettingPage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { DonationsTablePage } from "../Pages/donationsTablePage"
import { getRandomText } from "./generalFunction.cy";

let homePage = new HomePage();
let loginManagePage = new LoginManagePage();
let tableSettingPage = new TableSettingPage();
let settingSetupPage = new SettingSetupPage();
let donationsTablePage = new DonationsTablePage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify setup Button General Setting page', () => {

    it.only('Verify setup Table Setting with Donation true and front end will update follow this setup', () => {
        let pageTitle = getRandomText();
        let tableType = getRandomText();
        let tableSection = getRandomText();
        let donationTitle = getRandomText();
        let orderSummary = getRandomText();
        let donationSummary = getRandomText();

        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingTablePage();
        tableSettingPage.inputGeneralTableSetting(pageTitle, tableType, tableSection, donationTitle, orderSummary, donationSummary, true)
        tableSettingPage.clickSaveButton();
        tableSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifySettingTableSuccessfully(pageTitle, tableType, tableSection, donationTitle, orderSummary, donationSummary, true);
    })

    it.only('Verify setup Table Setting with Donation false and front end will update follow this setup', () => {
        let pageTitle = getRandomText();
        let tableType = getRandomText();
        let tableSection = getRandomText();
        let donationTitle = getRandomText();
        let orderSummary = getRandomText();
        let donationSummary = getRandomText();

        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingTablePage();
        tableSettingPage.inputGeneralTableSetting(pageTitle, tableType, tableSection, donationTitle, orderSummary, donationSummary, false)
        tableSettingPage.clickSaveButton();
        tableSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifySettingTableSuccessfully(pageTitle, tableType, tableSection, donationTitle, orderSummary, donationSummary, false);
    })

    it.only('Verify setup Table Setting as default and front end will update follow this setup', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingTablePage();
        tableSettingPage.inputGeneralTableSetting('', '', '', '', '', '', true)
        tableSettingPage.clickSaveButton();
        tableSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifySettingTableSuccessfully();
    })

})
