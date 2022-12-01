import { ProductSetupPage } from "../Pages/productSetupPage";
import { ProductsManageSetupPage } from "../Pages/productsManageSetupPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import { LeaderboardSettingPage } from "../Pages/leaderboardSettingPage";
import { SettingSetupPage } from "../Pages/settingSetupPage";
import { ButtonSettingPage } from "../Pages/buttonSettingPage";
import { SponsorshipSettingPage } from "../Pages/sponsorshipSettingPage";
import { TicketsSettingPage } from "../Pages/ticketsSettingPage";
import { DonationSettingPage } from "../Pages/donationSettingPage";
import { CouponSetupPage } from "../Pages/couponSetupPage";
import { CouponManageSetupPage} from "../Pages/couponManageSetupPage";
import { SocialNetworkManageSetupPage} from "../Pages/socialNetworkManageSetupPage";
import { BranchSetupPage } from "../Pages/branchSetupPage";
import { DetailSetupPage } from "../Pages/detailSetupPage";
import { EmailEditorDetailPage } from "../Pages/emailEditorDetailPage";
import { EmailEditorPage } from "../Pages/emailEditorPage";
import { CompManagePage } from "../Pages/compManagePage";
import { CompSetupPage} from "../Pages/compSetupPage";
import { ContentSetupPage } from "../Pages/contentSetupPage";
import { ContentManageSetupPage} from "../Pages/contentManageSetupPage";
import { DashboardManagePage } from "../Pages/dashboardManagePage";
import { FundraiserManagePage } from "../Pages/fundraiserManagePage";
import { GroupManageSetupPage } from "../Pages/groupManageSetupPage";
import { GroupSetupPage } from "../Pages/groupSetupPage";
import { FundraiserDetailPage } from "../Pages/fundraiserDetailPage";
let fundraiserDetailPage = new FundraiserDetailPage();
let groupSetupPage =new GroupSetupPage();
let groupManageSetupPage = new GroupManageSetupPage();
let fundraiserManagePage = new FundraiserManagePage();
let dashboardManagePage = new DashboardManagePage
let contentSetupPage =new ContentSetupPage();
let contentManageSetupPage =new ContentManageSetupPage();
let compManagePage =new CompManagePage();
let compSetupPage =new CompSetupPage();
let emailEditorDetailPage = new EmailEditorDetailPage();
let emailEditorPage = new EmailEditorPage();
import { getCurrentDateTime, getCurrentTime, getEmailTest, getRandomEmail, getRandomLocation, getRandomNumber, getRandomText } from "./generalFunction.cy"
let detailSetupPage =new DetailSetupPage();
let branchSetupPage =new BranchSetupPage();
let socialNetworkManageSetupPage =new SocialNetworkManageSetupPage();
let couponSetupPage =new CouponSetupPage();
let couponManageSetupPage =new CouponManageSetupPage();
let donationSettingPage = new DonationSettingPage();
let ticketsSettingPage = new TicketsSettingPage();
let buttonSettingPage = new ButtonSettingPage();
let sponsorshipSettingPage = new SponsorshipSettingPage();
let leaderboardSettingPage = new LeaderboardSettingPage();
let settingSetupPage = new SettingSetupPage();
let productSetupPage = new ProductSetupPage();
let productsManageSetupPage = new ProductsManageSetupPage();
let loginManagePage =new LoginManagePage();
const infors = require('../utils/infor.js')
const userFullFill = require('../../../fixtures/fullFillInfor.json')
const user = require('../../../fixtures/address.json')
let needSetup = false;
beforeEach(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
});
describe('Prepare new data for event testing', () => {
    it('check if need set up pre data',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject);
        cy.get("body").then($body => {
            if ($body.text().includes("Is Your Site Ready?"))  
                needSetup = true;
            else needSetup = false;
           
        });
        console.log("needSetup :"+needSetup);
    })

    it('Set up detail page for pre data',()=>{
        if (!needSetup) return;
        let noneProfitName = getRandomText();
        let name = getRandomText();
        let desc = getRandomText();
        let dateCurrent = getCurrentDateTime();
        let time = getCurrentTime();
        let location = getRandomLocation();
        detailSetupPage.visit(infors.urlManage+'events/'+infors.idProject+'/details');
        detailSetupPage.inputNonProfitNameDetails(noneProfitName);
        detailSetupPage.inputNameEventDetails(name);
        detailSetupPage.inputDescriptionEventDetails(desc);
        detailSetupPage.inputDateEventDetails(dateCurrent);
        detailSetupPage.inputTimeEventDetails(time);
        detailSetupPage.inputLocationEventDetails(location);
        detailSetupPage.clickSaveBtn();
        detailSetupPage.VerifyUpdateFormSuccess();
        cy.reload();

    })

    it('Setup Branding image for pre data',()=>{
        if (!needSetup) return;
        branchSetupPage.visit(infors.urlManage+'events/'+infors.idProject+'/branding');
        branchSetupPage.verifyHaveAllUploadImages();
        branchSetupPage.verifyUnableToUploadWrongSizeImage();
        branchSetupPage.verifyEnableToUploadCorrectSizeImage();
        branchSetupPage.clickSaveBtn();
    })

    it('Setup social Network for pre data',()=>{
        if (!needSetup) return;
        let facebookID = getRandomText();
        let twitterUsername = getRandomText();
        let socialHashtag = getRandomText();
        let message = getRandomText();
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/social/settings');
        socialNetworkManageSetupPage.inputFormInfor(facebookID, twitterUsername, socialHashtag, message );
        socialNetworkManageSetupPage.clickSaveChangesBtn();
        socialNetworkManageSetupPage.verifySaveSuccessfully();
    })
    it('Setup coupon page for pre data',()=>{
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/coupons');
        
        couponManageSetupPage.clickAddBtn();
        couponSetupPage.inputFormCoupon(infors.PreCouponsCode, infors.PreCouponsPercent);
        couponSetupPage.clickSaveBtn();
        
        couponManageSetupPage.clickOKButton();
        couponManageSetupPage.verifyCounponPageIsExist(infors.PreCouponsCode, infors.PreCouponsPercent);
    })

    it('Setup products for pre data',()=>{
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/products');
        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Ticket', infors.ticketName, true, false, infors.ticketPrice, infors.maxTicket, 0);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Ticket', infors.ticketName, true, false, infors.ticketPrice, infors.maxTicket, 0);

        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Ticket', infors.virtualTicketName, true, false, infors.virtualTicketPrice, infors.maxTicket, 0);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Ticket', infors.virtualTicketName, true, false, infors.virtualTicketPrice, infors.maxTicket, 0);

        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Sponsorship', infors.sponsorItemName, true, false,  infors.sponsorItemPice, infors.maxTicket, 0);
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Sponsorship', infors.sponsorItemName, true, false,  infors.sponsorItemPice, infors.maxTicket, 0);

        productsManageSetupPage.clickAddBtn();
        productSetupPage.inputProductForm('Table/Team', infors.tableItem, true, false, infors.tablePriceNumber,  infors.maxTicket, 2, "Virtual Test Ticket (51.00)");
        productSetupPage.clickSaveBtn();
        productsManageSetupPage.verifyNewProductIsCreated('Table', infors.tableItem, true, false, "1,201",  infors.maxTicket, 2, "Virtual Test Ticket");

    })

    it('Verify create comps ticket page successfully',()=>{
        if (!needSetup) return;
        let code = getRandomText();
        let internalNote = getRandomText();
        let lname = getRandomText();
        let fname = getRandomText();
        let randomEmail = getRandomEmail();
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/promos');
        compManagePage.clickAddBtn();
        compSetupPage.inputCompTicketsForm(code, "Test Ticket", 2, internalNote,lname, fname, randomEmail);
        compSetupPage.clickSaveAndSendEmailButton();
        compSetupPage.VerifyUpdateFormSuccess();
        cy.reload();
        compManagePage.verifycompTicketIsExist(code, "Test Ticket", 2, internalNote,lname, fname, randomEmail);

    })

    it('Setup setting - donation page pre test ', () => {
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingDonationPage();
        donationSettingPage.inputFormDonationSetting("",0,true,true,true,true,true,true,"","","","",
            "",false,"","","");
        donationSettingPage.clickSaveButton();
        donationSettingPage.verifySaveSuccessfully();  

    })

    it('Setup setting - ticket page pre test ', () => {
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');

        settingSetupPage.openSettingTicketPage();
        ticketsSettingPage.inputTicketSetingForm("", "", "", "", "", "",true, true, "", "");
        ticketsSettingPage.clickSaveButton();
        ticketsSettingPage.verifySaveSuccessfully();  
        ticketsSettingPage.clickOKButton();

    })

    it('Setup setting - sponsorship page pre test ', () => {
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingSponsorshipPage();
        sponsorshipSettingPage.inputSponsorshipForm("", "", "Thank you for considering a sponsorship.<br>Please select the sponsorship type from the menu.<br>We will follow up about the details of your sponsorship package including your company logo,<br>complimentary tickets and additional perks.");
        sponsorshipSettingPage.clickSaveBtn();
        sponsorshipSettingPage.verifySaveSuccessfully();  
        sponsorshipSettingPage.clickOKButton();
    })

    it('Setup setting - Button pre test ', () => {
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingButtonPage();
        buttonSettingPage.inputGeneralButtonSetting("", "", "", "","",true);
        buttonSettingPage.clickSaveButton();
        buttonSettingPage.verifySaveSuccessfully();
    })

    it('Setup setting - Leaderboar pre test ', () => {
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/donation');
        settingSetupPage.openSettingLeaderboardPage();
        leaderboardSettingPage.inputLeaderBoardSetting(true,true,"", true,"", true, "",true,"");
        leaderboardSettingPage.clickSaveButton();
        leaderboardSettingPage.verifySaveSuccessfully();
    })

    it('Setup setting - Email template pre test ', () => {
        if (!needSetup) return;
        let randomEmail = getRandomEmail();
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/email-editor',{timeout:200000});
        emailEditorPage.verifyAllTemplateExist();
        emailEditorPage.clickEmailTemplate('Guest Check In');
        emailEditorDetailPage.verifyTemplateEmailHasAllParts('Guest Check In');
        emailEditorDetailPage.updateSubject('Testing : Thanks *|fundraiserFirstName|* for Checking In to *|eventName|*');
        emailEditorDetailPage.clickSaveBtn();
        emailEditorDetailPage.verifySubjectAfterUpdate('Testing : Thanks John for Checking In to The Good Dinner');
        emailEditorDetailPage.inputEmail(randomEmail);
        emailEditorDetailPage.clickSendEmail();
        emailEditorDetailPage.verifySendEmailSuccess();
        emailEditorDetailPage.updateSubject('Thanks *|fundraiserFirstName|* for Checking In to *|eventName|*');
    })

    it('Verify setup content page pre test',()=>{
        if (!needSetup) return;
        let contentSetupPage =new ContentSetupPage();
        let contentManageSetupPage =new ContentManageSetupPage();
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        
        contentManageSetupPage.clickEditButton("index");
        contentSetupPage.updateFormContent("index", "Home12", 1, true, false, "Home Page Test 123");
        contentSetupPage.clickSaveButton();
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickEditButton("index");
        contentSetupPage.updateFormContent("index", "Home", 1, true, false, "Home Page");
        contentSetupPage.clickSaveButton();

    })

    it('Verify setup group pre test',()=>{
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/team');
        groupManageSetupPage.clickAddBtn();
        groupSetupPage.inputGroupName("grouest");
        groupSetupPage.clickSaveBtn();
        groupSetupPage.VerifyUpdateFormSuccess();

    })

    it('Verify setup fundraiser pre test',()=>{
        if (!needSetup) return;
        let company = getRandomText();
        let phone = getRandomNumber();
        let bidNumber = getRandomNumber();
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/fundraisers');
        fundraiserManagePage.clickAddBtn();
        fundraiserDetailPage.inputFundraiserForm('No Referral', "ABC", "DEF", company, "abcdef@gmail.com", true, phone, bidNumber, 'Physical', 'grouest');
        fundraiserDetailPage.clickSaveBtn();
        fundraiserDetailPage.verifySaveSuccess();

    })

    it('Finish Setup test',()=>{
        if (!needSetup) return;
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject );

        cy.get('.task-done').then(($el) => { 
            const itemCount = Cypress.$($el).length;
            cy.log(itemCount)
            if(itemCount == 5)
            cy.get('button').contains('m Ready').click();
            cy.get('button').contains('Yes, go live!',{timeout:10000}).click();
            cy.get('button').contains('OK',{timeout:10000}).click();
        })
            
    })

    

})