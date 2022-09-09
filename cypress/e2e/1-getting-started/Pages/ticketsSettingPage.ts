export class TicketsSettingPage {
    titlePage = 'Page Title';
    nameTicket = 'Ticket Name (Optional)';
    promoTicket = 'Ticket Promo';
    teamSelectionTitle = 'Ticket Team Selection Title';
    teamCreationTitlte = 'New Team creation title';
    enableTeamCreation = 'Enable Team Creation';
    enableDonationSection = 'Enable Donation Section';
    donationSectionTitle = 'Donation Section Title';
    orderSumLabel = 'Order Summary Label';
    donationSumLabel = 'Donation Summary Label';
    saveBtn = 'Save Changes';
    previewLink = 'Preview Page';
    saveSuccessText = 'Saved successfully!';
    inputTicketSetingForm(title: string, name: string, promo: string,teamselectiont : string, teamCreatetitle : string ,donatitle:string, enableTeam: boolean, enableDona: boolean, orderLb: string, donaLb: string) {
        cy.get('label').contains(this.titlePage).next('input').clear({force: true});
        if(title != "")
            cy.get('label').contains(this.titlePage).next('input').type(title,{force: true});

        cy.get('label').contains(this.nameTicket).next('input').clear();
        if(name != "")
            cy.get('label').contains(this.nameTicket).next('input').type(name);

        cy.get('label').contains(this.promoTicket).next('input').clear();
        if(promo != "")
            cy.get('label').contains(this.promoTicket).next('input').type(promo);

        cy.get('label').contains(this.teamSelectionTitle).next('input').clear();
        if(teamselectiont != "")
            cy.get('label').contains(this.teamSelectionTitle).next('input').type(teamselectiont);

        cy.get('label').contains(this.donationSectionTitle).next('input').clear();
        if(teamCreatetitle != "")
            cy.get('label').contains(this.donationSectionTitle).next('input').type(teamCreatetitle);

        cy.get('label').contains(this.promoTicket).next('input').clear();
        if(donatitle != "")
            cy.get('label').contains(this.promoTicket).next('input').type(donatitle);

        if (enableTeam)
            cy.get('label').contains(this.enableTeamCreation).next('input').check();
        else
            cy.get('label').contains(this.enableTeamCreation).next('input').uncheck();

        if (enableDona)
            cy.get('label').contains(this.enableDonationSection).next('input').check();
        else
            cy.get('label').contains(this.enableDonationSection).next('input').uncheck();

        cy.get('label').contains(this.orderSumLabel).next('input').clear();
        if(orderLb!= "")
            cy.get('label').contains(this.orderSumLabel).next('input').type(orderLb);

        cy.get('label').contains(this.donationSumLabel).next('input').clear();
        if(donaLb!= "")
            cy.get('label').contains(this.donationSumLabel).next('input').type(donaLb);

    }

    clickSaveButton(){
        cy.get('button').contains(this.saveBtn).click({force: true});
    }

    clickOKButton(){
        cy.get('button').contains('OK').click({force: true});
    }

    clickReviewPage(){
        cy.get('a').contains(this.previewLink).click({force: true});
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }

}