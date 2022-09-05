import { HomePage } from "../Pages/homePage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { EmailPage } from "../Pages/emailPage";

let homePage = new HomePage();
let donationsTablePage = new DonationsTablePage();
let donationsAddressPage = new DonationsAddressPage();
let donationsRegisterTablePage = new DonationsRegisterTablePage();
let donationsPaymentPage = new DonationsPaymentPage();
let emailPage = new EmailPage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let inboxId;
let emailAddress;
describe('Verify become a host flow', () => {

    it('Verify information when become a host and verify payment for invalid infor and valid infor', () => {
        cy.forceVisit(infors.url);
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
        donationsPaymentPage.inputCreditCardNumber(infors.creditCardNumber);
        donationsPaymentPage.verifyCreditCardVCVIsInvalid();
        donationsPaymentPage.verifyPurchaseButtonDisable();
        donationsPaymentPage.inputCreditCardTicket(infors.wrongCreditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.verifyCreditCardNumberIsInvalid();
        donationsPaymentPage.verifyPurchaseButtonDisable();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.inputExpiredYear("2022");
        donationsPaymentPage.verifyPurchaseButtonDisable();
        donationsPaymentPage.inputExpiredYear("2023");

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

    it('Verify information when become a host and enable to send invitation to email', () => {
        cy.forceVisit(infors.url);
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
        let countEmail = 0;
        // cy.createInbox().then(inbox => {
        //     console.log('Test message');
        //     // verify a new inbox was created
        //     assert.isDefined(inbox)

        //     // save the inboxId for later checking the emails
        //     inboxId = inbox.id
        //     emailAddress = inbox.emailAddress;
        //     console.log("inbox id: " + inboxId);
        //     donationsRegisterTablePage.inputGuestInformation(randomNameGuest, randomLastNameGuest, emailAddress);
        //     donationsRegisterTablePage.clickInviteGuestButton();
        //     cy.waitForLatestEmail(inboxId, 60000).then(latestEmail => {
        //         console.log(latestEmail.from);
        //         expect(latestEmail.from).to.eql('info@swellfundraising.com');
        //     });

        //     on("task", {
        //         "gmail:check": async args => {
        //             const { from, to, subject } = args;
        //             // Find an email which has the words in 'subject', sent from 'from' email address, to 'to' email address.
        //         }
        //     });

        //     donationsRegisterTablePage.verifyInviteSuccess(randomNameGuest, randomLastNameGuest, emailAddress);
        //     donationsRegisterTablePage.clickCancelInviteGuestButton();
        //     donationsRegisterTablePage.verifyCancelInviteGuestSuccess();
        // });
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

    it('Verify button Previous in become a host', () => {
        cy.forceVisit(infors.url);
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

