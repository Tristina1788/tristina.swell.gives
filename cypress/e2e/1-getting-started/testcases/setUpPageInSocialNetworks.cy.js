import { HomePage } from "../Pages/homePage";
import { SocialNetworkManageSetupPage} from "../Pages/socialNetworkManageSetupPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { getRandomText } from "./generalFunction.cy";
const infors = require('../utils/infor.js');
let socialNetworkManageSetupPage =new SocialNetworkManageSetupPage();
let homePage = new HomePage();
let loginManagePage =new LoginManagePage();

let facebookID = getRandomText();
let twitterUsername = getRandomText();
let socialHashtag = getRandomText();
let message = getRandomText();

before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});

describe('Verify setup social network page', () => {
    it.only('Verify update social network page successfully and enable to use on frontend',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/social/settings');
        
        socialNetworkManageSetupPage.inputFormInfor(facebookID, twitterUsername, socialHashtag, message );
        socialNetworkManageSetupPage.clickSaveChangesBtn();
        socialNetworkManageSetupPage.verifySaveSuccessfully();
        cy.reload();
        socialNetworkManageSetupPage.verifyUpdateFormSuccess(facebookID, twitterUsername, socialHashtag, message );
        cy.forceVisit(infors.url);
        homePage.verifyTweetTagCorrect(socialHashtag);
    })
})