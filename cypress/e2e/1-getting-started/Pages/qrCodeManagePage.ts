export class QRCodeManagePage {
    dotscolor = 'Dots color'; //next(input)
    dotstypeSelect = '#form-dots-type>option';
    chooseFileBtn = '#file';
    donationpageTitle = 'Donation page';
    ticketPurchaseTitle = 'Ticket Purchase';
    homepageTitle = 'Homepage';

    verifyQRCodePage() {
        cy.contains(this.dotscolor).next('input')
            .should('have.attr', 'value', '#000000')
            .invoke('attr', 'type')
            .should('equal', 'color')
        cy.get(this.dotstypeSelect).then(($value) => {
            expect($value).to.have.length(6)
            expect($value).to.value('square')
            expect($value).have.contain('Dots')
            expect($value).have.contain('Rounded')
            expect($value).have.contain('Extra rounded')
            expect($value).have.contain('Classy')
            expect($value).have.contain('Classy rounded');
        })

        cy.get(this.chooseFileBtn)
            .should('have.attr', 'accept', 'image/*')
            .invoke('attr', 'type')
            .should('equal', 'file');

        cy.contains(this.donationpageTitle)
            .parent().next().children('a')
            .should('have.attr', 'onclick', "downloadqr('donation');");
        cy.contains(this.ticketPurchaseTitle)
            .parent().next().children('a')
            .should('have.attr', 'onclick', "downloadqr('ticket');");
        cy.contains(this.homepageTitle)
            .parent().next().children('a')
            .should('have.attr', 'onclick', "downloadqr('homepage');");
    }
}
