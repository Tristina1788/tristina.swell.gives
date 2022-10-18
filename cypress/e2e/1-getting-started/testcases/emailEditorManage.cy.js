
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

    it.only('Verify template Pledge Creation work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Pledge Creation');
        emailEditorDetailPage.verifyTemplateEmailPledgeCreationHasAllParts('Pledge Creation');
        emailEditorDetailPage.updateSubject('Testing : Thanks for Pledging Support to *|eventbeneficiaryName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks for Pledging Support to The good non-profit');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks for Pledging Support to ', 'you can continue to enjoy the event and complete this gift later')
        emailEditorDetailPage.updateSubject('Thanks for Pledging Support to *|eventbeneficiaryName|*');
    })

    it.only('Verify template Pledge Reminder work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Pledge Reminder');
        emailEditorDetailPage.verifyTemplateEmailPledgeReminderHasAllParts('Pledge Reminder');
        emailEditorDetailPage.updateSubject('Testing : Uh Oh! Did you forget you promised to support *|eventbeneficiaryName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Uh Oh! Did you forget you promised to support The good non-profit');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Uh Oh! Did you forget you promised to support ', 'To fulfill your pledge, please go to this link:')
        emailEditorDetailPage.updateSubject('Uh Oh! Did you forget you promised to support *|eventbeneficiaryName|*');
    })

    it.only('Verify template In-Person Ticket Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('In-Person Ticket Email');
        emailEditorDetailPage.verifyTemplateEmailTicketHasAllParts('In-Person Ticket Email');
        emailEditorDetailPage.updateSubject('Testing : Here is your ticket to *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Here is your ticket to The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Here is your ticket to ', 'Be sure to check out and share your personal fundraising page')
        emailEditorDetailPage.updateSubject('Here is your ticket to *|eventName|*');
    })

    it.only('Verify template Virtual Ticket Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Virtual Ticket Email');
        emailEditorDetailPage.verifyTemplateVirtualTicketEmailtHasAllParts('Virtual Ticket Email');
        emailEditorDetailPage.updateSubject('Testing : Here is your virtual ticket to *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Here is your virtual ticket to The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Here is your virtual ticket to', 'Even virtually, you will be able to enter the event, chat with friends and enjoy the event presentation.')
        emailEditorDetailPage.updateSubject('Here is your virtual ticket to *|eventName|*');
    })

    it.only('Verify template Ticket Purchase Receipt work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Ticket Purchase Receipt');
        emailEditorDetailPage.verifyTemplateTicketPurchaseReceipttHasAllParts('Ticket Purchase Receipt');
        emailEditorDetailPage.updateSubject('Testing : Thanks for your purchase supporting *|eventname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks for your purchase supporting The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks for your purchase supporting', 'We are so thankful for you.')
        emailEditorDetailPage.updateSubject('Thanks for your purchase supporting *|eventname|*');
    })

    it.only('Verify template Livestream Reminder Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Livestream Reminder Email');
        emailEditorDetailPage.verifyTemplateLivestreamReminderEmailtHasAllParts('Livestream Reminder Email');
        emailEditorDetailPage.updateSubject('*|eventname|* Starts in 1 Hour! => Testing');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('The Good Dinner Starts in 1 Hour! => Testing');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Starts in 1 Hour! => Testing', 'Depending on the internet connection, you may briefly see a login window.')
        emailEditorDetailPage.updateSubject('*|eventname|* Starts in 1 Hour!');
    })
})