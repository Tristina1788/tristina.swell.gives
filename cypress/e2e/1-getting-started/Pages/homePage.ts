import { values } from "cypress/types/lodash";

export class HomePage{
    giveNow = '[value="GIVE NOW"]';
    purchaseTickets = '[value="Purchase Tickets"]';
    becomeASponser = '[value="BECOME A SPONSOR"]';
    becomeAHost = '[value="BECOME A HOST"]';
    becomeAFund = '[value="BECOME A FUNDRAISER"]';
    swellName = '.swell-names';
    swellAmounts = '.swell-amounts'
    boardTopFundraisers = '[title="Top Fundraisers"]';
    boardMostSocial = '[title="Most Social"]';
    boardTable = '[title="Table"]';
    inputSearchName = '[ng-model="name"]'
    inforEvent = '.event-date'; //
    imgEvent = '.event-image';
    imglogo = '.logo';
    menubar = '[role="menubar"]';
    menuItem = '[role="menuitem"]';
    contentPage = '.page-content-body';
    pageNotFoundMsg = 'Page Not Found'; //h2
    sponsorSection ='[ng-click="navigate(sponsor.url)"]';
    topFundraiserLB = '[type="donations"]';
    mostSocialLB = '[type="social"]';
    topTeamsLB = '[type="team"]';
    topTableLB = '[type="table"]';
    teamSelect = '#team-select';
    tweetTag = '.tweet-input';
    
    clickGiveAHostButton(){
        cy.get(this.becomeAHost).click();
    }

    clickGiveNowButton(){
        cy.get(this.giveNow).click();
    }

    clickChooseASponsorshipButton(){
        cy.get(this.becomeASponser).click();
    }

    clickPurchaseTickets(){
        cy.get(this.purchaseTickets).click();
    }

    clickBecomeAFundraiser(){
        cy.get(this.becomeAFund).click();
    }

    verifyUserInTopFundraiser(userName:string, amount:number){
        
        cy.get(this.boardTopFundraisers).find(this.inputSearchName).type(userName);
        cy.get(this.boardTopFundraisers).find(this.swellName).contains(userName).should('be.visible');
    }

    verifyUserInTopSocial(userName:string, amount:number){
        cy.get(this.boardMostSocial).find(this.inputSearchName).type(userName);
        cy.get(this.boardMostSocial).find(this.swellName).contains(userName).should('be.visible');
        cy.get(this.boardMostSocial).find(this.swellAmounts).contains(amount).should('be.visible');
    }

    verifyUserInTable(userName:string, amount:number){
        cy.get(this.boardTable).find(this.inputSearchName).type(userName);
        cy.get(this.boardTable).find(this.swellName).contains(userName).should('be.visible');
    }

    clickFirstUserInTopFundraiser(){
        cy.get(this.boardTopFundraisers).find(this.swellName).eq(0).click({force: true});
    }

    clickFirstUserInTopSocial(){
        cy.get(this.boardMostSocial).find(this.swellName).eq(0).click({force: true});
    }

    clickFirstTableInTableBoard(){
        cy.get(this.boardTable).find(this.swellName).eq(0).click({force: true});
    }

    verifyInforEventCorrect(date : string, time : string, location : string){
        cy.get(this.inforEvent).contains(date +' | '+time).should('be.visible');
        cy.get(this.inforEvent).contains(location).should('be.visible');
    }

