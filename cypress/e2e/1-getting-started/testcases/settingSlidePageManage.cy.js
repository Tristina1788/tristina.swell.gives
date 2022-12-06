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
        slideTabManagePage.verifyHaveCorrectPropertiesSlide(title1,  true, true , true, true);
    })

    it.only('Verify enable to update Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickEditSlideButton(title1);
        slideTabManagePage.updateSlideForm('Image', updatedTitle1, '', true, false , true, false,2);
        slideTabManagePage.clickSaveSlideButton();
        slideTabManagePage.clickCloseSlideButton();
        slideTabManagePage.verifyShowImageSlide(updatedTitle1+' (2)');
        slideTabManagePage.verifyHaveCorrectPropertiesSlide(updatedTitle1+' (2)',true, false , true, false);
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
        let content = title1 + getRandomText() + ' ' + title1 + ' ' + getRandomNumber();
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickAddSlideButton();
        slideTabManagePage.inputSlideForm('Text', title1, content);
        slideTabManagePage.clickCreateSlideButton();
        slideTabManagePage.verifyShowImageSlide(title1);
        slideTabManagePage.verifyHaveCorrectPropertiesSlide(title1,  true, true , true, true);
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
        slideTabManagePage.verifyHaveCorrectPropertiesSlide(updatedTitle1+' (3)',true, false , true, false);
    })

    it.only('Verify enable to delete Slide with type image from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickDeleteSlideButton(updatedTitle1);
        slideTabManagePage.verifyImageSlideIsNotPresent(updatedTitle1+' (3)');
    })


    it.only('Verify enable to create new Slide with type video from manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickAddSlideButton();
        slideTabManagePage.inputSlideForm('Video', title1, '', true, true , true, true, './data/img_test/video_sample.wmv');
        slideTabManagePage.clickCreateSlideButton();
        slideTabManagePage.verifyShowImageSlide(title1);
        slideTabManagePage.verifyHaveCorrectPropertiesSlideTB(title1, true, true , true, true);
    })

    it.only('Verify enable to update Slide with type video from Table tab - manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickTableTabButton();
        slideTabManagePage.clickEditSlideButtonInTableTab(title1);
        slideTabManagePage.updateSlideForm('Video', updatedTitle1, '', true, false , true, false,2);
        slideTabManagePage.clickSaveSlideButton();
        slideTabManagePage.clickCloseSlideButton();
        slideTabManagePage.verifyShowImageSlideInTableTab(updatedTitle1);
        slideTabManagePage.verifyHaveCorrectPropertiesSlideTB(updatedTitle1,true, false , true, false);

    })

    it.only('Verify enable to delete Slide with type video from Table tab -  manage Page work correct', () => {
        
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/slides');
        slideManagePage.clickSlideTab();
        slideTabManagePage.clickTableTabButton();
        slideTabManagePage.clickDeleteSlideButtonInTableTab(updatedTitle1);
        slideTabManagePage.verifyShowImageSlideIsNotPresentInTableTab(updatedTitle1);
    })
})