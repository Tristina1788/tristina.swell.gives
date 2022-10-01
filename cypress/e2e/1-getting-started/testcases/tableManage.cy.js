
import { TableDetailPage } from "../Pages/tableDetailPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { TableManageSetupPage } from "../Pages/tableManagPage";
import { Mailbox } from "../Pages/mailbox";

import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy";
let loginManagePage = new LoginManagePage();
let tableDetailPage = new TableDetailPage();
let tableManageSetupPage = new TableManageSetupPage();
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
before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify the fundraiser Manage flow', () => {
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
            console.log("randomEmail:"+randomEmail);
        });
    });
    it.only('Verify enable to create new table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickAddBtn();
        tableDetailPage.inputTableForm(firstName, 'Test Table', number, firstHostName, lastHostName, randomEmail, true);
        tableDetailPage.clickSaveBtn();
        tableDetailPage.verifySaveSuccess();
        tableDetailPage.clickConfirmButton();
        tableManageSetupPage.verifyTableIsExist(firstName , number, 'Test Table', firstHostName+' '+lastHostName);
        tableManageSetupPage.clickEmailBtn(firstName);
        tableManageSetupPage.inputEmailAndSend(randomEmail);
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailBecomeHostSuccess(inboxId);

    });

    it.only('Verify enable to update table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickSwitchListView();
        tableManageSetupPage.clickEditButton(number+ ' '+firstName);
        tableDetailPage.inputTableForm(firstName1, 'Test Table', number1, firstHostName1, lastHostName1, randomEmail, true);
        tableDetailPage.clickSaveBtn();
        tableDetailPage.verifySaveSuccess();
        tableDetailPage.clickConfirmButton();
        tableManageSetupPage.clickSwitchListView();
        tableManageSetupPage.verifyTableIsExist(firstName1 , number1, 'Test Table', firstHostName1+' '+lastHostName1);
    });

    it.only('Verify enable to delete table/team from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tables');
        tableManageSetupPage.clickDeleteButton(firstName1);
        tableManageSetupPage.verifyTableIsNotExist(firstName1);
    });

})