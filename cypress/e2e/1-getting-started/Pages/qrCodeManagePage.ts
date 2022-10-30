export class QRCode {
    dotscolor = 'Dots color'; //next(input)
    dotstypeSelect = '#form-dots-type';
    chooseFileBtn = '#file';

    verifyQRCodePage() {
        cy.contains(this.dotscolor).next('input')
            .should('have.attr', 'value', '#000000')
            .invoke('attr', 'type')
            .should('equal', 'color')
        cy.get(this.dotstypeSelect).find('option').then($value => {
            expect($value).to.have.length(6)
            expect($value).to.contains('Square')
            expect($value).to.contains('Dots')
            expect($value).to.contains('Rounded')
            expect($value).to.contains('Extra rounded')
            expect($value).to.contains('Classy')
            expect($value).to.contains('Classy rounded');
        })

        cy.get(this.chooseFileBtn)
            .should('have.attr','accept', 'image/*')
            .invoke('attr', 'type')
            .should('equal', 'file');

    }
}
