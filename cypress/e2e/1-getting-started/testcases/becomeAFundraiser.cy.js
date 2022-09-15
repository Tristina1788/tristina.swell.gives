import { HomePage } from "../Pages/homePage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify Become A fundraiser flow', () => {
    
    it.only('Verify information when become a fundraiser ',()=>{
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickBecomeAFundraiser();
        registerPage.verifyRegisterPage();
        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        thankYouPage.clickFundraiserUserLinks(randomName, randomLastName);

    })
})
