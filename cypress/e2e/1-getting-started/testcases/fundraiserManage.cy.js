import { HomePage } from "../Pages/homePage";
import { UsersPage } from "../Pages/usersPage";
import { FundraiserDetailPage } from "../Pages/fundraiserDetailPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { FundraiserManagePage } from "../Pages/fundraiserManagePage";
import { RegisterPage } from "../Pages/registerPage";
import { ThankYouPage } from "../Pages/thankYouPage";
import { Mailbox } from "../Pages/mailbox";

import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
let homePage = new HomePage();
let usersPage = new UsersPage();
let loginManagePage = new LoginManagePage();
let fundraiserDetailPage = new FundraiserDetailPage();
let fundraiserManagePage = new FundraiserManagePage();
let registerPage = new RegisterPage();
let thankYouPage = new ThankYouPage();
let mailbox = new Mailbox();
const infors = require('../utils/infor.js');
let firstName = getRandomText();
let lastName = getRandomText();
let company = getRandomText();
let phone = getRandomNumber();
let bidNumber = getRandomNumber();

let updatedFirstName = getRandomText();
let updatedLastName = getRandomText();
let updatedCompany = getRandomText();
let updatedPhone = getRandomNumber();
let updatedBidNumber = getRandomNumber();
let inboxId = "";
var randomEmail = "";
let hasMailbox = 0;


describe('Verify the fundraiser Manage flow', () => {
    it.only('setup mailbox inbox',()=>{
        randomEmail = getRandomEmail();
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
            if(hasMailbox == -1) randomEmail = getRandomEmail();
            else if(hasMailbox != 1){
                console.log("hasMailbox: "+hasMailbox);
                cy.createInbox().then(newInbox => {
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
    });
    it.only('Verify enable to create new fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickAddBtn();
        fundraiserDetailPage.inputFundraiserForm('No Referral', firstName, lastName, company, randomEmail, true, phone, bidNumber, 'Physical', 'grouest');
        fundraiserDetailPage.clickSaveBtn();
        fundraiserDetailPage.verifySaveSuccess();
        fundraiserDetailPage.clickConfirmButton();
        cy.reload();
        if(hasMailbox == 1)
            cy.emptyInbox(inboxId);
        fundraiserManagePage.verifyFundraiserIsExist(firstName + ' '+ lastName ,firstName+'.'+ lastName , randomEmail, true, 'grouest');
        fundraiserManagePage.verifySendEmailExist();
        fundraiserManagePage.clickSendEmail();
        fundraiserManagePage.inputEmailAndResend(randomEmail);
        if(hasMailbox == 1)
            mailbox.verifyMailboxGetEmailFundraiserSuccess(inboxId);
        cy.visit(infors.url+'/users/'+firstName+'.'+ lastName);
        cy.wait(5000);
        usersPage.verifyTheUsersHasGroup('grouest');

    });

    it.only('Verify enable to update fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickEditButton(firstName);
        fundraiserDetailPage.inputFundraiserForm('No Referral', updatedFirstName, updatedLastName, updatedCompany, '', false, updatedPhone, updatedBidNumber, 'Virtual', '');
        fundraiserDetailPage.clickSaveBtn();
        fundraiserDetailPage.verifySaveSuccess();
        fundraiserDetailPage.clickConfirmButton();
        fundraiserManagePage.verifyFundraiserIsExist(updatedFirstName+' '+ updatedLastName,firstName+'.'+ lastName , '' , false, '');
        fundraiserManagePage.verifySendEmailIsNotExist();
    });

    it.only('Verify enable to delete fundraiser from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickDeleteButton(firstName+'.'+ lastName);
        fundraiserManagePage.clickOKButton();
        cy.reload();
        fundraiserManagePage.verifyFundraiserIsNotExist(updatedFirstName+' '+ updatedLastName);
        
    });

    it.only('Verify information in manage when become a fundraiser ',()=>{
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickBecomeAFundraiser();
        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        thankYouPage.clickFundraiserUserLinks(randomName, randomLastName);
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.verifyFundraiserIsExist(randomName + ' '+ randomLastName ,randomName+'.'+ randomLastName , randomEmail, true, '');
        fundraiserManagePage.clickDeleteButton(randomName);
        fundraiserManagePage.clickOKButton();
        cy.reload();
        fundraiserManagePage.verifyFundraiserIsNotExist(randomName+' '+ randomLastName);
    })
})