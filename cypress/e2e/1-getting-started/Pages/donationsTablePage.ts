import { find } from "cypress/types/lodash";

export class DonationsTablePage {
    tableLabel = 'app-ticket div.radio-list span';
    //tableLabel = '.radio-cost';
    tableRadio = 'app-ticket div.radio-list input';
    nextButton = 'button[type="button"]';
    amountSelection = '.selector-button';
    otherAmount = '[name="other_amount_input"]';
    textDonation = 'Donation of $';
    textTotal = 'Total: $';
    titleLine = '.title-line';
    pageTitleH1 = '.padding-desktop>h1';
    contentLeftChooseTable = '[style="padding-right: 20px;"]';

    imgEvent = '.event-image';

    imglogo = '.logo';

    verifyImageLogoSetupCorrectInBranding() {

        cy.get(this.imglogo).children('a').children('img').invoke('attr', 'src')
            .then(link => {

                const linkImg1 = link?.substring(link.length - 29, link.length) + "" //419/1661783284-76906394.jpg
                cy.readFile('./data/images.json').then((image) => {
                    expect(linkImg1).to.equal(image.imageLogo);
                });

            });
    }

    verifyImageHeaderSetupCorrectInBranding() {

        cy.get(this.imgEvent).children('a').children('img').invoke('attr', 'src')
            .then(link => {

                const linkImg1 = link?.substring(link.length - 29, link.length) + "" //419/1661783284-76906394.jpg
                cy.readFile('./data/images.json').then((image) => {
                    expect(linkImg1).to.equal(image.imageHeader);
                });

            });
    }

    verifyTableDonationPage() {
        cy.get(this.tableLabel).should('be.visible');
        cy.get(this.amountSelection).should('be.visible');
    }

    verifyTableIsSelectedAsDefault(tableName: string, tablePrice: string) {
        cy.get(this.tableLabel).next().contains(tableName).should('be.visible');
        cy.get('li').contains(tableName + ' - $' + tablePrice).should('be.visible');
    }

    verifyTableIsExistAndSelectIt(tableName: string, tablePrice: string) {
        cy.get(this.tableLabel).contains(tableName).prev('span').contains('$' + tablePrice).should('be.visible');
        cy.get(this.tableLabel).contains(tableName).prev('span').contains('$' + tablePrice).prev('input').check();
    }

    verifyTableIsNotExist(tableName: string, tablePrice: string) {
        cy.get(this.tableLabel).contains(tableName).should('be.not.exist');
    }

    clickNextButton() {
        cy.get(this.nextButton).contains('Next').click();
    }

    selectAmountItem(amount: string) {
        cy.get(this.amountSelection).contains(amount).click();
    }

    inputOtherAmount(amount: string) {
        cy.get(this.otherAmount).type(amount);
    }

    verifySummaryAmount(amoutDonate: number, priceTable: number) {
        let sumPrice = amoutDonate + priceTable;
        let sumPriceText = (sumPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        cy.get('li').contains(this.textDonation + '' + amoutDonate).should('be.visible');
        cy.get('span').contains(this.textTotal + '' + sumPriceText.substring(0, sumPriceText.length - 3)).should('be.visible');
    }

    verifySettingTableSuccessfully(pageTitle = '', tableType = '', tableSection = '', donationTitle = '', orderSummary = '', donationSummary = '', isDonation: boolean = true) {
        if (pageTitle != '') {
            cy.get(this.pageTitleH1).contains(pageTitle, { matchCase: false }).should('be.visible');
        } else {
            cy.get(this.pageTitleH1).should('not.have.value');
        }
        if (tableType != '') {
            cy.get(this.titleLine).contains('Choose a ' + tableType, { matchCase: false }).should('be.visible');
        } else {
            cy.get(this.titleLine).contains('Choose a Table', { matchCase: false }).should('be.visible');
        }

        if (tableSection != '') {
            cy.get(this.contentLeftChooseTable).contains(tableSection).should('be.visible');
        } else {
            cy.get(this.contentLeftChooseTable).find('li').contains('Please select the type of Table. You will be the Host for it.').should('be.visible');
            cy.get(this.contentLeftChooseTable).find('li').contains('Click next, fill in your contact information and pay.').should('be.visible');
            cy.get(this.contentLeftChooseTable).find('li').contains('Next, you will be taken to the page where you will register and invite your guests.').should('be.visible');
            cy.get(this.contentLeftChooseTable).find('li').contains('Enjoy the event.').should('be.visible');
        }

        if (isDonation) {
            if (donationTitle != '') {
                cy.get(this.titleLine).contains(donationTitle, { matchCase: false }).should('be.visible');
            } else {
                cy.get(this.titleLine).contains('ADD A DONATION!', { matchCase: false }).should('be.visible');
            }

            cy.get('button').contains('$50').click();
            if (donationSummary != '') {
                cy.contains(donationSummary + ' $50').should('be.visible');
            } else {
                cy.contains('Donation of $50').should('be.visible');
            }

        } else {
            cy.get(this.titleLine).contains('ADD A DONATION!', { matchCase: false }).should('not.exist');
        }

        if (orderSummary != '') {
            cy.get(this.titleLine).contains(orderSummary, { matchCase: false }).should('be.visible');
        } else {
            cy.get(this.titleLine).contains('ORDER SUMMARY', { matchCase: false }).should('be.visible');
        }

    }
}

