import { HomePage } from "../Pages/homePage";
import { ProductSetupPage } from "../Pages/productSetupPage";
import { ProductsManageSetupPage} from "../Pages/productsManageSetupPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TicketPage } from "../Pages/ticketPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
let homePage = new HomePage();
let loginManagePage =new LoginManagePage();

const infors = require('../utils/infor.js')
let productSetupPage =new ProductSetupPage();
let productsManageSetupPage =new ProductsManageSetupPage();
let ticketPage =new TicketPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();
const user = require('../../../fixtures/address.json')
let ticketProName = getRandomText();
let priceTicket = Math.floor(Math.random() * 20) + 1;
let maxTicket = Math.floor(Math.random() * 20) + 1;
let ticketPerTB = Math.floor(Math.random() * 3) + 1;
let linkct = getRandomText();
let contentct = getRandomText();

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup product page', () => {
       it.only('Verify create product page create ticket product successfully',()=>{
        if(priceTicket %2 == 0) priceTicket+=1;
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/products');
        
        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Ticket',ticketProName,true,false,priceTicket,maxTicket,ticketPerTB);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Ticket',ticketProName,true,false,priceTicket,maxTicket,0);
        

    })

    it.only('Verify ticket product can be used in frontend successfully ',()=>{
        cy.forceVisit(infors.url);
        
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickPurchaseTickets();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTicketName(ticketProName);
        ticketPage.inputFormInforNameTc(ticketProName,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicketName(ticketProName);
        ticketPage.verifyTicketNameIsAdded(ticketProName, randomEmail, priceTicket);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifySummaryAmountForSelectTicketName(priceTicket,infors.amountTicket);
        
    })

    it.only('Verify delete coupon page successfully and the code can not be used for frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/products');
        productsManageSetupPage.clickDeleteButton(ticketProName);
        productsManageSetupPage.verifyProductPageIsNotExist(ticketProName);
        cy.forceVisit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyTheTicketIsNotExist(ticketProName);
        
    })


})
