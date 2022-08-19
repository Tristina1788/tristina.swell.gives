import { HomePage } from "../Pages/homePage";
import { DonationsTablePage } from "../Pages/donationsTablePage";
import { DonationsAddressPage } from "../Pages/donationsAddressPage";
import { DonationsRegisterTablePage } from "../Pages/donationsRegisterTablePage";

let homePage = new HomePage();
let donationsTablePage =new DonationsTablePage();
let donationsAddressPage =new DonationsAddressPage();
let donationsRegisterTablePage =new DonationsRegisterTablePage();

const user = require('../../../fixtures/address.json')
describe('Verify Give a hot flow', () => {
    
    it('Verify information when Give a host',()=>{
        this.skip();
        cy.visit('https://tristina.swell.gives/');
        
        homePage.clickGiveAHostButton();
        donationsTablePage.selectTicketItem('Virtual Builder Table');
        donationsTablePage.clickNextButton();
        donationsAddressPage.inputAddressInfor(user.firstName, user.lastName, user.email, user.phone,
            user.company, user.address1, user.address2, user.city, user.state,
            user.zip)
        donationsRegisterTablePage.verifyEmailAdressIsDisplayed(user.email);
        donationsRegisterTablePage.clickNavigationTab('Your Table');
        donationsRegisterTablePage.verifyUserInformationIsDisplayed(user.firstName, user.lastName, user.email);
    })

})