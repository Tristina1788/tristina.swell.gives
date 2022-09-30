import { HomePage } from "../Pages/homePage";
import { CompManagePage } from "../Pages/compManagePage";
import { CompSetupPage} from "../Pages/compSetupPage";
import { RegisterPage} from "../Pages/registerPage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
import { ThankYouPage } from "../Pages/thankYouPage";
import { Mailbox } from "../Pages/mailbox";
let homePage = new HomePage();
let loginManagePage =new LoginManagePage();

const infors = require('../utils/infor.js')
let compManagePage =new CompManagePage();
let compSetupPage =new CompSetupPage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let mailbox =new Mailbox();

let ticketType = 'Test Ticket';
let amount = Math.floor(Math.random() * 20) + 1;
let code = getRandomText();
let internalNote = getRandomText();
let lname = getRandomText();
let fname = getRandomText();
let randomEmail = getRandomEmail();

let updateCode = code + 'Update';
let updateInternalNote = internalNote + 'Update';
let updateLname = lname + 'Update';
let updateFname = fname + 'Update';
let updateEmail = getRandomEmail();
let inboxId = "";
let hasMailbox = 0; 

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup Comp ticket page', () => {
   
    it.only('setup mailbox inbox',()=>{
        cy.readFile('./data/mailbox.json',{timeout:2000}).then((inbox)=> {
            hasMailbox = inbox.hasMailbox;
            if(hasMailbox == -1) randomEmail = getRandomEmail();
            else if(hasMailbox != 1){
                console.log("hasMailbox: "+hasMailbox);
                cy.createInbox().then(newInbox => {
                    console.log('Test message');
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
    }) 
    it.only('Verify create comps ticket page successfully',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/promos');
        
        compManagePage.clickAddBtn();
        compSetupPage.inputCompTicketsForm(code, "Test Ticket", 2, internalNote,lname, fname, randomEmail);
        compSetupPage.clickSaveAndSendEmailButton();
        compSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        compManagePage.verifycompTicketIsExist(code, "Test Ticket", 2, internalNote,lname, fname, randomEmail);
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailCompTicketSuccess(inboxId);

    })

    it.only('Verify the comps ticket can use in frontEnd',()=>{
        let randomName1 = getRandomText();
        let randomLastName1 = getRandomText();
        let randomEmail1 = getRandomEmail();
        let randomPhone1 = getRandomNumber();
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/promos');
        
        compManagePage.accessCompLink(code);
        registerPage.verifyRegisterPageForComp();
        registerPage.verifyButtonAddAnotherTicketIsAvailable();
        registerPage.clickAddAnotherTicket();
        registerPage.verifyRegisterFormForAttendees2();
        registerPage.verifyButtonRemoveTicketIsAvailable();
        registerPage.verifyButtonAddAnotherTicketIsNotAvailable();
        registerPage.clickButtonRemoveTicket();
        registerPage.inputRegisterForm(randomName1, randomLastName1, randomPhone1, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccessForComp(randomName1, randomLastName1, "Test Ticket");
        
        if(hasMailbox ==1 )
             mailbox.verifyMailboxGetEmailRegisterCompTicketSuccess(inboxId);
    })

    it.only('Update content page successfully with active = true',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/promos');
        
        compManagePage.clickEditButton(code);
        compSetupPage.inputCompTicketsForm(updateCode, "Test Ticket", 33, updateInternalNote, updateLname, updateFname, updateEmail);
        compSetupPage.clickSaveOnlyButton();
        compSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        compManagePage.verifycompTicketIsExist(updateCode, "Test Ticket", 33, updateInternalNote, updateLname, updateFname, updateEmail);

    })

    it.only('Delete content page successfully with active = true',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/promos');

        compManagePage.clickDeleteButton(updateCode);
        compManagePage.verifyDeleteSuccess();
        compManagePage.clickOKButton();
        cy.reload();
        compManagePage.verifyCompTicketIsNotExist(updateCode);

    })

    


})
