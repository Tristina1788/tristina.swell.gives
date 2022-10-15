import { HomePage } from "../Pages/homePage";
import { TicketPage } from "../Pages/ticketPage";
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { TransactionManagePage } from "../Pages/transactionManagePage";//
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let ticketPage = new TicketPage();
let mailbox = new Mailbox();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();
let loginManagePage =new LoginManagePage();
let transactionManagePage =new TransactionManagePage();

const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let randomEmail = "";
let hasMailbox = 0;

describe('Verify Purchase Tickets flow', () => {
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

    it.only('Verify purchase a ticket and selections amount',()=>{
        cy.forceVisit(infors.url);
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomPhone = getRandomNumber();
        homePage.clickPurchaseTickets();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionTicketsFinish();
        console.log("======inboxId===="+inboxId);
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailPurchaseTicketSuccess(inboxId);
        
       loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
       transactionManagePage.verifyTransactionIsCreated('Ticket',randomName,randomLastName, randomEmail,'$33.00','',1);
       transactionManagePage.verifyTransactionIsCreated('Donation',randomName,randomLastName, randomEmail,'$'+infors.amountTicket+'.00');
    })

    
    it.only('Verify previous button on purchase a ticket ',()=>{
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomPhone = getRandomNumber();
        homePage.clickPurchaseTickets();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
         //start script to verify previous button
         donationsPaymentPage.clickPreviousButton();
         donationsAddressPage.verifyAddressInforPage();
         donationsAddressPage.clickPreviousButton();
         ticketPage.verifyIsScreenSelectTickets();
         ticketPage.clickButtonNext();
         donationsAddressPage.clickNextButton();
         //end script to verify previous button
       
    })

    it.only('Verify purchase multiple tickets and other amount',()=>{
        cy.forceVisit(infors.url);
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomPhone = getRandomNumber();
        homePage.clickPurchaseTickets();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectTestTicket(1);
        ticketPage.verifyFormInforTc(1);
        ticketPage.inputFormInforTc(1,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(1);
        ticketPage.verifyTicketIsAdded(1, randomEmail);
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.inputOtherAmount(infors.anotherAmountTicket+'.00')
        ticketPage.verifySummaryAmount(2, 1,infors.anotherAmountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionTicketsFinish();
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        transactionManagePage.verifyTransactionIsCreated('Ticket',randomName,randomLastName, randomEmail,'$117.00','',3); // 2 tickets 33$ and 1 tickets 51$
        transactionManagePage.verifyTransactionIsCreated('Donation',randomName,randomLastName, randomEmail,'$'+infors.anotherAmountTicket+'.00');
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailPurchaseMultiTicketSuccess(inboxId);
    })
    

})