import { HomePage } from "../Pages/homePage";
import { Mailbox } from "../Pages/mailbox";
import { DonationsAmountPage} from "../Pages/donationsAmountPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { getInboxId, getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"

let homePage = new HomePage();
let mailbox = new Mailbox();
let donationsAmountPage = new DonationsAmountPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();

const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let randomEmail = "";
let hasMailbox = 0;


describe('Verify Give Now flow', () => {
    
    it.only('setup mailbox inbox',()=>{
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
        });

        console.log("hasMailbox: "+hasMailbox);
        if(hasMailbox == 0){
            console.log("randomEmail111111: "+hasMailbox);
            cy.createInbox().then(inbox => {
                console.log('Test message');
                // verify a new inbox was created
                assert.isDefined(inbox)
    
                // save the inboxId for later checking the emails
                // inboxId = inbox.id
                // emailAddress = inbox.emailAddress;
                console.log("inbox id: " + inbox.id);
                console.log("inbox.emailAddress: " + inbox.emailAddress);
                cy.writeFile('./data/mailbox.json',{inboxId:inbox.id, emailAddress:inbox.emailAddress, hasMailbox: 1})
            });
        }
        
        cy.readFile('./data/mailbox.json').then((inbox)=> {
            inboxId = inbox.inboxId;
            randomEmail = inbox.emailAddress;
        });
        
    })
    it.only('Verify Give Now with all options',()=>{
        
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomPhone = getRandomNumber();
        homePage.clickGiveNowButton();
        donationsAmountPage.selectFee(infors.amountGiveNowTest);
        donationsAmountPage.verifyFeeSelectionCorrect(infors.amountGiveNowTest);
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.verifyAmountAfterFee(infors.amountGiveNowFeeTest);
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.selectfullFillGiftLater();
        donationsAmountPage.verifyWarningFullFillShow();randomPhone
        donationsAmountPage.inputFormFullFillLater(randomName, randomLastName, randomEmail, randomPhone);
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickPledgeButton();
        donationsAmountPage.verifyShowThankYouPledge();
        mailbox.verifyMailboxGetEmailPledge(inboxId);
        
    })

    it.only('Verify Give Now with other amount no option full fill later ',()=>{
        cy.forceVisit(infors.url);
        
        homePage.clickGiveNowButton();
        donationsAmountPage.inputOtherAmount(infors.anotherAmountTicketGiveNow+'.00')
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.verifyAmountAfterFee(infors.amountGiveNowOtherFeeTest);
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, randomEmail, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCard(infors.creditCardNumber, user.firstName, infors.creditCardVCV);
        
        donationsPaymentPage.clickDonateButton(infors.amountGiveNowOtherFeeTest);
        donationsPaymentPage.verifyTransactionFinish();
        mailbox.verifyMailboxGetEmailPurchaseSuccess(inboxId);
    })

    it.only('Verify Give Now with fee even will make payment failed',()=>{
        cy.forceVisit(infors.url);
        
        homePage.clickGiveNowButton();
        donationsAmountPage.selectFee(infors.amountEvenGiveNowTest);
        donationsAmountPage.verifyFeeSelectionCorrect(infors.amountEvenGiveNowTest);
        donationsAmountPage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, user.email, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCard(infors.creditCardNumber, user.firstName, infors.creditCardVCV);
        donationsPaymentPage.clickDonateButton(infors.amountEvenGiveNowTest);
        donationsPaymentPage.verifyTransactionFailed();
    })

    it.only('Verify Give Now with previous button',()=>{
        cy.forceVisit(infors.url);
        
        homePage.clickGiveNowButton();
        donationsAmountPage.selectFee(infors.amountEvenGiveNowTest);
        donationsAmountPage.verifyFeeSelectionCorrect(infors.amountEvenGiveNowTest);
        donationsAmountPage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, user.email, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCard(infors.creditCardNumber, user.firstName, infors.creditCardVCV);
        //start script to verify previous button
        donationsPaymentPage.clickPreviousButton();
        donationsAddressPage.verifyAddressInforPage();
        donationsAddressPage.clickPreviousButton();
        donationsAmountPage.verifyDonationAmountPage();
        donationsAmountPage.clickNextButton();
        donationsAddressPage.clickNextButton();
        //end script to verify previous button
    })

    

})

