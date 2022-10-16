
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { EmailEditorDetailPage } from "../Pages/EmailEditorDetailPage";
import { EmailEditorPage } from "../Pages/emailEditorPage";
import { LoginManagePage } from "../Pages/loginManagePage";


let mailbox = new Mailbox();
let loginManagePage = new LoginManagePage();
let emailEditorDetailPage = new EmailEditorDetailPage();
let emailEditorPage = new EmailEditorPage();
const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json');
const user = require('../../../fixtures/address.json');
let inboxId = "";
let hasMailbox = 0;
let randomEmail = 0;
describe('Verify Email Editor Manage', () => {

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

    it.only('Verify system has all template', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        emailEditorPage.verifyAllTemplateExist();
    })

    it.only('Verify template Guest Check In work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Guest Check In');
        emailEditorDetailPage.verifyTemplateEmailHasAllParts('Guest Check In');
        emailEditorDetailPage.updateSubject('Testing : Thanks *|fundraiserFirstName|* for Checking In to *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks John for Checking In to The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks John for Checking In to', 'There are many people just one click away that would join you to support this great cause')
        emailEditorDetailPage.updateSubject('Thanks *|fundraiserFirstName|* for Checking In to *|eventName|*');
    })

    it.only('Verify template Fundraiser Registration work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Fundraiser Registration');
        emailEditorDetailPage.verifyTemplateEmailFundraiserRegistrationHasAllParts('Fundraiser Registration');
        emailEditorDetailPage.updateSubject('Testing : Thanks for Registering as a fundraiser for *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks for Registering as a fundraiser for The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks for Registering as a fundraiser for ', 'Now you can start spreading the good news that')
        emailEditorDetailPage.updateSubject('Thanks for Registering as a fundraiser for *|eventName|*');
    })
})