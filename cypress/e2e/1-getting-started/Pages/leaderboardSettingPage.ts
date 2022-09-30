export class LeaderboardSettingPage{
    leaderBoardCb = '[name="LeaderboardsVisible"]';
    topFundraiserLBCb = '[name="LeaderboardsFundraisersEnabled"]';
    topFundraiserLB = '[name="LeaderboardsFundraisersLabel"]';
    topTableLBCB = '[name="LeaderboardsTablesEnabled"]';
    topTableLB = '[name="LeaderboardsTablesLabel"]';
    mostSocialLBCB = '[name="LeaderboardsSocialEnabled"]';
    mostSocialLB = '[name="LeaderboardsSocialLabel"]';
    showTeamLBCB = '[name="LeaderboardsTeamsEnabled"]';
    showTeamLB = '[name="LeaderboardsTeamsLabel"]';
    saveButton = 'Save Changes';
    saveSuccessText = 'Saved successfully!';

    
    inputLeaderBoardSetting(isLB : boolean = true, isTopFundraiser : boolean = true, topFundraiserLB : string, isTable : boolean = true,
        tableLB : string, isSocial : boolean = true, socialLB : string, isTeam : boolean = true, teamLB : string){

        if(isLB){
            cy.get(this.leaderBoardCb).check();
            if(isTopFundraiser){
                cy.get(this.topFundraiserLBCb).check();
                cy.get(this.topFundraiserLB).clear();
                if(topFundraiserLB != "")
                    cy.get(this.topFundraiserLB).type(topFundraiserLB);
            } else {
                cy.get(this.topFundraiserLBCb).uncheck();
            }
    
           
            if(isTable){
                cy.get(this.topTableLBCB).check();
                cy.get(this.topTableLB).clear();
                if(tableLB != "")
                    cy.get(this.topTableLB).type(tableLB);
            } else {
                cy.get(this.topTableLBCB).uncheck();
            }
    
            if(isSocial){
                cy.get(this.mostSocialLBCB).check();
                cy.get(this.mostSocialLB).clear();
                if(socialLB != "")
                    cy.get(this.mostSocialLB).type(socialLB);
            } else {
                cy.get(this.mostSocialLBCB).uncheck();
            }
    
            if(isTeam){
                cy.get(this.showTeamLBCB).check();
                cy.get(this.showTeamLB).clear();
                if(teamLB != "")
                    cy.get(this.showTeamLB).type(teamLB);
            } else {
                cy.get(this.showTeamLBCB).uncheck();
            }
        } else cy.get(this.leaderBoardCb).uncheck();
    }

    clickSaveButton(){
        cy.get('button').contains(this.saveButton).click({force: true});
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }
}