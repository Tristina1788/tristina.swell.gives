
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { EmailEditorDetailPage } from "../Pages/emailEditorDetailPage";
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
let randomEmail = getRandomEmail();
before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
})
describe('Verify Email Editor Manage', () => {
    ;

    it('setup mailbox inbox',()=>{
        cy.readFile('./data/mailbox.json',{timeout:20000}).then((inbox)=> {
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

    it('Verify system has all template', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        emailEditorPage.verifyAllTemplateExist();
    })

    it('Verify template Guest Check In work correct', () => {
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

    it('Verify template Fundraiser Registration work correct', () => {
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

    it('Verify template Pledge Creation work correct', () => {
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

    it('Verify template Pledge Reminder work correct', () => {
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

    it('Verify template In-Person Ticket Email work correct', () => {
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

    it('Verify template Virtual Ticket Email work correct', () => {
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

    it('Verify template Ticket Purchase Receipt work correct', () => {
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

    it('Verify template Livestream Reminder Email work correct', () => {
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

    it('Verify template In-Person Event Reminder Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('In-Person Event Reminder Email');
        emailEditorDetailPage.verifyTemplatePersonEventReminderEmailtHasAllParts('In-Person Event Reminder Email');
        emailEditorDetailPage.updateSubject('*|eventname|* Starts in 1 Hour! => Testing');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('The Good Dinner Starts in 1 Hour! => Testing');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Starts in 1 Hour! => Testing', 'We look forward to seeing you at 2 PM at the Pizitz.')
        emailEditorDetailPage.updateSubject('*|eventname|* Starts in 1 Hour!');
    })

    it('Verify template Table Host Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Table Host Email');
        emailEditorDetailPage.verifyTemplateTableHostEmailtHasAllParts('Table Host Email');
        emailEditorDetailPage.updateSubject('Testing : Thank you for supporting *|eventName|* by hosting a *|tableType|*.  Invite your guests here.');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thank you for supporting The Good Dinner by hosting a Table.  Invite your guests here.');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thank you for supporting', 'With the link below, please invite your guests to attend.')
        emailEditorDetailPage.updateSubject('Thank you for supporting *|eventName|* by hosting a *|tableType|*.  Invite your guests here.');
    })

    it('Verify template Email to Guest When Guest Declines work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Email to Guest When Guest Declines');
        emailEditorDetailPage.verifyTemplateEmailtoGuestWhenGuestDeclinesHasAllParts('Email to Guest When Guest Declines');
        emailEditorDetailPage.updateSubject('Testing : We will miss you at *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : We will miss you at The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : We will miss you at', 'Become a Fundraiser to join us in spirit!')
        emailEditorDetailPage.updateSubject('We will miss you at *|eventName|*');
    })

    it('Verify template Table Guest Invitation work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Table Guest Invitation');
        emailEditorDetailPage.verifyTemplateEmailTableGuestInvitationHasAllParts('Table Guest Invitation');
        emailEditorDetailPage.updateSubject('Hey! *|tablehostfirstname|* invited you to *|eventname|*. Please say you are going. => Testing');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Hey! Marie invited you to The Good Dinner. Please say you are going. => Testing');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Please say you are going. => Testing', 'Please confirm your invitation below.')
        emailEditorDetailPage.updateSubject('Hey! *|tablehostfirstname|* invited you to *|eventname|*. Please say you are going.');
    })

    it('Verify template Email to Host When Guest Declines work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Email to Host When Guest Declines');
        emailEditorDetailPage.verifyTemplateEmailToHostWhenGuestDeclinesHasAllParts('Email to Host When Guest Declines');
        emailEditorDetailPage.updateSubject('Testing : Your guest, *|tableguestfirstname|*, declined your invitation.');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Your guest, Johny, declined your invitation.');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Your guest', 'We are updating you that Johny Smith declined your invitation to The Good Dinner.')
        emailEditorDetailPage.updateSubject('Your guest, *|tableguestfirstname|*, declined your invitation.');
    })

    it('Verify template Table Purchase Receipt work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Table Purchase Receipt');
        emailEditorDetailPage.verifyTemplateTablePurchaseReceiptHasAllParts('Table Purchase Receipt');
        emailEditorDetailPage.updateSubject('Testing : Thanks for your purchase supporting *|eventname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks for your purchase supporting The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks for your purchase supporting', 'Instructions for inviting guests to your Table are sent in a separate email. Keep your eyes peeled and start inviting!')
        emailEditorDetailPage.updateSubject('Thanks for your purchase supporting *|eventname|*');
    })

    it('Verify template Comp Ticket Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Comp Ticket Email');
        emailEditorDetailPage.verifyTemplateCompTicketEmailHasAllParts('Comp Ticket Email');
        emailEditorDetailPage.updateSubject('Testing : Please register your guests for  *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Please register your guests for  The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Please register your guests for', 'Here is a link for you to redeem your');
        emailEditorDetailPage.updateSubject('Please register your guests for  *|eventName|*');
    })

    it('Verify template Donation Receipt work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Donation Receipt');
        emailEditorDetailPage.verifyTemplateDonationReceiptHasAllParts('Donation Receipt');
        emailEditorDetailPage.updateSubject('Testing : Thank you for supporting *|eventbeneficiaryname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thank you for supporting The good non-profit');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thank you for supporting', 'This is your receipt confirming')
        emailEditorDetailPage.updateSubject('Thank you for supporting *|eventbeneficiaryname|*');
    })

    it('Verify template Referral Success Email work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Fundraiser Success Email');
        emailEditorDetailPage.verifyTemplateReferralSuccessEmailHasAllParts('Fundraiser Success Email');
        emailEditorDetailPage.updateSubject('Testing : Well done! You helped increase the impact of *|eventbeneficiaryname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Well done! You helped increase the impact of The good non-profit');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Well done! You helped increase the impact of', 'The following donation or purchase was credited to your Fundraising Page for')
        emailEditorDetailPage.updateSubject('Well done! You helped increase the impact of *|eventbeneficiaryname|*');
    })

    it('Verify template Recurring Donation Receipt work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Recurring Donation Receipt');
        emailEditorDetailPage.verifyTemplateRecurringDonationReceiptHasAllParts('Recurring Donation Receipt');
        emailEditorDetailPage.updateSubject('Testing : Thank you for supporting *|eventbeneficiaryname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thank you for supporting The good non-profit');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thank you for supporting', 'Donation schedule: This donation will occur monthly on the same day of each month.')
        emailEditorDetailPage.updateSubject('Thank you for supporting *|eventbeneficiaryname|*');
    })

    it('Verify template Sponsorship Purchase Receipt work correct', () => {
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        if(hasMailbox ==1 ) cy.emptyInbox(inboxId);
        emailEditorPage.clickEmailTemplate('Sponsorship Purchase Receipt');
        emailEditorDetailPage.verifyTemplateSponsorshipPurchaseReceiptHasAllParts('Sponsorship Purchase Receipt');
        emailEditorDetailPage.updateSubject('Testing : Thanks for your purchase supporting *|eventname|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks for your purchase supporting The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmaiTemplateSuccess(inboxId,'Testing : Thanks for your purchase supporting', 'We will follow up with you if additional information is required or if complimentary tickets are a part of this package.')
        emailEditorDetailPage.updateSubject('Thanks for your purchase supporting *|eventname|*');
    })

})