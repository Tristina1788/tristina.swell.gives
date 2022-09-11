export class DonationsTablePage{
    tableLabel = 'app-ticket div.radio-list span';
    tableRadio = 'app-ticket div.radio-list input';
    nextButton = 'button[type="button"]';
    amountSelection = '.selector-button';
    otherAmount ='[name="other_amount_input"]';
    textDonation = 'Donation of $';
    textTotal = 'Total: $';

    imgEvent = '.event-image';
    
    imglogo = '.logo';

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

    verifyTableDonationPage() {
        // cy.get(this.tableRadio).should('be.selected');
         cy.get(this.tableLabel).should('be.visible');
         cy.get(this.amountSelection).should('be.visible');
     }

    verifyTableIsSelectedAsDefault(tableName: string, tablePrice: string) {
       // cy.get(this.tableRadio).should('be.selected');
        cy.get(this.tableLabel).contains(tableName).should('be.visible');
        cy.get('li').contains(tableName + ' - $' + tablePrice).should('be.visible');
    }

    verifyTableIsExistAndSelectIt(tableName: string, tablePrice: string) {
        // cy.get(this.tableRadio).should('be.selected');
        cy.get(this.tableLabel).contains(tableName).prev('span').contains('$'+tablePrice).should('be.visible');
        cy.get(this.tableLabel).contains(tableName).prev('span').contains('$'+tablePrice).prev('input').check();
     }

     verifyTableIsNotExist(tableName: string, tablePrice: string) {
        // cy.get(this.tableRadio).should('be.selected');
        cy.get(this.tableLabel).contains(tableName).should('be.not.exist');
     }

    clickNextButton() {
        cy.get(this.nextButton).contains('Next').click();
    }

    selectAmountItem(amount : string){
        cy.get(this.amountSelection).contains(amount).click();
    }

    inputOtherAmount(amount : string){
        cy.get(this.otherAmount).type(amount);   
    }

    verifySummaryAmount(amoutDonate:number, priceTable:number){
        let sumPrice = amoutDonate + priceTable;
        let sumPriceText = (sumPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        cy.get('li').contains(this.textDonation+ ''+amoutDonate).should('be.visible');
        cy.get('span').contains(this.textTotal+ ''+sumPriceText.substring(0,sumPriceText.length-3)).should('be.visible');
    }
}

