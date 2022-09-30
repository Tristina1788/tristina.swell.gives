import { HomePage } from "../Pages/homePage";
import { ProductSetupPage } from "../Pages/productSetupPage";
import { ProductsManageSetupPage } from "../Pages/productsManageSetupPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import { TableManageSetupPage } from "../Pages/tableManagPage";
import { TicketManagePage } from "../Pages/ticketManagePage";
let homePage = new HomePage();
let loginManagePage = new LoginManagePage();

const infors = require('../utils/infor.js')
let productSetupPage = new ProductSetupPage();
let productsManageSetupPage = new ProductsManageSetupPage();
let donationsTablePage = new DonationsTablePage();
let donationsAddressPage = new DonationsAddressPage();
let donationsPaymentPage = new DonationsPaymentPage();
let donationsRegisterTablePage = new DonationsRegisterTablePage();
let tableManageSetupPage = new TableManageSetupPage();
let ticketManagePage = new TicketManagePage();
const user = require('../../../fixtures/address.json')
let proName = getRandomText();
let proPrice = Math.floor(Math.random() * 20) + 1;
let maxPro = Math.floor(Math.random() * 20) + 1;
let proPerTB = Math.floor(Math.random() * 3) + 1;
let proNameUpdate = getRandomText();
let priceUpdate = Math.floor(Math.random() * 20) + 1;
let maxUpdate = Math.floor(Math.random() * 20) + 1;
let randomName = getRandomText();
let randomLastName = getRandomText();
let randomEmail = getRandomEmail();
let randomPhone = getRandomNumber();

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

if(proPrice % 2 == 0) proPrice = proPrice + 1;
describe('Verify setup product page for table/team ', () => {

    it.only('Verify create prdouct page for table - product successfully', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');

        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Table/Team', proName, true, false, proPrice, maxPro, proPerTB, "Virtual Test Ticket (51.00)");
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Table', proName, true, false, proPrice, maxPro, proPerTB, "Virtual Test Ticket");
    })


    it.only('Verify table product can be used in frontend successfully ', () => {
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsExistAndSelectIt(proName, proPrice);
        donationsTablePage.selectAmountItem(infors.amountTicket)
        donationsTablePage.verifySummaryAmount(infors.amountDonateTable, proPrice);
        donationsTablePage.clickNextButton();
        donationsAddressPage.inputAddressInfor(randomName, randomLastName, randomEmail, randomPhone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCardTicket(infors.creditCardNumber, infors.creditCardVCV);
        donationsPaymentPage.clickPurchase();
        donationsRegisterTablePage.verifyNumberTicketsInTable(proPerTB);
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickDeleteButton(randomLastName);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tickets');
        ticketManagePage.clickDeleteButton(proName);
    })

    it.only('Verify update table product setup page and the changing apply to frontend', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');
        productsManageSetupPage.clickEditButton(proName);
        productSetupPage.editProductForm(proNameUpdate, false, false, priceUpdate, maxUpdate, proPerTB, "Test Ticket (33.00)");
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Table', proNameUpdate, false, false, priceUpdate, maxUpdate, proPerTB, "Test Ticket");
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsNotExist(proNameUpdate, priceUpdate);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');
        productsManageSetupPage.clickEditButton(proNameUpdate);
        productSetupPage.editProductForm(proNameUpdate, true, false, priceUpdate, maxUpdate, proPerTB, "Test Ticket (33.00)");
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Table', proNameUpdate, true, false, priceUpdate, maxUpdate, proPerTB, "Test Ticket");
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsExistAndSelectIt(proNameUpdate, priceUpdate);
        donationsTablePage.selectAmountItem(infors.amountTicket)
        donationsTablePage.verifySummaryAmount(infors.amountDonateTable, priceUpdate);
    })

    it.only('Verify delete table product page successfully and the code can not be used for frontend', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');
        productsManageSetupPage.clickDeleteButton(proNameUpdate);
        productsManageSetupPage.verifyProductPageIsNotExist(proNameUpdate);
        cy.forceVisit(infors.url);
        homePage.clickGiveAHostButton();
        donationsTablePage.verifyTableIsNotExist(proNameUpdate, priceUpdate);
    })

})
