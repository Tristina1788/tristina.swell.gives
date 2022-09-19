import { HomePage } from "../Pages/homePage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import { getEmailTest, getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { Mailbox } from "../Pages/mailbox";

let homePage = new HomePage();
let donationsTablePage = new DonationsTablePage();
let donationsAddressPage = new DonationsAddressPage();
let donationsRegisterTablePage = new DonationsRegisterTablePage();
let donationsPaymentPage = new DonationsPaymentPage();
let mailbox = new Mailbox();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let randomEmail = "";
let hasMailbox = 0;

describe('Verify become a host flow', () => {
    it.only('setup mailbox inbox',()=>{
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
            if(hasMailbox != 1){
                console.log("hasMailbox: "+hasMailbox);
                cy.createInbox().then(newInbox => {
                    console.log('Test message');
                    // verify a new inbox was created
                    assert.isDefined(newInbox)
                    console.log("inbox id: " + newInbox.id);
                    console.log("inbox.emailAddress: " + newInbox.emailAddress);
                    cy.writeFile('./data/mailbox.json',{inboxId:newInbox.id, emailAddress:newInbox.emailAddress, hasMailbox: 1})
                    inboxId = newInbox.inboxId;
                    randomEmail = newInbox.emailAddress;
                });
            } else {
                inboxId = inbox.inboxId;
                randomEmail = inbox.emailAddress;
            }
        });
    })

    it.only('Verify information when become a host and verify payment for invalid infor and valid infor', () => {
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

    it.only('Verify information when become a host and enable to send invitation to email', () => {
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        
        //let randomEmail = getRandomEmail();
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
        mailbox.verifyMailboxGetEmailBecomeHostSuccess(inboxId);
        donationsRegisterTablePage.clickNavigationTab('Your Table');
        donationsRegisterTablePage.verifyUserInformationInYourTableIsDisplayed(randomName, randomLastName, randomEmail);
        donationsRegisterTablePage.clickNavigationTab('Guest');
        donationsRegisterTablePage.verifyUserInformationInGuestTableIsDisplayed(randomName, randomLastName, randomEmail);
        let randomNameGuest = getRandomText();
        let randomLastNameGuest = getRandomText();
        let randomEmailGuest = randomEmail;// getEmailTest();
        // });
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest, randomLastNameGuest, randomEmailGuest);
        donationsRegisterTablePage.clickInviteGuestButton();
        
        mailbox.verifyMailboxGetEmailBecomeHostGuestSuccess(inboxId, randomName);
        donationsRegisterTablePage.verifyInviteSuccess(randomNameGuest, randomLastNameGuest, randomEmailGuest);
        donationsRegisterTablePage.clickCancelInviteGuestButton();
        donationsRegisterTablePage.verifyCancelInviteGuestSuccess();
        //cy.wait(60000);
        //cy.visit(infors.url);
        //homePage.verifyUserInTopFundraiser(randomName + ' ' + randomLastName,(infors.amountTicket));
        //homePage.verifyUserInTopSocial(randomName + ' ' + randomLastName,1);
        //homePage.verifyUserInTable(randomLastName + " Table",(infors.amountTicket))
    })

    it.only('Verify button Previous in become a host', () => {
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

