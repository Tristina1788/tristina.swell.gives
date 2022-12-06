import { HomePage } from "../Pages/homePage";
import { TicketPage } from "../Pages/ticketPage";
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { FundraiserManagePage } from "../Pages/fundraiserManagePage";//
import { TransactionManagePage } from "../Pages/transactionManagePage";//
import { TransactionDetailManagePage } from "../Pages/transactionDetailManagePage";
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let ticketPage = new TicketPage();
let mailbox = new Mailbox();
let fundraiserManagePage =new FundraiserManagePage();
let transactionManagePage =new TransactionManagePage();
let transactionDetailManagePage =new TransactionDetailManagePage();
let loginManagePage =new LoginManagePage();
const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let hasMailbox = 0;
let randomNameTr = getRandomText();
let randomLastNameTr = getRandomText();
let randomEmailTr= getRandomEmail();
let randomPhoneTr = getRandomNumber();
let randomCompanyTr = getRandomText();
let randomHonor = getRandomText();
let randomDesc = getRandomText();
let randomAmount= Math.floor(Math.random() * 90) + 0;
let randomName = getRandomText();
let randomLastName = getRandomText();
let randomEmail= getRandomEmail();
let randomNumber = getRandomNumber();
let randomCompany = getRandomText();

let randomNameTrUpdate = getRandomText();
let randomLastNameTrUpdate = getRandomText();
let randomEmailTrUpdate = getRandomEmail();
let randomPhoneTrUpdate = getRandomNumber();
let randomCompanyTrUpdate = getRandomText();
let randomHonorUpdate = getRandomText();
let randomDescUpdate = getRandomText();
let randomAmountUpdate= Math.floor(Math.random() * 90) + 0;
let randomNameUpdate = getRandomText();
let randomLastNameUpdate = getRandomText();
let randomEmailUpdate = getRandomEmail();
let randomNumberUpdate = getRandomNumber();
let randomCompanyUpdate = getRandomText();
beforeEach(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Verify Transaction Manage flow', () => {
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
    
    it.only('Verify enable to create new transaction from manage Page',()=>{
        cy.forceVisit(infors.urlManage);
        if(hasMailbox ==1 ) 
            cy.emptyInbox(inboxId);
        if(hasMailbox == 1 ) cy.emptyInbox(inboxId);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        transactionManagePage.clickAddBtn();
       
        transactionDetailManagePage.inputTranactionForm('',randomNameTr, randomLastNameTr, randomCompanyTr, randomEmailTr, randomPhoneTr,
        'Donation', randomAmount, randomHonor,true, randomDesc, randomName,randomLastName,randomCompany,randomEmail,false, randomNumber,'');
        transactionDetailManagePage.clickSaveButton();
        cy.reload();
        transactionManagePage.verifyTransactionIsCreated('Donation',randomNameTr,randomLastNameTr, randomEmail,'$'+randomAmount+'.00');
        transactionManagePage.clickSendEmail();
        if(hasMailbox ==1 ) 
            mailbox.verifyMailboxGetEmailPurchaseSuccess(inboxId);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.verifyFundraiserIsExist(randomName + ' '+ randomLastName ,randomName+'.'+ randomLastName , randomEmail, false, '');

    })

    it.only('Verify enable to update transaction from manage Page',()=>{
        
        let randomAmount= Math.floor(Math.random() * 90) + 0;
        cy.forceVisit(infors.urlManage);
        if(hasMailbox == 1 ) cy.emptyInbox(inboxId);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        transactionManagePage.clickEditButton(randomNameTr)
       
        transactionDetailManagePage.inputTranactionForm('',randomNameTrUpdate, randomLastNameTrUpdate, randomCompanyTrUpdate, randomEmailTrUpdate, randomPhoneTrUpdate,
        'Donation', randomAmountUpdate, randomHonorUpdate,false, randomDescUpdate, randomNameUpdate ,randomLastNameUpdate ,randomCompanyUpdate ,randomEmailUpdate,false, randomNumberUpdate,'');
        transactionDetailManagePage.clickSaveButton();
        cy.wait(1000);
        cy.reload();
        transactionManagePage.verifyTransactionIsCreated('Donation',randomNameTrUpdate, randomLastNameTrUpdate, randomEmailUpdate,'$'+randomAmountUpdate+'.00');
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.verifyFundraiserIsExist(randomNameUpdate + ' '+ randomLastNameUpdate ,randomNameUpdate+'.'+ randomLastNameUpdate , randomEmailUpdate, false, '');
    })

    it.only('Verify enable to delete transaction from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/transactions');
        transactionManagePage.clickDeleteButton(randomNameTrUpdate);
        transactionManagePage.verifyTransactionIsNotPresent(randomNameTrUpdate);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickDeleteButton(randomNameUpdate);
    });

    

})