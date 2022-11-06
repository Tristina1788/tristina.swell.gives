import { UserManagementPage } from "../Pages/userManagementPage";//
import { UserManagementDetailPage } from "../Pages/userManagementDetailPage";
import { LoginManagePage } from "../Pages/loginManagePage";
import {  getRandomEmail, getRandomNumber, getRandomText} from "./generalFunction.cy"

let userManagementPage = new UserManagementPage();
let userManagementDetailPage = new UserManagementDetailPage();

let loginManagePage = new LoginManagePage();
const infors = require('../utils/infor.js')
var emailUserUpdate;

beforeEach(() => {
    loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'users');
})

describe('Verify Transaction Manage flow', () => {
    it.skip('Verify enable to create new user from manage Page', () => {
        
        userManagementPage.clickAddButtonBtn();
        userManagementDetailPage.inputUserForm(
            "testUser",
            'lasnameUser',
            '',
            'testuser@gmail.com',
            '123456',
            'No',
            './data/img_test/logo2.jpg'
        )
        userManagementDetailPage.clickSaveButton();
        userManagementPage.verifyUser('testUser', 'lasnameUser', 'testuser@gmail.com', 'No');
    })

    it.only('Verify enable to update user management from manage Page', () => {
        let firstName = getRandomText();
        let lastName = getRandomText();
        userManagementPage.clickUserEditButton('gEgAdpcsGE11062022@gmail.com');
        userManagementDetailPage.inputUserForm(
            firstName, lastName, '', '', '', 'No', './data/img_test/logo2.jpg'
        )
        userManagementDetailPage.clickSaveButton();
        userManagementPage.clickReloadButton();
        userManagementPage.verifyUser(firstName, lastName, 'gEgAdpcsGE11062022@gmail.com', 'No');

    })
})