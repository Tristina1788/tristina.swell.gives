import { HomePage } from "../Pages/homePage";
import { TicketPage } from "../Pages/ticketPage";
import { generalFunction, getNameRandom, getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
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
        cy.visit(infors.url);
        
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
    })
/*
    it('Verify purchase multiple tickets and other amount',()=>{
        cy.visit(infors.url);
        
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
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket);
        ticketPage.inputOtherAmount(infors.anotherAmountTicket+'.00')
        ticketPage.verifySummaryAmount(true,false,infors.anotherAmountTicket);
        ticketPage.clickButtonNext();
        donationsAddressPage.inputAddressInforTickets(user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsPaymentPage.verifyTransactionTicketsFinish();
    })
    */

})