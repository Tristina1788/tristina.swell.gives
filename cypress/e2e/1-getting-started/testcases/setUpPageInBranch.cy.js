import { HomePage } from "../Pages/homePage";
import { BranchSetupPage } from "../Pages/branchSetupPage";
import { getCurrentDateTime, getCurrentTime, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TicketPage } from "../Pages/ticketPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAmountPage } from "../Pages/donationsAmountPage";
import { UsersPage } from "../Pages/usersPage";
import { TablePage } from "../Pages/tablePage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let loginManagePage =new LoginManagePage();
let ticketPage = new TicketPage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();
let sponsorshipPage =new SponsorshipPage();
let donationsTablePage =new DonationsTablePage();
let donationsAmountPage =new DonationsAmountPage();
let usersPage =new UsersPage();
let tablePage =new TablePage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let branchSetupPage =new BranchSetupPage();
before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});

describe('Verify setup branch page', () => {
    
    it.only('Verify set up in branch page successfully',()=>{
        branchSetupPage.visit(infors.urlManage+'events/'+infors.idProject+'/branding');
        branchSetupPage.verifyHaveAllUploadImages();
        branchSetupPage.verifyUnableToUploadWrongSizeImage();
        branchSetupPage.verifyEnableToUploadCorrectSizeImage();
        branchSetupPage.clickSaveBtn();
        branchSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        branchSetupPage.getImageHeaderSetupInBranding();
       // cy.forceVisit(infors.url);
       // homePage.verifyImageHeaderSetupCorrectInBranding();
    })

    it.only('Verify set up page in branch page and image header and logo will update follow this setup',()=>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.forceVisit(infors.url);
        homePage.verifyImageHeaderSetupCorrectInBranding();
        homePage.verifyImageLogoSetupCorrectInBranding();

        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickBecomeAFundraiser();
        
        //registerPage.verifyRegisterPage();
        registerPage.verifyImageHeaderSetupCorrectInBranding();
        registerPage.verifyImageLogoSetupCorrectInBranding();

        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        thankYouPage.verifyImageHeaderSetupCorrectInBranding();
        thankYouPage.verifyImageLogoSetupCorrectInBranding();

        cy.forceVisit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyImageHeaderSetupCorrectInBranding();
        ticketPage.verifyImageLogoSetupCorrectInBranding();

        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.verifyImageHeaderSetupCorrectInBranding();
        donationsAddressPage.verifyImageLogoSetupCorrectInBranding();

        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.verifyImageHeaderSetupCorrectInBranding();
        donationsPaymentPage.verifyImageLogoSetupCorrectInBranding();

        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifyImageHeaderSetupCorrectInBranding();
        sponsorshipPage.verifyImageLogoSetupCorrectInBranding();

        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyImageHeaderSetupCorrectInBranding();
        donationsTablePage.verifyImageLogoSetupCorrectInBranding();
        
        cy.forceVisit(infors.url);
        homePage.clickGiveNowButton();
        donationsAmountPage.verifyImageHeaderSetupCorrectInBranding();
        donationsAmountPage.verifyImageLogoSetupCorrectInBranding();

    })

    it.only('Verify set up page in branch page and image profile header will update to user and table page follow this setup',()=>{
       
        cy.forceVisit(infors.url);
        homePage.clickFirstUserInTopFundraiser();
        usersPage.verifyImageHeadergoSetupCorrectInBranding();
        cy.visit(infors.url);
        homePage.clickFirstTableInTableBoard();
        tablePage.verifyImageHeadergoSetupCorrectInBranding();

    })

})
