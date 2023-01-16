export class BranchSetupPage  {
    pageHeaderImg = 'Event Page Header Size 740 x 288';
    pageHeaderBrowerBtn='#bg_image';
    profilePageHeaderImg = 'Profile Page Header Size 740 x 288';
    profilePageHeaderImgBrowerBtn = '#bg_image_user';
    socialImg = 'Social media preview picture';
    socialImgBrowerBtn = '#bg_image_social';
    logoImg = 'Logo Size 261 x 166';
    logoImgBrowerBtn = '#sponsor_logos';
    tableProfileImg = 'Default table profile picture 500 x 500';
    tableProfileImgBrowerBtn = '#tabledefaultprofilepicture';
    emailHeaderImg = 'Email Header Image Size 550x135';
    emailHeaderImgBrowserBtn = '#logo_web';
    ticketHeaderImage = 'Ticket Header Image 1000 x 245';
    ticketHeaderBrowserBtn = '#logo_pdf';
    ticketFootImage = 'Ticket Footer Image 1000 x 760';
    ticketFootBrowserBtn = '#image_footer';
    leaderboardImage = 'Leaderboards Page Background (free size)';
    leaderboardImgBrowserBtn = '#background_leaderboard';
    errorText = 'Error';
    errorTextMsg = 'The image you are trying to upload does not match the criteria ';
    errorConfirmBtn = '.confirm';
    saveBtn = 'Save Changes';
    saveSuccessTxt = 'Completed successfully!';
    linkImage = "";
    
    constructor() { 
        this.linkImage = ""; // OK
    }

      
    visit(url : string){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
          });
        cy.visit(url);
    }

    verifyHaveAllUploadImages(){
        cy.get('h4').contains(this.pageHeaderImg).should('be.visible');
        expect(cy.get(this.pageHeaderBrowerBtn)).to.exist ;
        
        cy.get('h4').contains(this.profilePageHeaderImg).should('be.visible');
        expect(cy.get(this.profilePageHeaderImgBrowerBtn)).to.exist ;
        
        cy.get('h4').contains(this.socialImg).should('be.visible');
        expect(cy.get(this.socialImgBrowerBtn)).to.exist ;
        
        cy.get('h4').contains(this.logoImg).should('be.visible');
        expect(cy.get(this.logoImgBrowerBtn)).to.exist ;
        
        cy.get('h4').contains(this.tableProfileImg).should('be.visible');
        expect(cy.get(this.tableProfileImgBrowerBtn)).to.exist ;

        cy.get('h4').contains(this.emailHeaderImg).should('be.visible');
        expect(cy.get(this.emailHeaderImgBrowserBtn)).to.exist ;

        cy.get('h4').contains(this.ticketHeaderImage).should('be.visible');
        expect(cy.get(this.ticketHeaderBrowserBtn)).to.exist ;

        cy.get('h4').contains(this.ticketFootImage).should('be.visible');
        expect(cy.get(this.ticketFootBrowserBtn)).to.exist ;

        cy.get('h4').contains(this.leaderboardImage).should('be.visible');
        expect(cy.get(this.leaderboardImgBrowserBtn)).to.exist ;
    }

    verifyUnableToUploadWrongSizeImage(){
        //'../../../fixtures/address.json'
        cy.get(this.pageHeaderBrowerBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click();

        cy.wait(1000);
        cy.get(this.profilePageHeaderImgBrowerBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click();
        cy.wait(1000);
        cy.get(this.socialImgBrowerBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
       // cy.get('h2').contains(this.errorText).should('be.visible');
       // cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click({force: true});
        cy.wait(1000);
        cy.get(this.logoImgBrowerBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click({force: true});
        cy.wait(1000);
        cy.get(this.tableProfileImgBrowerBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click({force: true});
        cy.wait(1000);
        cy.get(this.emailHeaderImgBrowserBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click({force: true});
        cy.wait(1000);
        cy.get(this.ticketHeaderBrowserBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click();
        cy.wait(1000);
        cy.get(this.ticketFootBrowserBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('be.visible');
        cy.get('p').contains(this.errorTextMsg).should('be.visible');
        cy.get(this.errorConfirmBtn).click();
        cy.wait(1000);
        cy.get(this.leaderboardImgBrowserBtn).selectFile('./data/img_test/test_no_size.jpg',{force: true});
       // cy.get('h2').contains(this.errorText).should('be.visible');
       // cy.get('p').contains(this.errorTextMsg).should('be.visible');
       // cy.get(this.errorConfirmBtn).click();
    }

    verifyEnableToUploadCorrectSizeImage(){
        //'../../../fixtures/address.json'
        cy.get(this.pageHeaderBrowerBtn).selectFile('./data/img_test/a740_288.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.profilePageHeaderImgBrowerBtn).selectFile('./data/img_test/b740_288.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.socialImgBrowerBtn).selectFile('./data/img_test/a1080_565.jpg',{force: true});

        cy.get(this.logoImgBrowerBtn).selectFile('./data/img_test/a261_166.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.tableProfileImgBrowerBtn).selectFile('./data/img_test/a500_500.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.emailHeaderImgBrowserBtn).selectFile('./data/img_test/a550_135.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.ticketHeaderBrowserBtn).selectFile('./data/img_test/a1000_245.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.ticketFootBrowserBtn).selectFile('./data/img_test/a1000_760.jpg',{force: true});
        cy.get('h2').contains(this.errorText).should('not.be.visible');
        cy.get('p').contains(this.errorTextMsg).should('not.be.visible');

        cy.get(this.leaderboardImgBrowserBtn).selectFile('./data/img_test/a1600_900.jpg',{force: true});
    }

    clickSaveBtn(){
        cy.wait(2000);
        cy.get('button').contains(this.saveBtn).click();
    }

    VerifyUpdateFormSuccess(){
        cy.get('p').contains(this.saveSuccessTxt).should('be.visible');
    }

     getImageHeaderSetupInBranding() {
        let linklogo = '';
        cy.get('h4').contains(this.logoImg).parent()
        .children('div').eq(0).children('img').invoke('attr', 'src')
        .then(linklog => {
            const link = linklog?.substring(linklog.length-29,linklog.length); //419/1661783284-76906394.jpg
            linklogo = link+'';
        })

        let linkProfile = '';
        cy.get('h4').contains(this.profilePageHeaderImg).parent()
        .children('div').eq(0).children('img').invoke('attr', 'src')
        .then(linklog => {
            const link = linklog?.substring(linklog.length-29,linklog.length); //419/1661783284-76906394.jpg
            linkProfile = link+'';
        })

        cy.get('h4').contains(this.pageHeaderImg).parent()
        .children('div').eq(0).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            const linkImage = link?.substring(link.length-29,link.length); //419/1661783284-76906394.jpg
            cy.writeFile('./data/images.json',{imageHeader:linkImage, imageLogo:linklogo, imageProfile:linkProfile})
            console.log("link image"+this.linkImage)
        })
        
    } 

   

}