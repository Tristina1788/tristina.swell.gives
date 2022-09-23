export class LeaderboarSettingPage{
    leaderBoardCb = '[name="LeaderboardsVisible"]';
    topFundraiserLBCb = '[name="LeaderboardsFundraisersEnabled"]';
    topFundraiserLB = '[name="LeaderboardsFundraisersLabel"]';
    topTableLBCB = '[name="LeaderboardsTablesEnabled"]';
    topTableCB = '[name="LeaderboardsTablesLabel"]';
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
        } else cy.get(this.leaderBoardCb).uncheck();
        
        if(isTopFundraiser){
            cy.get(this.topFundraiserLBCb).check();
            cy.get(this.topFundraiserLB).clear();
            cy.get(this.topFundraiserLB).type(topFundraiserLB);
        } else {
            cy.get(this.topFundraiserLBCb).uncheck();
        }

       
        if(isTable){
            cy.get(this.topFundraiserLBCb).check();
            cy.get(this.topFundraiserLB).clear();
            cy.get(this.topFundraiserLB).type(tableLB);
        } else {
            cy.get(this.topFundraiserLBCb).uncheck();
        }

        if(isSocial){
            cy.get(this.mostSocialLBCB).check();
            cy.get(this.mostSocialLB).clear();
            cy.get(this.mostSocialLB).type(socialLB);
        } else {
            cy.get(this.mostSocialLBCB).uncheck();
        }

        if(isTeam){
            cy.get(this.showTeamLBCB).check();
            cy.get(this.showTeamLB).clear();
            cy.get(this.showTeamLB).type(teamLB);
        } else {
            cy.get(this.showTeamLBCB).uncheck();
        }

    }

    clickSaveButton(){
        cy.get('button').contains(this.saveButton).click({force: true});
    }

    verifySaveSuccessfully(){
        cy.wait(2000);
        cy.get('p').contains(this.saveSuccessText).should('be.visible');
    }
}