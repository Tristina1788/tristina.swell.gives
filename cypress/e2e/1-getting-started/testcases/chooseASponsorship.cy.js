import { HomePage } from "../Pages/homePage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { UsersPage } from "../Pages/usersPage";
import { Mailbox } from "../Pages/mailbox";
import { TransactionManagePage } from "../Pages/transactionManagePage";//
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let sponsorshipPage =new SponsorshipPage();
let usersPage =new UsersPage();
let mailbox =new Mailbox();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();
let loginManagePage =new LoginManagePage();
let transactionManagePage =new TransactionManagePage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let randomEmail = getRandomEmail();
let hasMailbox = 0;

describe('Verify Choose a sponsorship flow', () => {
    
    it.only('setup mailbox inbox',()=>{
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
            if(hasMailbox == -1) randomEmail = getRandomEmail();
            else if(hasMailbox != 1){
                console.log("hasMailbox: "+hasMailbox);
                cy.createInbox().then(newInbox => {
                    console.log('Test message');
                    // verify a new inbox was created
                    assert.isDefined(newInbox)
                    console.log("inbox id: " + newInbox.id);
                    console.log("inbox.emailAddress: " + newInbox.emailAddress);
                    cy.writeFile('./data/mailbox.json',{inboxId:newInbox.id, emailAddress:newInbox.emailAddress, hasMailbox: 1})
                    inboxId = newInbox.id;
                    randomEmail = newInbox.emailAddress;
                });
            } else {
                inboxId = inbox.inboxId;
                randomEmail = inbox.emailAddress;
            }
        });
    })
    
    it.only('Verify information when Choose a sponsorship',()=>{
        cy.forceVisit(infors.url);
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        //let randomEmail = getRandomEmail();
        console.log("randomEmail:"+randomEmail);
        let randomPhone = getRandomNumber();
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.clickSponsorItem(infors.sponsorItemName);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.verifyPaymentPage();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionFinish();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailSponsorshipSuccess(inboxId);
        usersPage.verifyTheUsersIsSponsor(infors.url+'users/'+infors.personRecieveCreditPage,randomName + ' '+randomLastName);

        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        transactionManagePage.verifyTransactionIsCreated('Sponsorship',randomName,randomLastName, randomEmail,'$501.00', 'grouest');
    })

    it.only('Verify previous button in Choose a sponsorship',()=>{
        cy.forceVisit(infors.url);
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
        donationsPaymentPage.verifyPaymentPage();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        //start script to verify previous button
        donationsPaymentPage.clickPreviousButton();
        donationsAddressPage.verifyAddressInforPage();
        donationsAddressPage.clickPreviousButton();
        sponsorshipPage.verifySponsershipPage();
        sponsorshipPage.clickButtonNext();
        donationsAddressPage.clickNextButton();
        //end script to verify previous button
       
    })

})

