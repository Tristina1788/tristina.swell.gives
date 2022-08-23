import { HomePage } from "../Pages/homePage";
import { UsersPage } from "../Pages/usersPage";

let homePage = new HomePage();
let usersPage =new UsersPage();
const infors = require('../utils/infor.js')
const user = require('../../../fixtures/address.json')
describe('Verify user page', () => {
    
    it('Verify user in Top Fundraisers board has correct fuctions in user page',()=>{
        cy.visit(infors.url);
        homePage.clickFirstUserInTopFundraiser();
        usersPage.VerifyGiveNowButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyPurchaseTicketsButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeASponsorshipButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeAHostButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeAFundraiserButtonHasCorrectAction(infors.urlCheckoutAction);
        usersPage.verifyUIShowDonorInfo();
    })

    it('verify user in Most Social board has correct fuctions in user page',()=>{
        cy.visit(infors.url);
        homePage.clickFirstUserInTopFundraiser();
        usersPage.VerifyGiveNowButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyPurchaseTicketsButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeASponsorshipButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeAHostButtonHasCorrectAction(infors.urlAction);
        usersPage.verifyBecomeAFundraiserButtonHasCorrectAction(infors.urlCheckoutAction);
        usersPage.verifyUIShowDonorInfo();
    })
})
