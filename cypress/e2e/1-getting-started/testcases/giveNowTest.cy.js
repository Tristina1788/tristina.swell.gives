import { HomePage } from "../Pages/homePage";
import { DonationsAmountPage} from "../Pages/donationsAmountPage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsPaymentPage } from "../Pages/donationsPaymentPage";
import { generalFunction, getNameRandom, getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"

let homePage = new HomePage();
let donationsAmountPage = new DonationsAmountPage();
let donationsAddressPage =new DonationsAddressPage();
let donationsPaymentPage =new DonationsPaymentPage();

const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
describe('Verify Give Now flow', () => {
    
    it('Verify Give Now with all options',()=>{
        cy.visit(infors.url);
        let randomName = getRandomText();
        let randomLastName = getRandomText();
        let randomEmail = getRandomEmail();
        let randomPhone = getRandomNumber();
        homePage.clickGiveNowButton();
        donationsAmountPage.selectFee(infors.amountGiveNowTest);
        donationsAmountPage.verifyFeeSelectionCorrect(infors.amountGiveNowTest);
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.verifyAmountAfterFee(infors.amountGiveNowFeeTest);
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.selectfullFillGiftLater();
        donationsAmountPage.verifyWarningFullFillShow();randomPhone
        donationsAmountPage.inputFormFullFillLater(randomName, randomLastName, randomEmail, randomPhone);
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickPledgeButton();
        donationsAmountPage.verifyShowThankYouPledge();
    })

    it('Verify Give Now without option full fill later',()=>{
        cy.visit(infors.url);
        
        homePage.clickGiveNowButton();
        donationsAmountPage.selectFee(infors.amountGiveNowTest);
        donationsAmountPage.verifyFeeSelectionCorrect(infors.amountGiveNowTest);
        donationsAmountPage.selectCoverTransaction();
        donationsAmountPage.verifyAmountAfterFee(infors.amountGiveNowFeeTest);
        donationsAmountPage.selectRecurringContribution();
        donationsAmountPage.verifyWarningBillTimeShow();
        donationsAmountPage.selectOption1stBill();
        donationsAmountPage.selectMakeGiftAnonymous();
        donationsAmountPage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, user.email, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip);
        donationsAddressPage.clickNextButton();
        donationsPaymentPage.inputCreditCard(infors.creditCardNumber, user.firstName, infors.creditCardVCV);
        donationsPaymentPage.clickDonateButton(infors.amountGiveNowFeeTest);
        donationsPaymentPage.verifyTransactionFinish();
    })

})