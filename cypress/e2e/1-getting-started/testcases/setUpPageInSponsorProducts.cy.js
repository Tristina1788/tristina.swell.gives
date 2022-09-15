import { HomePage } from "../Pages/homePage";
import { ProductSetupPage } from "../Pages/productSetupPage";
import { ProductsManageSetupPage } from "../Pages/productsManageSetupPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { SponsorshipPage } from "../Pages/sponsorshipPage";
let homePage = new HomePage();
let loginManagePage = new LoginManagePage();

const infors = require('../utils/infor.js')
let productSetupPage = new ProductSetupPage();
let productsManageSetupPage = new ProductsManageSetupPage();
let sponsorshipPage = new SponsorshipPage();
const user = require('../../../fixtures/address.json')
let proName = getRandomText();
let proPrice = Math.floor(Math.random() * 20) + 1;
let maxPro = Math.floor(Math.random() * 20) + 1;
let proPerTB = Math.floor(Math.random() * 3) + 1;
let proNameUpdate = getRandomText();
let priceUpdate = Math.floor(Math.random() * 20) + 1;
let maxUpdate = Math.floor(Math.random() * 20) + 1;

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup product page for sponsor ', () => {

    it.only('Verify create product page for  sponsor - product successfully', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');

        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Sponsorship', proName, true, false, proPrice, maxPro, 0);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Sponsorship', proName, true, false, proPrice, maxPro, 0);


    })

    it.only('Verify sponsor product can be used in frontend successfully ', () => {
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorNameExist(proName, proPrice);
        sponsorshipPage.clickSponsorItem(proName);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();

    })

    
    it.only('Verify  update sponsor product setup page and the changing apply to frontend', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');

        productsManageSetupPage.clickEditButton(proName);
        productSetupPage.editProductForm(proNameUpdate, false, false, priceUpdate, maxUpdate, 0);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Sponsorship', proNameUpdate, false, false, priceUpdate, maxUpdate, 0);
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorNameNotExist(proNameUpdate);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');

        productsManageSetupPage.clickEditButton(proNameUpdate);
        productSetupPage.editProductForm(proNameUpdate, true, false, priceUpdate, maxUpdate, 0);
        productSetupPage.clickSaveBtn();

        productsManageSetupPage.verifyNewProductIsCreated('Sponsorship', proNameUpdate, true, false, priceUpdate, maxUpdate, 0);
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorNameExist(proNameUpdate, priceUpdate);
        sponsorshipPage.clickSponsorItem(proNameUpdate);
        sponsorshipPage.selectPersonReceiveCredit(infors.personRecieveCredit);
        sponsorshipPage.clickButtonNext();

    })

    it.only('Verify delete sponsor product page successfully and the code can not be used for frontend', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');
        productsManageSetupPage.clickDeleteButton(proNameUpdate);
        productsManageSetupPage.verifyProductPageIsNotExist(proNameUpdate);
        cy.forceVisit(infors.url);
        homePage.clickChooseASponsorshipButton();
        sponsorshipPage.verifySponsorNameNotExist(proNameUpdate);

    })
})
