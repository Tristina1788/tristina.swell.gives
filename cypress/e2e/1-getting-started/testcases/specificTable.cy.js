import { HomePage } from "../Pages/homePage";
import { TablePage } from "../Pages/tablePage";

let homePage = new HomePage();
let tablePage =new TablePage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify table page', () => {
    
    it('Verify user in Top table board has correction fuction in table page',()=>{
        cy.visit(infors.url);
        homePage.clickFirstTableInTableBoard();
        tablePage.VerifyGiveNowButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyPurchaseTicketsButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeASponsorshipButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeAHostButtonHasCorrectAction(infors.urlAction);
        tablePage.verifyBecomeAFundraiserButtonHasCorrectAction(infors.urlCheckoutAction);
        tablePage.verifyUIShowDonorInfo();
    })

})
