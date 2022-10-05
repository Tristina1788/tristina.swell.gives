import { HomePage } from "../Pages/homePage";
import { DetailSetupPage } from "../Pages/detailSetupPage";
import { getCurrentDateTime, getCurrentTime, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let loginManagePage =new LoginManagePage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let detailSetupPage =new DetailSetupPage();
before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify setup Detail page', () => {
    
    it.only('Verify set up page in detail page and front end will update follow this setup',()=>{
        let noneProfitName = getRandomText();
        let name = getRandomText();
        let desc = getRandomText();
        let dateCurrent = getCurrentDateTime();
        let time = getCurrentTime();
        let location = getRandomLocation();
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
        
        registerPage.verifyNonProfitNameCorrect(noneProfitName);
        registerPage.verifyInforEventCorrect(dateCurrent,time,location);
        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        thankYouPage.verifyNameSetupCorrect(name);
        thankYouPage.verifyNonProfitNameSetupCorrect(noneProfitName);
        
    })

})