    verifyImageHeaderSetupCorrectInBranding(){
       
        cy.get(this.imgEvent).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageHeader);
            });
            
        });
    }

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            console.log("image logo:"+linkImg1);
            cy.readFile('./data/images.json').then((image)=> {
                console.log("logo : "+image);
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
    }

    verifyNewPageActiveInFrontEnd(url : string, link : string, ct : string){
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).should('be.visible');
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).invoke('attr','href').then(text=>{
            expect('/'+url).to.equal(text+'');
        });
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).click();
        cy.get(this.contentPage).children('p').contains(ct).should('be.visible');
    }

    verifyNewPageHasCorrectOrderInFrontEnd(link : string, link1 : string){
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link)
        .parent('li').next().children('a').contains(link1).should('be.visible');
    }

    verifyNewPageInactiveInFrontEnd(url : string, link : string, ct : string){
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).should('not.exist');
        cy.forceVisit(url);
        cy.get(this.contentPage).children('p').contains(ct).should('be.visible');
    }

    verifyNewPageIsCreatedSuccessfullyInFrontEnd(url : string, link : string, ct : string){
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).should('be.visible');
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).invoke('attr','href').then(text=>{
            expect('/'+url).to.equal(text+'');
        });
        cy.get(this.menubar).find(this.menuItem).children('a').contains(link).click();
        cy.get(this.contentPage).children('p').contains(ct).should('be.visible');
    }

    verifyNewPageIsCDeletedSuccessfullyInFrontEnd(url : string){
        cy.forceVisit(url);
        cy.get('h2').contains(this.pageNotFoundMsg).should('be.visible');
    }
    verifySponsorIsNotSetup(){
        cy.get(this.sponsorSection).should('be.not.exist')
    }
    verifySponsorSetupCorrectly(url1:String){
        cy.wait(5000);
        
        cy.visit('https://tristina.swell.gives/')
        let test;
        cy
            .window().then((win) => {
                cy.spy(win, 'open').as('redirect');
            });
        
        cy.get('.swiper-slide-active').click()
        cy
        .get('@redirect')
        .should('be.calledWith', url1+'');
        cy.get(this.sponsorSection).children('img').eq(0).invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogoSponsor);
            });
        });
    }

    verifySettingButtonSuccessfully(giveNowLLb : string, purchaseLb : string, becomeHostLb : string, becomeFundraiser : string, becomeSponsor : string, isFundraiser : boolean = true){
        cy.get('[value="'+giveNowLLb+'"]').should('be.visible');
        cy.get('[value="'+purchaseLb+'"]').should('be.visible');
        cy.get('[value="'+becomeHostLb+'"]').should('be.visible');
        if(isFundraiser)
            cy.get('[value="'+becomeFundraiser+'"]').should('be.visible');
        else
            cy.get('[value="'+becomeFundraiser+'"]').should('be.not.exist');
        cy.get('[value="'+becomeSponsor+'"]').should('be.visible');
    }

    verifySettingLeaderboardSuccessfully(isLB : boolean = true, isTopFundraiser : boolean = true, topFundraiserLB : string, isTable : boolean = true,
        tableLB : string, isSocial : boolean = true, socialLB : string, isTeam : boolean = true, teamLB : string){
        
        if(isLB){
            if(isTopFundraiser) {
                cy.get(this.topFundraiserLB).invoke('attr','leaderboard').should('be.exist');
                cy.get(this.topFundraiserLB).find('h4').contains(topFundraiserLB).should('be.visible');
            } else {
                cy.get(this.topFundraiserLB).should('be.not.exist');
            }

            if(isTable) {
                cy.get(this.topTableLB).invoke('attr','leaderboard').should('be.exist');
                cy.get(this.topTableLB).find('h4').contains(tableLB).should('be.visible');
            } else {
                cy.get(this.topTableLB).should('be.not.exist');
            }

            if(isSocial) {
                cy.get(this.mostSocialLB).invoke('attr','leaderboard').should('be.exist');
                cy.get(this.mostSocialLB).find('h4').contains(socialLB).should('be.visible');
            } else {
                cy.get(this.mostSocialLB).should('be.not.exist');
                
            }

            if(isTeam) {
                cy.get(this.topTeamsLB).invoke('attr','leaderboard').should('be.exist');
                cy.get(this.topTeamsLB).find('h4').contains(teamLB).should('be.visible');
            } else {
                cy.get(this.topTeamsLB).should('be.not.exist');
            }
            
        } else{
            cy.get('div').invoke('attr','leaderboard').should('be.not.exist');
        }
    }

    verifyTweetTagCorrect(socicalTag : string){
        cy.get(this.tweetTag).invoke('attr','placeholder').then(value=>{
            expect(value).equal('Post your own tweet here using '+socicalTag+'!');
        })
    }
    
}

