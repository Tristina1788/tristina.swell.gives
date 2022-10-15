import { HomePage } from "../Pages/homePage";
import { TicketPage } from "../Pages/ticketPage";
import { Mailbox } from "../Pages/mailbox";
import { getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { FundraiserManagePage } from "../Pages/fundraiserManagePage";//
import { TicketManagePage } from "../Pages/ticketManagePage";//
import { TicketDetailManagePage } from "../Pages/ticketDetailManagePage";
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let ticketPage = new TicketPage();
let mailbox = new Mailbox();
let fundraiserManagePage =new FundraiserManagePage();
let ticketManagePage =new TicketManagePage();
let ticketDetailManagePage =new TicketDetailManagePage();
let loginManagePage =new LoginManagePage();
const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let hasMailbox = 0;
let randomName = getRandomText();
let randomLastName = getRandomText();
let randomEmail= getRandomEmail();
let randomNumber = getRandomNumber();
let randomCompany = getRandomText();
describe('Verify Tickets Manage flow', () => {
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

    it.only('Verify enable to create new Ticket from manage Page',()=>{
        cy.forceVisit(infors.urlManage);
        if(hasMailbox == 1 ) cy.emptyInbox(inboxId);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tickets');
        ticketManagePage.clickAddBtn();
        ticketDetailManagePage.inputTicketForm('','Test Ticket $33.00', true, 'abc table', 'test ticket',randomName,randomLastName,randomCompany,randomEmail,false, randomNumber,'grouest');
        ticketDetailManagePage.clickSaveButton();
        cy.reload();
        ticketManagePage.verifyTicketIsCreated(randomName + ' '+ randomLastName,randomEmail,'Test Ticket');
        
    })

    it.only('Verify enable to delete ticket from manage Page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/tickets');
        ticketManagePage.clickDeleteButton(randomName);
        ticketManagePage.verifyTicketIsNotPresent(randomName + ' '+ randomLastName,randomEmail,'Test Ticket');
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.verifyFundraiserIsExist(randomName + ' '+ randomLastName ,randomName+'.'+ randomLastName , randomEmail, true, 'grouest');
        fundraiserManagePage.clickDeleteButton(randomName);
    });

})