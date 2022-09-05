import { HomePage } from "../Pages/homePage";
import { TicketPage } from "../Pages/ticketPage";
import { getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";

let homePage = new HomePage();
let ticketPage = new TicketPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();

const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
describe('Verify Purchase Tickets flow', () => {
    
    it('Verify purchase a ticket and selections amount',()=>{
        cy.forceVisit(infors.url);
        
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
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
        /*cy.wait(60000);
        cy.visit(infors.url);
        homePage.verifyUserInTopFundraiser(randomName + ' ' + randomLastName,(infors.amountTicket + 33));
        homePage.verifyUserInTopSocial(randomName + ' ' + randomLastName,1);
        */
    })

    
    it('Verify previous button on purchase a ticket ',()=>{
        cy.forceVisit(infors.url);
        
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
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

    it('Verify purchase multiple tickets and other amount',()=>{
        cy.forceVisit(infors.url);
        
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
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
        
    })
    

})