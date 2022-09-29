import { HomePage } from "../Pages/homePage";
import { UsersPage } from "../Pages/usersPage";
import { FundraiserDetailPage } from "../Pages/FundraiserDetailPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { FundraiserManagePage } from "../Pages/fundraiserManagePage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
let homePage = new HomePage();
let usersPage = new UsersPage();
let loginManagePage = new LoginManagePage();
let fundraiserDetailPage = new FundraiserDetailPage();
let fundraiserManagePage = new FundraiserManagePage();
const infors = require('../utils/infor.js');
let firstName = getRandomText();
let lastName = getRandomText();
let company = getRandomText();
let email = getRandomEmail();
let phone = getRandomNumber();
let bidNumber = getRandomNumber();

let updatedFirstName = getRandomText();
let updatedLastName = getRandomText();
let updatedCompany = getRandomText();
let updatedEmail = getRandomEmail();
let updatedPhone = getRandomNumber();
let updatedBidNumber = getRandomNumber();
describe('Verify the fundraiser Manage flow', () => {
    
    it.only('Verify enable to create new fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickAddBtn();
        fundraiserDetailPage.inputFundraiserForm('No Referral', firstName, lastName, company, email, true, phone, bidNumber, 'Physical', 'grouest');
        fundraiserDetailPage.clickSaveBtn();
        fundraiserDetailPage.verifySaveSuccess();
        fundraiserDetailPage.clickConfirmButton();
        fundraiserManagePage.verifyFundraiserIsExist(firstName + ' '+ lastName ,firstName+'.'+ lastName , email, true, 'grouest');
        cy.visit(infors.url+'/users/'+firstName+'.'+ lastName);
        cy.wait(5000);
        usersPage.verifyTheUsersHasGroup('grouest');

    });

    it.only('Verify enable to update fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickEditButton(firstName);
        fundraiserDetailPage.inputFundraiserForm('No Referral', updatedFirstName, updatedLastName, updatedCompany, updatedEmail, false, updatedPhone, updatedBidNumber, 'Virtual', '');
        fundraiserDetailPage.clickSaveBtn();
        fundraiserDetailPage.verifySaveSuccess();
        fundraiserDetailPage.clickConfirmButton();
        fundraiserManagePage.verifyFundraiserIsExist(updatedFirstName+' '+ updatedLastName,firstName+'.'+ lastName , updatedEmail , false, '');
        
    });

    it.only('Verify enable to delete fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickDeleteButton(firstName+'.'+ lastName);
        fundraiserManagePage.clickConfirmDeleteButton();
        cy.reload();
        fundraiserManagePage.verifyFundraiserIsNotExist(updatedFirstName+' '+ updatedLastName);
        
    });
})