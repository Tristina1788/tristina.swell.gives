import { LoginManagePage } from "../Pages/loginManagePage";
import { DashboardManagePage } from "../Pages/dashboardManagePage";

let loginManagePage = new LoginManagePage
let dashboardManagePage = new DashboardManagePage
const infors = require('../utils/infor.js')

describe('Verify the Dashboard Evensts Manage flow', () => {
    it('Verify dashboard Manage Page', () => {
        loginManagePage.visit(infors.urlManage);
        loginManagePage.inputloginForm(infors.emailAdmin, infors.passAdmin);
        loginManagePage.visit(infors.urlManage + 'events/' +  infors.idProject);
        dashboardManagePage.verifySummaryTable();
        dashboardManagePage.verifyStatsTable();
    })
})