import { HomePage } from "../Pages/homePage";
import { CouponSetupPage } from "../Pages/couponSetupPage";
import { CouponManageSetupPage} from "../Pages/couponManageSetupPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";

import { TicketPage } from "../Pages/ticketPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";

let ticketPage = new TicketPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();
let homePage = new HomePage();
let loginManagePage =new LoginManagePage();

const infors = require('../utils/infor.js');
const user = require('../../../fixtures/address.json')
let couponSetupPage =new CouponSetupPage();
let couponManageSetupPage =new CouponManageSetupPage();
let code = getRandomText();
let discount = Math.floor(Math.random() * 20) + 1;
let discountUpdate = Math.floor(Math.random() * 20) + 1;

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup coupon page', () => {
   
    
    it('Verify create coupon page successfully ',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/coupons');
        
        couponManageSetupPage.clickAddBtn();
        couponSetupPage.inputFormCoupon(code, discount);
        couponSetupPage.clickSaveBtn();
        
        couponManageSetupPage.clickOKButton();
        couponManageSetupPage.verifyCounponPageIsExist(code, discount);
        couponManageSetupPage.visit(infors.url);
        homePage.clickPurchaseTickets();
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifyPromoEnableToApplyInFrontEnd();
        ticketPage.addPromotoTicket(code);
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket,discount);
        
    })


    it('Verify update coupon page successfully ',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/coupons');
        
        couponManageSetupPage.clickEditButton(code);
        couponSetupPage.inputFormCoupon(code+'_update', discountUpdate);
        couponSetupPage.clickSaveBtn();
        
        couponManageSetupPage.clickOKButton();
        couponManageSetupPage.verifyCounponPageIsExist(code+'_update', discountUpdate);
        couponManageSetupPage.visit(infors.url);
        homePage.clickPurchaseTickets();
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifyPromoEnableToApplyInFrontEnd();
        ticketPage.addPromotoTicket(code+'_update');
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket,discountUpdate);
        
    })

    it('Verify delete coupon page successfully and the code can not be used for frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/coupons');
        
        couponManageSetupPage.clickDeleteButton(code+'_update');
        couponManageSetupPage.clickOKButton();
        couponManageSetupPage.verifyCounponPageIsNotExist(code+'_update', discountUpdate);
        couponManageSetupPage.visit(infors.url);
        homePage.clickPurchaseTickets();
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        ticketPage.verifyIsScreenSelectTickets();
        ticketPage.selectTestTicket(0);
        ticketPage.verifyFormInforTc(0);
        ticketPage.inputFormInforTc(0,randomName, randomLastName,randomEmail,randomPhone);
        ticketPage.clickAddTicket(0);
        ticketPage.verifyTicketIsAdded(0, randomEmail);
        ticketPage.selectAmountItem('$'+infors.amountTicket);
        ticketPage.verifyPromoEnableToApplyInFrontEnd();
        ticketPage.addPromotoTicket(code+'_update');
        ticketPage.verifySummaryAmount(true,false,infors.amountTicket);
        
    })


})
