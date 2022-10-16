export class TicketPage{
    choseTcText = 'Choose a Ticket';
    ticketBoxItem = '.ticket-box';
    testTicketLabel = 'Test Ticket';
    virtualTicketLabel = 'Virtual Test Ticket'
    firstNameTc = '[name="firstname"]';
    lastNameTc = '[name="lastname"]';
    emailTc = '[name="email"]';
    phoneTc = '[name="phone"]';
    AddTcBtn = 'Add Ticket';
    amountSelection = '.selector-button';
    otherAmount ='[name="other_amount_input"]';
    amoutAfterFee = '[for="middle-label"]';
    textDonation = 'Donation of $';
    textTotal = 'Total: $';
    ticketAddedText = ' Ticket added to your basket';
    addAnotherTicketbtn = 'Add another Ticket';
    thanksAddedTcText = 'Thanks for adding a ticket. Please be sure to complete your registration by clicking the Next Button below.';
    nextBtn = 'Next';
    PreviousBtn = 'Previous';
    imgEvent = '.event-image';
    imglogo = '.logo';
    promoCodeText = 'Have a promo code?'; //span
    inputPromo = '[name="promo"]';
    updatePriceBtn = 'Update prices';
    inputTeamName = '[name="data.teamName"]';

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
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
    verifyIsScreenSelectTickets(){
        cy.wait(2000);
        cy.get('span').contains(this.choseTcText).should('be.visible');
    }


    selectTestTicket(item:number){
        cy.get(this.ticketBoxItem).eq(item).contains('SELECT').click();
    }

    selectTicketName(name:string){
        cy.get('div').contains(name).parent(this.ticketBoxItem).contains('SELECT').click();
    }

    verifyTheTicketIsNotExist(name:string){
        cy.get('div').contains(name).should('not.exist');
    }

    verifyFormInforTc(item:number){
        cy.get(this.ticketBoxItem).eq(item).find(this.firstNameTc).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).find(this.lastNameTc).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).find(this.emailTc).should('be.visible');
        expect(cy.get(this.ticketBoxItem).eq(item).find(this.phoneTc)).to.exist;
    }

    selectTestTicket2(){
        cy.get(this.ticketBoxItem).eq(1).contains(this.virtualTicketLabel).click();
    }

    inputFormInforNameTc(name : string, fname : string, lname : string, email : string, phone : string){
        cy.get('div').contains(name).parent(this.ticketBoxItem).find(this.firstNameTc).type(fname);
        cy.get(this.lastNameTc).type(lname);
        cy.get(this.emailTc).type(email);
        cy.get(this.phoneTc).type(phone);
    }

    inputFormInforTc(item : number, fname : string, lname : string, email : string, phone : string){
        cy.wait(2000);
        cy.get(this.ticketBoxItem).eq(item).find(this.firstNameTc).type(fname);
        cy.get(this.lastNameTc).type(lname);
        cy.get(this.emailTc).type(email);
        cy.get(this.phoneTc).type(phone);
    }

    clickAddTicket(item:number){
        cy.get(this.ticketBoxItem).eq(item).contains(this.AddTcBtn).click();
    }

    clickAddTicketName(name:string){
        cy.get('div').contains(name).parent(this.ticketBoxItem).contains(this.AddTcBtn).click();
    }

    verifyTicketIsAdded(item:number, email : string){
        cy.get(this.ticketBoxItem).eq(item).contains(this.ticketAddedText).should('be.visible');
        cy.get(this.ticketBoxItem).eq(item).contains(this.addAnotherTicketbtn).should('be.visible');
        let summaryTextTc = '';
        if(item == 0){
            summaryTextTc += 'Ticket #1 $33 - ' +email;
            cy.get('li').contains(summaryTextTc).should('be.visible');
        } 
        if (item == 1) {
            summaryTextTc += 'Ticket #2 $51 - ' +email;
            cy.get('li').contains(summaryTextTc).should('be.visible');
        }
        
    }

    verifyTicketNameIsAdded(name:string, email : string, price : number){
        cy.get('div').contains(name).parent(this.ticketBoxItem).contains(this.ticketAddedText).should('be.visible');
        
        cy.get('div').contains(name).parent(this.ticketBoxItem).contains(this.addAnotherTicketbtn).should('be.visible');
        let summaryTextTc = '';
        summaryTextTc += 'Ticket #1 $'+price+' - ' +email;
        cy.get('li').contains(summaryTextTc).should('be.visible');
        
        
    }

    verifyTicketNameIsAddedAndUsedInFrontEnd(name:string, price : number, quantity : number){
        cy.get('div').contains(name).parent(this.ticketBoxItem).should('be.visible');
        // if(price <10)
        //     cy.get('div').contains(name).find('label').contains('$0'+price);
        // else
            cy.get('div').contains(name).find('label').contains('$'+price);
        cy.get('div').contains(name).parent(this.ticketBoxItem).parent('div').children('span').contains('Only '+quantity+' left!')
    }

    verifyVirtualTicketNameIsAddedAndUsedInFrontEnd(name:string, price : number){
        cy.get('div').contains(name).parent(this.ticketBoxItem).should('be.visible');
        // if(price <10)
        //     cy.get('div').contains(name).find('label').contains('$0'+price);
        // else
            cy.get('div').contains(name).find('label').contains('$'+price);
       
    }
 
    selectAmountItem(amount : string){
        cy.get(this.amountSelection).contains(amount).click();
    }
    
    inputOtherAmount(amount : string){
        cy.get(this.otherAmount).type(amount);   
    }

    verifySummaryAmountForSelectTicketName(priceTicket:number,  amount:number,promoDiscount : number = 0){
        let sumAmount = amount + priceTicket - promoDiscount;
        cy.get('span').contains(this.textTotal+ ''+sumAmount).should('be.visible');
    }

    verifySummaryAmountSetup(numTicket1:number, numTicket2:number, amount:number,promoDiscount : number = 0,donaLb : string){
        console.log("donaLb: "+donaLb);
        let sumAmount = amount + numTicket1 * 33 + numTicket2 * 51 - promoDiscount;
        if(amount > 0 )
            cy.get('li').contains(donaLb+ ' $'+amount).should('be.visible');
        cy.get('span').contains(this.textTotal+ ''+sumAmount).should('be.visible');
        
    }

    verifySummaryAmount(numTicket1:number, numTicket2:number, amount:number,promoDiscount : number = 0,){
        let sumAmount = amount + numTicket1 * 33 + numTicket2 * 51 - promoDiscount;
        cy.get('li').contains(this.textDonation+ ''+amount).should('be.visible');
        cy.get('span').contains(this.textTotal+ ''+sumAmount).should('be.visible');
        
    }

    clickButtonNext(){
        cy.get('.button').contains(this.nextBtn).click();
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyNameSetupCorrect(name : string){
        cy.get('h1').contains(name).should('be.visible');
    }

    verifyPromoEnableToApplyInFrontEnd(){
        cy.get('span').contains(this.promoCodeText).should('be.visible');
        cy.get(this.inputPromo).should('be.visible');
        cy.get('button').contains(this.updatePriceBtn).should('be.visible');
    }

    addPromotoTicket(code:string){
        cy.get(this.inputPromo).type(code);
        cy.get('button').contains(this.updatePriceBtn).click();
    }

    selectNoteam(){
        cy.get('select').select('No team');
    }

    verifyNewTeamDisplayInTicketPage(newTeam: string) {
        cy.get('select').select(newTeam);
        cy.get('select').should('contain', newTeam);
    }

    verifyTeamIsNotExist(team: string) {
        cy.get('option').contains(team).should('be.not.exist');
    }

    verifyTicketGetCorrectInforFromTicketSetingForm(title: string, name: string, promo: string,teamselectiont : string, teamCreatetitle : string ,donatitle:string , enableNewTeam: boolean, enableDona: boolean, orderLb: string, donaLb: string) {
        cy.wait(3000);
        console.log("promo:"+promo);
        if(title!= "")
            cy.get('h1').contains(title).should('be.visible');
            
        cy.get('span').contains(promo).should('be.visible');
        
        if(enableNewTeam){
            cy.get('span').contains(teamselectiont).should('be.visible');
            cy.get('select').children('option').contains(teamCreatetitle).should('be.visible');
            cy.get('select').select(teamCreatetitle);
            cy.get(this.inputTeamName).should('be.visible');
        } else{
            cy.get('span').contains(teamselectiont).should('be.visible');
            cy.get('select').children('option').contains("New Team").should('be.not.exist');
        }

        cy.get('span').contains(orderLb).should('be.exist');
        if(enableDona){
            cy.get('span').contains(donatitle).should('be.visible');
            cy.get(this.amountSelection).should('be.visible');
            cy.get(this.otherAmount).should('be.visible');
        } else {
            cy.get(this.amountSelection).should('be.not.exist');
            cy.get(this.otherAmount).should('be.not.exist');   
            cy.get('span').contains(donatitle).should('be.not.exist');
        }

        
       

    }
}