export class DonationsTablePage{
    tableLabel = 'app-ticket div.radio-list span';
    tableRadio = 'app-ticket div.radio-list input';
    nextButton = 'button[type="button"]';
    amountSelection = '.selector-button';
    otherAmount ='[name="other_amount_input"]';
    textDonation = 'Donation of $';
    textTotal = 'Total: $';

    verifyTableIsSelectedAsDefault(tableName: string, tablePrice: string) {
       // cy.get(this.tableRadio).should('be.selected');
        cy.get(this.tableLabel).contains(tableName).should('be.visible');
        cy.get('li').contains(tableName + ' - $' + tablePrice).should('be.visible');
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

