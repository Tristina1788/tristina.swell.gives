
import { TableDetailPage } from "../Pages/tableDetailPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TableManageSetupPage } from "../Pages/tableManagPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
import { TablePage } from "../Pages/tablePage";
import { DonationSettingPage } from "../Pages/donationSettingPage";
import {FundraiserDetailPage } from "../Pages/fundraiserDetailPage";

let loginManagePage = new LoginManagePage();
let tableDetailPage = new TableDetailPage();
let tableManageSetupPage = new TableManageSetupPage();
let donationsRegisterTablePage = new DonationsRegisterTablePage();
let fundraiserDetailPage = new FundraiserDetailPage();
let tablePage = new TablePage();
let mailbox = new Mailbox();
const infors = require('../utils/infor.js');
let firstName = getRandomText();
let firstHostName = getRandomText();
let lastHostName = getRandomText();
let number = Math.floor(Math.random() * 100000) + 1;
let firstName1 = getRandomText();
let firstHostName1 = getRandomText();
let lastHostName1 = getRandomText();
let number1 = Math.floor(Math.random() * 100000) + 1;
let inboxId = "";
let randomEmail = "";
let hasMailbox = 0;
let randomNameGuest = getRandomText();
let randomLastNameGuest = getRandomText();
let randomEmailGuest = getRandomEmail();// getEmailTest();
let randomNameGuest2 = getRandomText();
let randomLastNameGuest2 = getRandomText();
let randomEmailGuest2 = getRandomEmail();
before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify the table Manage flow',{
    retries: {
      runMode: 2,
      openMode: 1,
    }
  }, () => {
    it('setup mailbox inbox',()=>{
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
            console.log("randomEmail:"+randomEmail);
        });
    });
    it('Verify enable to create new table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        if(hasMailbox ==1 )
            cy.emptyInbox(inboxId);
        tableManageSetupPage.clickAddBtn();
        tableDetailPage.inputTableForm(firstName, 'Test Table', number, firstHostName, lastHostName, randomEmail, true);
        tableDetailPage.clickSaveBtn();
        tableDetailPage.verifySaveSuccess();
        tableDetailPage.clickConfirmButton();
        tableManageSetupPage.verifyTableIsExist(firstName , number, 'Test Table', firstHostName+' '+lastHostName);
        
        tableManageSetupPage.clickEmailBtn(firstName);
        tableManageSetupPage.inputEmailAndSend(randomEmail);
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailHostingTableSuccess(inboxId);
    });

    it('Verify fundraising page from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickFundraisingBtn(firstName);
        tablePage.VerifyGiveNowButtonHasCorrectAction(infors.urlAction, infors.idProject);
        tablePage.verifyPurchaseTicketsButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeASponsorshipButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeAHostButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeAFundraiserButtonHasCorrectAction(infors.urlCheckoutAction);
        tablePage.verifyUIShowDonorInfo();
    });

    it('Verify enable to registration from manage Page',()=>{
        randomEmailGuest = randomEmail;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        if(hasMailbox ==1 ) 
            cy.emptyInbox(inboxId);
        tableManageSetupPage.clickRegisterBtn(firstName);
        donationsRegisterTablePage.clickNavigationTab('Your');
        donationsRegisterTablePage.verifyYourTableFromManagePageIsDisplayed(firstName,firstHostName, lastHostName, randomEmail);
        donationsRegisterTablePage.clickNavigationTab('Guest');
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest, randomLastNameGuest, randomEmailGuest, 0);
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest2, randomLastNameGuest2, randomEmailGuest2, 1);
        donationsRegisterTablePage.clickInviteGuestButton();
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailBecomeHostGuestSuccess(inboxId,firstHostName);
        donationsRegisterTablePage.verifyInviteSuccess(randomNameGuest, randomLastNameGuest, randomEmailGuest);
        donationsRegisterTablePage.clickCancelInviteGuestButton(0);
        donationsRegisterTablePage.clickCancelInviteGuestButton(1);
        donationsRegisterTablePage.verifyCancelInviteGuestSuccess();
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest, randomLastNameGuest, randomEmailGuest, 0);
        donationsRegisterTablePage.inputGuestInformation(randomNameGuest2, randomLastNameGuest2, randomEmailGuest2, 1);
        donationsRegisterTablePage.clickInviteGuestButton();
       
    });

    it('Verify guest list work correct from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickSwitchListView();
        cy.wait(10000);
        tableManageSetupPage.clickGuestList(number+ ' '+firstName);
        tableManageSetupPage.verifyInforOfGuest(randomNameGuest + ' '+randomLastNameGuest, randomEmailGuest);
        tableManageSetupPage.verifyInforOfGuest(randomNameGuest2 + ' '+randomLastNameGuest2, randomEmailGuest2);

    });
    it('Verify enable to add a seat/ticket for table/team from manage Page',()=>{
        
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickSwitchListView();
        cy.wait(10000);
        
        tableManageSetupPage.clickGuestList(number+ ' '+firstName);
        // tableManageSetupPage.clickGuestList('74405 YFaDznhpjh');
        tableManageSetupPage.clickAddASeatButton();
        tableManageSetupPage.verifyPopupAddingSeat();
        tableManageSetupPage.clickYesAddSeatBtn();
        tableManageSetupPage.clickOKButtonInPopupConfirm();
        tableManageSetupPage.verifyRemoveSeatIsDisabled(false);
        tableManageSetupPage.clickAddressGuestButton();
        tableManageSetupPage.clickNewFundraiser();
        let fName = getRandomText();
        let lastName = getRandomText();
        let company = getRandomText();
        let phone = getRandomNumber();
        let email = getRandomEmail();
        tableManageSetupPage.inputFundraiserTableForm(fName,lastName,email,company,"grouest");
        tableManageSetupPage.clickSaveBtn();
        tableManageSetupPage.clickOKButtonInPopupConfirm();
        tableManageSetupPage.clickAssignBtn();
        tableManageSetupPage.clickOKButtonInPopupConfirm();
        tableManageSetupPage.verifyInforOfGuest(fName + ' '+lastName, email);
        tableManageSetupPage.verifyRemoveSeatIsDisabled(true);
        tableManageSetupPage.clickRemoveFundraiserBtn();
        tableManageSetupPage.clickOKButtonInPopupConfirm();
        tableManageSetupPage.verifyInforOfGuestDontExit(fName + ' '+lastName, email);
        tableManageSetupPage.clickRemoveSeatBtn();
        tableManageSetupPage.clickOKButtonInPopupConfirm();
        tableManageSetupPage.verifyDeleteGuestSuccess();
    });

    it('Verify enable to update table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        cy.wait(2000);
        tableManageSetupPage.clickSwitchListView();
        tableManageSetupPage.clickEditButton(number+ ' '+firstName);
        tableDetailPage.inputTableForm(firstName1, 'Test Table', number1, firstHostName1, lastHostName1, randomEmail, true);
        tableDetailPage.clickSaveBtn();
        tableDetailPage.verifySaveSuccess();
        tableDetailPage.clickConfirmButton();
        tableManageSetupPage.clickSwitchListView();
        tableManageSetupPage.verifyTableIsExist(firstName1 , number1, 'Test Table', firstHostName1+' '+lastHostName1,0,2,0,2);
    });

    

    it('Verify enable to delete table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickDeleteButton(firstName1);
        tableManageSetupPage.verifyTableIsNotExist(firstName1);
    });

})