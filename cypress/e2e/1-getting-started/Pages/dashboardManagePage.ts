export class DashboardManagePage {
    dashboardTitle = 'Dashboard';
    summaryHeader = 'Summary';
    active = 'Active';
    name = 'Name';
    date = 'Date';
    time = 'Time';
    venue = 'Venue';
    beneficiary = 'Beneficiary';
    statsHeader = 'Stats';
    fundsRaisedtoDate = 'Funds Raised to Date';
    ticketsSold = 'Tickets Sold';
    fundraisers = 'Fundraisers';
    siteTraffic = 'Site Traffic';
    mostRecentTransaction = 'Most Recent Transaction';
    mostRecentTicketSold = 'Most Recent Ticket Sold'
    
    verifySummaryTable() {
        cy.contains(this.summaryHeader).should('be.visible');
        cy.contains(this.summaryHeader)
            .parent().next('div').find('tbody')
            .within(() => {
                cy.get('tr').eq(0).contains(this.active).should('be.visible');
                cy.get('tr').eq(1).contains(this.name).should('be.visible');
                cy.get('tr').eq(2).contains(this.date).should('be.visible');
                cy.get('tr').eq(3).contains(this.time).should('be.visible');
                cy.get('tr').eq(4).contains(this.venue).should('be.visible');
                cy.get('tr').eq(5).contains(this.beneficiary).should('be.visible');
            })
    }

    verifyStatsTable() {
        cy.contains(this.statsHeader).should('be.visible');
        cy.contains(this.statsHeader)
            .parent().next('div').find('tbody')
            .within(() => {
                cy.get('tr').first().within(() => {
                    cy.get('th').eq(0).should('contain', this.fundsRaisedtoDate);
                    cy.get('th').eq(1).should('contain', this.ticketsSold);
                    cy.get('th').eq(2).should('contain', this.fundraisers);
                    cy.get('th').eq(3).should('contain', this.siteTraffic);
                })

                cy.get('tr').eq(2).within(() => {
                    cy.get('th').should('contain', this.mostRecentTransaction);
                    cy.get('td').find('tbody').within(() => {
                        cy.get('tr').eq(0).should('contain', 'Name:');
                        cy.get('tr').eq(1).should('contain', 'Email:');
                        cy.get('tr').eq(2).should('contain', 'Date:');
                        cy.get('tr').eq(3).should('contain', 'Type:');
                        cy.get('tr').eq(4).should('contain', 'Amount:');
                    })
                })
                cy.contains(this.mostRecentTicketSold).should('be.visible');
                cy.contains(this.mostRecentTicketSold)
                    .next('td').find('tbody').within(() => {
                        cy.get('tr').first().should('contain', 'Name:');
                        cy.get('tr').last().should('contain', 'Email:');

                    })
            })
    }
}