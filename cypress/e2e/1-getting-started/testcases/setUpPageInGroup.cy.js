import { HomePage } from "../Pages/homePage";
import { GroupSetupPage } from "../Pages/groupSetupPage";
import { GroupManageSetupPage } from "../Pages/groupManageSetupPage";
import { getCurrentDateTime, getCurrentTime, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TicketPage } from "../Pages/ticketPage";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let loginManagePage =new LoginManagePage();
let ticketPage = new TicketPage();

const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let groupSetupPage =new GroupSetupPage();
let groupManageSetupPage = new GroupManageSetupPage();
let name = getRandomText();
let updatedName = getRandomText();
;

before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify setup Detail page', () => {
    
    it.only('Verify create group page successfully and enable to use on frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/team');
        groupManageSetupPage.clickAddBtn();
        groupSetupPage.inputGroupName(name);
        groupSetupPage.clickSaveBtn();
        groupSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        
        groupManageSetupPage.verifyGroupNameHaveDisplay(name);

        loginManagePage.visit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyNewTeamDisplayInTicketPage(name);
        
        loginManagePage.visit(infors.url);
        homePage.clickBecomeAFundraiser();
        registerPage.verifyNewTeamDisplayInRegisterPage(name);
        
    })

    it.only('Verify update group page successfully and enable to use on frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/team');
        cy.reload();
        
        groupManageSetupPage.clickEditButton(name);
        groupSetupPage.inputGroupName(updatedName);
        groupSetupPage.clickSaveBtn();
        groupSetupPage.VerifyUpdateFormSuccess();
        groupSetupPage.clickOkBtn();

        groupManageSetupPage.verifyGroupNameHaveDisplay(updatedName);

        loginManagePage.visit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyNewTeamDisplayInTicketPage(updatedName);
        
        loginManagePage.visit(infors.url);
        homePage.clickBecomeAFundraiser();
        registerPage.verifyNewTeamDisplayInRegisterPage(updatedName);

    })

    it.only('Verify delete group page successfully and the code can not be used for frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/team');
        
        groupManageSetupPage.clickDeleteButton(updatedName);
        groupManageSetupPage.verifyDeleteSuccess(updatedName);
        cy.reload();
        groupManageSetupPage.verifyGroupPageIsNotExist(updatedName);
        loginManagePage.visit(infors.url);
        homePage.clickPurchaseTickets();
        ticketPage.verifyTeamIsNotExist(updatedName);
        
        loginManagePage.visit(infors.url);
        homePage.clickBecomeAFundraiser();
        registerPage.verifyTeamIsNotExist(updatedName);
    })
})
