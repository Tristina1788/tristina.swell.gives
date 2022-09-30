export class SettingSetupPage{
    donationPage = 'Donation Page';
    ticketPage = 'Ticketing Page';
    sponsPage = 'Sponsorship Page';
    tablePage = 'Table Page';
    buttonPage = 'Buttons';
    leaderboard = 'Leaderboards';

    openSettingDonationPage (){
        cy.get('a').contains(this.donationPage).click();
    }

    openSettingTicketPage (){
        cy.get('a').contains(this.ticketPage).click();
    }

    openSettingSponsorshipPage (){
        cy.get('a').contains(this.sponsPage).click();
    }

    openSettingTablePage (){
        cy.get('a').contains(this.tablePage).click();
    }

    openSettingButtonPage (){
        cy.get('a').contains(this.buttonPage).click();
    }

    openSettingLeaderboardPage (){
        cy.get('a').contains(this.leaderboard).click();
    }
}