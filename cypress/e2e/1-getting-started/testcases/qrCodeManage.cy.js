import { QRCodeManagePage } from "../Pages/qrCodeManagePage";
import { LoginManagePage } from "../Pages/loginManagePage";

let qrCodeManagePage = new QRCodeManagePage();
let loginManagePage =new LoginManagePage();
const infors = require('../utils/infor.js')

beforeEach(() => {
   
});
describe('Verify QR Code Manage Page', () => {

    it.only('Verify QR code manage page',()=>{
        loginManagePage.visit(infors.urlManage + 'events/' + infors.idProject + '/qrcodes');
        qrCodeManagePage.verifyQRCodePage();
    });

})