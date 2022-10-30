import { HomePage } from "../Pages/homePage";
import { SponsorSetupPage } from "../Pages/sponsorSetupPage";
import { SponsorManageSetupPage } from "../Pages/sponsorManageSetupPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
let homePage = new HomePage();
let loginManagePage = new LoginManagePage();

const infors = require('../utils/infor.js')
let sponsorSetupPage = new SponsorSetupPage();
let sponsorManageSetupPage = new SponsorManageSetupPage();
let sponsorshipPage = new SponsorshipPage();
const user = require('../../../fixtures/address.json')
let sponsorName = getRandomText();
let randomeText =  getRandomText();
let sponsorURL = 'https://secure.swell.gives/tristina/'+randomeText;

before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify setup product page for sponsor ', () => {

    it.only('Verify create product page for  sponsor - product successfully', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/sponsors');

        sponsorManageSetupPage.clickAddBtn();
        sponsorSetupPage.inputSponsorFormSetupPage(sponsorName,2,sponsorURL,'./data/img_test/logo2.jpg');
        sponsorSetupPage.clickSaveBtn();
        sponsorSetupPage.clickOKButton();
        sponsorManageSetupPage.verifySposorIsExist(sponsorName,sponsorURL,2);
    })

    it.only('Verify sponsor product can be used in frontend successfully ', () => {
        cy.wait(3000);
        cy.forceVisit(infors.url);
        homePage.verifySponsorSetupCorrectly(sponsorURL);

    })


    it.only('Verify delete sponsor product page successfully and the code can not be used for frontend', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/sponsors');
        sponsorManageSetupPage.clickDeleteButton(sponsorName);
        sponsorManageSetupPage.clickOKButton();
        sponsorManageSetupPage.verifyCSposorPageIsNotExist(sponsorName);
        cy.forceVisit(infors.url);
        homePage.verifySponsorIsNotSetup();
    })
})
