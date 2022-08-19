export class DonationsTablePage{
    ticketList = 'app-ticket div.radio-list span';
    nextButton = 'button[type="button"]';

    selectTicketItem(ticketName: string){
        cy.get(this.ticketList).contains(ticketName).click();
    }

    clickNextButton() {
        cy.get(this.nextButton).contains('Next').click();
    }
}

