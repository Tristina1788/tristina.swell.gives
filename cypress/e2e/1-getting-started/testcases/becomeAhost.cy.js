import { HomePage } from "../Pages/homePage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";

let homePage = new HomePage();
let donationsTablePage =new DonationsTablePage();
let donationsAddressPage =new DonationsAddressPage();
let donationsRegisterTablePage =new DonationsRegisterTablePage();
let donationsPaymentPage =new DonationsPaymentPage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify become a host flow', () => {
    
    it('Verify information when become a host',()=>{
        cy.visit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsSelectedAsDefault(infors.tableItem, infors.tablePriceString);
        donationsTablePage.selectAmountItem(infors.amountTicket)
        donationsTablePage.verifySummaryAmount(infors.amountDonateTable, infors.tablePriceNumber);
        donationsTablePage.clickNextButton();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsRegisterTablePage.verifyEmailAdressIsDisplayed(randomEmail);
        donationsRegisterTablePage.clickNavigationTab('Your Table');
        donationsRegisterTablePage.verifyUserInformationInYourTableIsDisplayed(randomName, randomLastName, randomEmail);
        donationsRegisterTablePage.clickNavigationTab('Guest');
        donationsRegisterTablePage.verifyUserInformationInGuestTableIsDisplayed(randomName, randomLastName, randomEmail);
        let randomNameGuest = getRandomText();
        let randomLastNameGuest = getRandomText();
        let randomEmailGuest = getRandomEmail();
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest, randomLastNameGuest, randomEmailGuest);
        donationsRegisterTablePage.clickInviteGuestButton();
        donationsRegisterTablePage.verifyInviteSuccess(randomNameGuest, randomLastNameGuest, randomEmailGuest);
        donationsRegisterTablePage.clickCancelInviteGuestButton();
        donationsRegisterTablePage.verifyCancelInviteGuestSuccess();
        //cy.wait(60000);
        //cy.visit(infors.url);
        //homePage.verifyUserInTopFundraiser(randomName + ' ' + randomLastName,(infors.amountTicket));
        //homePage.verifyUserInTopSocial(randomName + ' ' + randomLastName,1);
        //homePage.verifyUserInTable(randomLastName + " Table",(infors.amountTicket))
    })

    it('Verify button Previous in become a host',()=>{
        cy.visit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsSelectedAsDefault(infors.tableItem, infors.tablePriceString);
        donationsTablePage.selectAmountItem(infors.amountTicket)
        donationsTablePage.verifySummaryAmount(infors.amountDonateTable, infors.tablePriceNumber);
        donationsTablePage.clickNextButton();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        //start script to verify previous button
        donationsPaymentPage.clickPreviousButton();
        donationsAddressPage.verifyAddressInforPage();
        donationsAddressPage.clickPreviousButton();
        donationsTablePage.verifyTableDonationPage();
        donationsTablePage.clickNextButton();
        donationsAddressPage.clickNextButton();
        //end script to verify previous button
        
    })

})

