import { HomePage } from "../Pages/homePage";
import { ContentSetupPage } from "../Pages/contentSetupPage";
import { ContentManageSetupPage} from "../Pages/contentManageSetupPage";
import { getRandomText } from "./generalFunction.cy";
import { LoginManagePage } from "../Pages/loginManagePage";
let homePage = new HomePage();
let loginManagePage =new LoginManagePage();

const infors = require('../utils/infor.js')
let contentSetupPage =new ContentSetupPage();
let contentManageSetupPage =new ContentManageSetupPage();
let urlCt = getRandomText();
let linkct = getRandomText();
let contentct = getRandomText();

Cypress.Cookies.defaults({
    preserve: 'laravel_session'
})

beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});

describe('Verify setup content page', () => {
   
    
    it.only('Verify create content page successfully with active = true',()=>{
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        
        contentManageSetupPage.clickAddBtn();
        contentSetupPage.inputFormContent(urlCt, linkct, infors.sortOrder, true, false, contentct);
        contentSetupPage.clickSaveButton();
        contentSetupPage.clickBackManageContentPage();
        contentManageSetupPage.verifyNewContentPageIsCreated(urlCt, linkct, infors.sortOrder, true, false, contentct);
        contentManageSetupPage.visit(infors.url);
        homePage.verifyNewPageActiveInFrontEnd(urlCt, linkct, contentct);

    })

    it.only('Verify order content page work correctly',()=>{
       
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickAddBtn();
        contentSetupPage.inputFormContent(urlCt+'_order', linkct+'_order', 3, true, false, contentct+'_order');
        contentSetupPage.clickSaveButton();
        contentSetupPage.clickBackManageContentPage();
        contentManageSetupPage.verifyNewContentPageIsCreated(urlCt+'_order', linkct+'_order', 3, true, false, contentct+'_order');
        contentManageSetupPage.visit(infors.url);
        homePage.verifyNewPageActiveInFrontEnd(urlCt, linkct, contentct);
        homePage.verifyNewPageHasCorrectOrderInFrontEnd(linkct,linkct+'_order');
        cy.forceVisit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickDeleteButton(urlCt+'_order');
        contentManageSetupPage.verifyDeleteSuccess();
        homePage.verifyNewPageIsCDeletedSuccessfullyInFrontEnd(infors.url + '/'+urlCt+'_order');

    })

   
    it.only('Verify enable to update content page successfully',()=>{
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickEditButton(urlCt);
        contentSetupPage.verifyFormContent(urlCt, linkct, infors.sortOrder, true, false, contentct);
        contentSetupPage.updateFormContent(urlCt+'_update', linkct+'_update', infors.sortOrder, contentct+'_update');
        contentSetupPage.clickSaveButton();
        contentSetupPage.clickBackManageContentPage();
        contentManageSetupPage.verifyNewContentPageIsCreated(urlCt+'_update', linkct+'_update', infors.sortOrder, true, false, contentct+'_update');
        contentManageSetupPage.visit(infors.url);
        homePage.verifyNewPageIsCreatedSuccessfullyInFrontEnd(urlCt+'_update', linkct+'_update', contentct+'_update');
        
    })

    it.only('Verify enable to delete content page successfully',()=>{
        cy.forceVisit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickDeleteButton(urlCt);
        contentManageSetupPage.verifyDeleteSuccess();
        homePage.verifyNewPageIsCDeletedSuccessfullyInFrontEnd(infors.url + '/'+urlCt+'_update');

    })


    it.only('Verify create content page successfully with active = false',()=>{
       
        loginManagePage.visit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickAddBtn();
        contentSetupPage.inputFormContent(urlCt, linkct, infors.sortOrder, false, false, contentct);
        contentSetupPage.clickSaveButton();
        contentSetupPage.clickBackManageContentPage();
        contentManageSetupPage.verifyNewContentPageIsCreated(urlCt, linkct, infors.sortOrder, false, false, contentct);
        contentManageSetupPage.visit(infors.url);
        homePage.verifyNewPageInactiveInFrontEnd(infors.url + '/'+urlCt, linkct, contentct);
        cy.forceVisit(infors.urlManage+'events/'+infors.idProject+'/contents');
        contentManageSetupPage.clickDeleteButton(urlCt);
        contentManageSetupPage.verifyDeleteSuccess();
        homePage.verifyNewPageIsCDeletedSuccessfullyInFrontEnd(infors.url + '/'+urlCt+'_update');
        
    })

})
