import { HomePage } from "../Pages/homePage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"
import { ThankYouPage } from "../Pages/thankYouPage";
import { RegisterPage } from "../Pages/registerPage";
import { Mailbox } from "../Pages/mailbox";

let homePage = new HomePage();
let registerPage =new RegisterPage();
let thankYouPage =new ThankYouPage();
let mailbox =new Mailbox();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
let inboxId = "";
let randomEmail = "";
let hasMailbox = 0;
describe('Verify Become A fundraiser flow', () => {
    it('clear the used inbox',()=>{
        cy.writeFile('./data/mailbox.json',{inboxId:"", emailAddress:"",hasMailbox:0 })
    })
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
    
    it.only('Verify information when become a fundraiser ',()=>{
        cy.forceVisit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
       // let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickBecomeAFundraiser();
        registerPage.verifyRegisterPage();
        registerPage.inputRegisterForm(randomName, randomLastName, randomPhone, randomEmail);
        registerPage.clickRegisterButton();
        thankYouPage.verifyThankYouPageAfterFundraiserSuccess(randomName, randomLastName);
        if(hasMailbox ==1 )
            mailbox.verifyMailboxGetEmailFundraiserSuccess(inboxId);
        thankYouPage.clickFundraiserUserLinks(randomName, randomLastName);

    })
})
