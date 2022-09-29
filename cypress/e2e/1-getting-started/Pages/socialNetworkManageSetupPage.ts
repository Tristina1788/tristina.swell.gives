export class SocialNetworkManageSetupPage {
    facebookPageIdInput = '[data-parsley-id="4"]';
    twitterUsernameInput = '[data-parsley-id="6"]';
    socialMediaHashtagInput = '[data-parsley-id="8"]';
    tweetDonateCb = '[data-parsley-id="11"]';
    messagetoTweetInput = '[data-parsley-id="13"]';
    saveChangesBtn = 'Save Changes';
    successMsg = 'Saved successfully!';

    inputFormInfor(facebookID :string, twitterUsername : string, socialHashtag: string, message: string, isDonate : boolean ){
        cy.wait(3000);
        cy.get(this.facebookPageIdInput).clear();
        cy.get(this.facebookPageIdInput).type(facebookID);
        cy.get(this.twitterUsernameInput).clear();
        cy.get(this.twitterUsernameInput).type(twitterUsername);
        cy.get(this.socialMediaHashtagInput).clear();
        cy.get(this.socialMediaHashtagInput).type(socialHashtag);
        if(isDonate == true)
            cy.get(this.tweetDonateCb).check();
        else
            cy.get(this.tweetDonateCb).uncheck();
        // .
    }

    clickSaveChangesBtn() {
        cy.get('button').contains(this.saveChangesBtn).click();
    }

    verifySaveSuccessfully(){
        cy.get('p').contains(this.successMsg).should('be.visible');
    }

    verifyUpdateFormSuccess(facebookID :string, twitterUsername : string, socialHashtag: string, message: string ){
        cy.get(this.facebookPageIdInput).invoke('attr','value').then(value=>{
            expect(value).equal(facebookID);
        });
        cy.get(this.twitterUsernameInput).invoke('attr','value').then(value=>{
            expect(value).equal(twitterUsername);
        });
        cy.get(this.socialMediaHashtagInput).invoke('attr','value').then(value=>{
            expect(value).equal(socialHashtag);
        });
    }
}