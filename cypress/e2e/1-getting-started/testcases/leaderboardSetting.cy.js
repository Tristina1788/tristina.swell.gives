import { HomePage } from "../Pages/homePage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { LeaderboardSettingPage } from "../Pages/leaderboardSettingPage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { getRandomText } from "./generalFunction.cy";

let homePage = new HomePage();
let loginManagePage =new LoginManagePage();
let leaderboardSettingPage = new LeaderboardSettingPage();
let settingSetupPage = new SettingSetupPage();

const infors = require('../utils/infor.js')
let topFundraiserLb = getRandomText();
let topTableLb = getRandomText();
let mostsociallb = getRandomText();
let teamlb = getRandomText();

before(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});

describe('Verify setup Button General Setting page', () => {
    
    it.only('Verify setup leaderboar Setting with all options true and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingLeaderboardPage();
        leaderboardSettingPage.inputLeaderBoardSetting(true,true,topFundraiserLb, true,topTableLb, true, mostsociallb,true,teamlb);
        leaderboardSettingPage.clickSaveButton();
        leaderboardSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingLeaderboardSuccessfully(true,true,topFundraiserLb, true,topTableLb, true, mostsociallb,true,teamlb);
    })

    it.only('Verify setup leaderboar Setting with leaderboard is false, another options are true and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingLeaderboardPage();
        leaderboardSettingPage.inputLeaderBoardSetting(false,true,topFundraiserLb, true,topTableLb, true, mostsociallb,true,teamlb);
        leaderboardSettingPage.clickSaveButton();
        leaderboardSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingLeaderboardSuccessfully(false,true,topFundraiserLb, true,topTableLb, true, mostsociallb,true,teamlb);
    })

    it.only('Verify setup leaderboar Setting with leaderboard is true, options are true/false and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingLeaderboardPage();
        leaderboardSettingPage.inputLeaderBoardSetting(true,true,topFundraiserLb, true,topTableLb, false, mostsociallb,false,teamlb);
        leaderboardSettingPage.clickSaveButton();
        leaderboardSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingLeaderboardSuccessfully(true,true,topFundraiserLb, true,topTableLb, false, mostsociallb,false,teamlb);
    })

    it.only('Verify setup leaderboar Setting with default and front end will update follow this setup',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingLeaderboardPage();
        leaderboardSettingPage.inputLeaderBoardSetting(true,true,"", true,"", true, "",true,"");
        leaderboardSettingPage.clickSaveButton();
        leaderboardSettingPage.verifySaveSuccessfully();
        cy.forceVisit(infors.url);
        homePage.verifySettingLeaderboardSuccessfully(true,true,"Top Fundraisers", true,"Table", true, "Most Social",true,"Teams");
    })

})
