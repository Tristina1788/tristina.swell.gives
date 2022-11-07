export class DetailSetupPage{
    nonProfitName = '#beneficiary';
    nameEvent = '#name';
    descEvent = '#event_description';
    dateEvent = '#date';
    timeEvent = '#time';
    locationEvnt = '#location';
    timeZone = '#timezone';
    saveBtn = 'Save Changes';
    saveSuccessTxt = 'Saved successfully!';
    titleEvent = 'strong';

    visit(url : string){
        cy.visit(url);
    }
    inputNonProfitNameDetails(nonPName:string){
        cy.get(this.nonProfitName).clear();
        cy.wait(3000);
        cy.get(this.nonProfitName).type(nonPName);
    }

    inputNameEventDetails(name:string){
        cy.get(this.nameEvent).clear();
        cy.get(this.nameEvent).type(name);
    }

    inputDateEventDetails(date:string){
        cy.get(this.dateEvent).clear();
        cy.get(this.dateEvent).type(date);
    }

    inputDescriptionEventDetails(desc:string){
        cy.get(this.descEvent).clear();
        cy.get(this.descEvent).type(desc);
    }

    inputTimeEventDetails(time:string){
        cy.get(this.timeEvent).clear();
        cy.get(this.timeEvent).type(time);
    }

    inputLocationEventDetails(location:string){
        cy.get(this.locationEvnt).clear();
        cy.get(this.locationEvnt).type(location);
    }

    inputTimezoneEventDetails(timez:string){
        //cy.get(this.timeZone).clear();
        cy.get(this.timeZone).select(timez);
    }

    clickSaveBtn(){
        cy.get('button').contains(this.saveBtn).click();
    }
    
    VerifyUpdateFormSuccess(){
        cy.get('p').contains(this.saveSuccessTxt).should('be.visible');
    }

    VerifyUpdateCorrectlyInfors(nonPName:string, name :string, desc :string, date:string, time:string, location:string, tzone:string){
        
        cy.get(this.nonProfitName).should('contain.value',nonPName);
        cy.get(this.nameEvent).should('contain.value',name);
        cy.get(this.descEvent).should('contain.value',desc);
        cy.get(this.dateEvent).should('contain.value',date);
        cy.get(this.timeEvent).should('contain.value',time);
        cy.get(this.locationEvnt).should('contain.value',location);
        cy.get(this.timeZone).contains(tzone).should('be.visible');
        cy.get(this.titleEvent).contains(name).should('be.visible');
    }

}