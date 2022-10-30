import { HomePage } from "../Pages/homePage";
import { SlideManagePage } from "../Pages/slideManagePage";
import { SlideTabManagePage } from "../Pages/slideTabManagePage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { LoginManagePage } from "../Pages/loginManagePage";
import { SettingSlideTabManagePage } from "../Pages/settingSlideTabManagePage";
import { BackgroudSlideTabManagePage } from "../Pages/backgroudSlideTabManagePage";

let homePage = new HomePage();
let slideManagePage = new SlideManagePage();
let slideTabManagePage = new SlideTabManagePage();
let loginManagePage = new LoginManagePage();
let settingSlideTabManagePage = new SettingSlideTabManagePage();
let backgroudSlideTabManagePage = new BackgroudSlideTabManagePage();
const infors = require('../utils/infor.js')
beforeEach(() => {

});
let title1 = getRandomText();
let updatedTitle1 = getRandomText();
beforeEach(() => {
    loginManagePage.visit(infors.urlManage);
    loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
    loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
});
describe('Verify Slide Manage Page', () => {
    it.only('Verify Slideshow setting - Customize the Look of the Slideshow can be updated', () => {
        slideManagePage.clickSettingTab();
        settingSlideTabManagePage.changeValueCustomizeForm('Right Bottom', 'Large', "#0e1c2e", "#c82f92" );
        cy.reload();
        slideManagePage.clickSettingTab();
        settingSlideTabManagePage.verifyCustomizeForm('Right Bottom', 'Large', "#0e1c2e", "#c82f92" );
        settingSlideTabManagePage.changeValueCustomizeForm('Left Center', 'Small', "#435061", "#530d3a" );
    })
    it.only('Verify Slideshow setting - Customize the Operation of the Slideshow can be updated', () => {
        slideManagePage.clickSettingTab();
        settingSlideTabManagePage.changeValueCustomizeOperationForm(true,true);
        cy.reload();
        slideManagePage.clickSettingTab();
        settingSlideTabManagePage.verifyCustomizeOperationForm(true,true);
        settingSlideTabManagePage.changeValueCustomizeOperationForm(true,false);
    })

    it.only('Verify Slideshow Backgrounds the Slideshow can be updated', () => {
        slideManagePage.clickBackgroundTab();
        backgroudSlideTabManagePage.uploadImageToSlide('./data/img_test/logo2.jpg')
        backgroudSlideTabManagePage.verifyUploadImageSuccessfully();
        cy.reload();
        slideManagePage.clickBackgroundTab();
        backgroudSlideTabManagePage.verifyUploadImageSuccessfully();
        backgroudSlideTabManagePage.clickRemoveImgSlideShowBtn();
        backgroudSlideTabManagePage.verifyImageIsNotPresent();
    })
})