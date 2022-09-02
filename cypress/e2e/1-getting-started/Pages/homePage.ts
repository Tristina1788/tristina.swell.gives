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
        //cy.get(this.boardTopFundraisers).find(this.swellAmounts).contains('$'+amount).should('be.visible');
    }

    verifyUserInTopSocial(userName:string, amount:number){
        cy.get(this.boardMostSocial).find(this.inputSearchName).type(userName);
        cy.get(this.boardMostSocial).find(this.swellName).contains(userName).should('be.visible');
        cy.get(this.boardMostSocial).find(this.swellAmounts).contains(amount).should('be.visible');
    }

    verifyUserInTable(userName:string, amount:number){
        cy.get(this.boardTable).find(this.inputSearchName).type(userName);
        cy.get(this.boardTable).find(this.swellName).contains(userName).should('be.visible');
        //cy.get(this.boardTable).find(this.swellAmounts).contains(amount).should('be.visible');
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
    
}

