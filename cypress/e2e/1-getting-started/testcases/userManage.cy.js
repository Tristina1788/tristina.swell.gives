import { HomePage } from "../Pages/homePage";
import { UsersPage } from "../Pages/usersPage";
import { DashboardPage } from "../Pages/DashboardPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { UserManagePage } from "../Pages/userManagePage";
import { RegisterPage } from "../Pages/registerPage";
import { ThankYouPage } from "../Pages/thankYouPage";
import { Mailbox } from "../Pages/mailbox";

import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
let homePage = new HomePage();
let usersPage = new UsersPage();
let loginManagePage = new LoginManagePage();
let dashboardPage = new DashboardPage();
let userManagePage = new UserManagePage();
let registerPage = new RegisterPage();
let thankYouPage = new ThankYouPage();
let mailbox = new Mailbox();
const infors = require('../utils/infor.js');
let firstName = getRandomText();
let lastName = getRandomText();

let inboxId = "";
var randomEmail = getRandomEmail();
let hasMailbox = 0;

beforeEach(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify the user Manage flow', () => {
    it.skip('setup mailbox inbox',()=>{
        randomEmail = getRandomEmail();
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
            
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
            
        });
    });
    it.skip('Verify enable to create new user from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        loginManagePage.visit(infors.urlManage + 'users');
       

    });

    it.skip('Verify enable to create new user from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'users');
        userManagePage.clickAddBtn();
        userManagePage.addNewUser(firstName,lastName,'User',randomEmail,infors.passAdmin,"Yes",'./data/img_test/a740_288.jpg')
        userManagePage.clickSaveBtn();
        userManagePage.verifySaveSuccess();
        userManagePage.clickConfirmButton();
        cy.reload();
        if(hasMailbox == 1)
            cy.emptyInbox(inboxId);
        userManagePage.verifyUserIsExist(firstName,lastName,randomEmail,'User',infors.passAdmin,"Yes");
        if(hasMailbox == 1)
            mailbox.verifyMailboxGetEmailNewUserSuccess(inboxId);
        //mailbox.verifyMailboxGetEmailNewUserSuccess('fca7edc7-9d39-46e6-bfe6-63f8a8eebf16');
        dashboardPage.logoutManagePage();
        userManagePage.visitVerifyLink();
        //loginManagePage.inputloginForm(infors.randomEmail, infors.passAdmin);
        loginManagePage.inputloginForm('fca7edc7-9d39-46e6-bfe6-63f8a8eebf16@mailslurp.com', infors.passAdmin);
        dashboardPage.verifyLoginSuccess();

    });

    it.skip('Verify enable to update user from manage Page',()=>{
        let firstNameUpdate = getRandomText();
        let lastNameUpdate = getRandomText();
        dashboardPage.clickProfileBtn();

        
        userManagePage.updateUser(firstNameUpdate,lastNameUpdate,'User',randomEmail,infors.passAdmin, './data/img_test/a740_288.jpg')
        userManagePage.clickSaveBtn();
        userManagePage.verifySaveSuccess();
        userManagePage.clickConfirmButton();
        cy.reload();
        userManagePage.verifyNewUserIsExist(firstNameUpdate,lastNameUpdate,'User',randomEmail,infors.passAdmin,"yes");
        
    });

})