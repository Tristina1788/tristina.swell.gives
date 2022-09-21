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

    
    inputLeaderBoardSetting(isLB : boolean = true, isTopFundraiser : boolean = true, topFundraiserLB :String, isTable : boolean = true,
        tableLB : String, isSocial : boolean = true, socialLB : String, isTeam : boolean = true, teamLB : string){

        if(isLB){
            cy.get(this.leaderBoardCb).check();
        } else cy.get(this.leaderBoardCb).uncheck();
        cy.get(this.topFundraiserLB).clear();
        if(isTopFundraiser){
            cy.get(this.topFundraiserLBCb).check();
            cy.get(this.topFundraiserLB).type(topFundraiserLB);
        } else {
            cy.get(this.topFundraiserLBCb).uncheck();
        }

        cy.get(this.topTableLBCB).clear();
        if(isTable){
            cy.get(this.topFundraiserLBCb).check();
            cy.get(this.topFundraiserLB).type(topFundraiserLB);
        } else {
            cy.get(this.topFundraiserLBCb).uncheck();
        }

    }

}