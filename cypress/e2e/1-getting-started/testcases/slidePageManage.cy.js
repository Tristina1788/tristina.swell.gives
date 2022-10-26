import { HomePage } from "../Pages/homePage";
import { SlideManagePage } from "../Pages/slideManagePage";
import { SlideTabManagePage } from "../Pages/slideTabManagePage";
import { getRandomEmail, getRandomNumber, getRandomText } from "./generalFunction.cy"
import { LoginManagePage } from "../Pages/loginManagePage";

let homePage = new HomePage();
let slideManagePage = new SlideManagePage();
let slideTabManagePage = new SlideTabManagePage();
let loginManagePage = new LoginManagePage();
const infors = require('../utils/infor.js')
beforeEach(() => {

});
let title1 = getRandomText();
let updatedTitle1 = getRandomText();
describe('Verify Slide Manage Page', () => {
    it.only('Verify enable to create new Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickAddSlideButton();
        slideTabManagePage.inputSlideForm('Image', title1, '', true, true , true, true, './data/img_test/a740_288.jpg');
        slideTabManagePage.clickCreateSlideButton();
        slideTabManagePage.verifyShowImageSlide(title1);
    })

    it.only('Verify enable to update Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickEditSlideButton(title1);
        slideTabManagePage.updateSlideForm('Image', updatedTitle1, '', true, false , true, false,2);
        slideTabManagePage.clickSaveSlideButton();
        slideTabManagePage.verifyShowImageSlide(updatedTitle1+' (2)');
    })

    it.only('Verify enable to delete Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickDeleteSlideButton(updatedTitle1+' (2)');
        slideTabManagePage.verifyImageSlideIsNotPresent(updatedTitle1+' (2)');
    })

    it.only('Verify enable to create new Slide with type Text from manage Page work correct', () => {
        let title = getRandomText();
        let content = title + getRandomText() + ' ' + title + ' ' + getRandomNumber();

        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickAddSlideButton();
        slideTabManagePage.inputSlideForm('Text', title, content);
        slideTabManagePage.clickCreateSlideButton();
        slideTabManagePage.verifyShowImageSlide(title);
    })

    it.only('Verify enable to update Slide with type text from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickEditSlideButton(title1);
        slideTabManagePage.updateSlideForm('Image', updatedTitle1, '', true, false , true, false,3);
        slideTabManagePage.clickSaveSlideButton(updatedTitle1+' (3)');
        slideTabManagePage.verifyShowImageSlide(updatedTitle1+' (3)');
    })

    it.only('Verify enable to delete Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickDeleteSlideButton(title1);
        slideTabManagePage.verifyImageSlideIsNotPresent(updatedTitle1+' (3)');
    })
})