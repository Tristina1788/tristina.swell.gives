import { HomePage } from "../Pages/homePage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { UsersPage } from "../Pages/usersPage";

let homePage = new HomePage();
let sponsorshipPage =new SponsorshipPage();
let usersPage =new UsersPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify Choose a sponsorship flow', () => {
    
    it('Verify information when Choose a sponsorship',()=>{
        cy.visit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.clickSponsorItem(infors.sponsorItemName);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionFinish();
        usersPage.verifyTheUsersIsSponsor(infors.url+'/users/'+infors.personRecieveCreditPage,randomName + ' '+randomLastName);
    })

})

