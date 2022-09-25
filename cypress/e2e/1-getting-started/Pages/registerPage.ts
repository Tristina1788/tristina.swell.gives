export class RegisterPage{
    registerTitle = 'Register';
    registerCompTitle = 'Register for the Event';
    firstNameRegisterInput = '[name="attendee_name-firstName"]';
    lastNameRegisterInput = '[name="attendee_name-lastName"]';
    phoneRegisterInput = '[name="attendee_phone"]';
    emailAddress = '[name="attendee_email"]';
    registerBtn = '.nextButton';
    PreviousBtn = '.Previous';
    inforEvent = '.event-info';
    imgEvent = '.bg-stretch';
    imglogo = '.logo';
    teamSelect = '#team-select';
    addAnotherTKBtn = 'Add Another Ticket';
    removeTKBtn = 'Remove Ticket';
    firstNameRegisterInput2 = '[name="attendee_name-section2-firstName"]';
    lastNameRegisterInput2 = '[name="attendee_name-section2-lastName"]';
    phoneRegisterInput2 = '[name="attendee_phone-section2"]';
    emailAddress2 = '[name="attendee_email-section2"]';

    verifyImageLogoSetupCorrectInBranding(){
       
        cy.get(this.imglogo).eq(1).children('a').children('img').invoke('attr', 'src')
        .then(link => {
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageLogo);
            });
            
        });
    }
    verifyRegisterPage(){
        cy.get('h1').contains(this.registerTitle).should('be.visible');
    }
    verifyRegisterPageForComp(){
        cy.get('h1').contains(this.registerCompTitle).should('be.visible');
    }

    inputRegisterForm(fname : string, lname :string, phone : string, email:string){
        cy.get(this.firstNameRegisterInput).type(fname);
        cy.get(this.lastNameRegisterInput).type(lname);
        cy.get(this.phoneRegisterInput).type(phone);
        cy.get(this.emailAddress).type(email);
    }

    clickRegisterButton(){
        cy.get(this.registerBtn).click();
    }

    clickPreviousButton(){
        cy.get('.button').contains(this.PreviousBtn).click();
    }

    verifyInforEventCorrect(date : string, time : string, location : string){
        cy.get('div').find(this.inforEvent).contains(date +' | '+ time + ' | ' + location).should('be.visible');
    }

    verifyNonProfitNameCorrect(nameNP : string){
        cy.get('strong').contains(nameNP).should('be.visible');
    }

    verifyImageHeaderSetupCorrectInBranding(){
       
        cy.get(this.imgEvent).children('img').invoke('attr', 'src')
        .then(link => {
            
            const linkImg1 = link?.substring(link.length-29,link.length)+"" //419/1661783284-76906394.jpg
            cy.readFile('./data/images.json').then((image)=> {
                expect(linkImg1).to.equal(image.imageHeader);
            });
            
        });
    }

    clickButtonAddAnotherTicket(){
        cy.get('button').contains(this.addAnotherTKBtn).should('be.visible');
    }

    verifyButtonAddAnotherTicketIsAvailable(){
        cy.get('button').contains(this.addAnotherTKBtn).should('be.visible');
    }

    verifyButtonAddAnotherTicketIsNotAvailable(){
        cy.get('button').contains(this.addAnotherTKBtn).should('be.not.visible');
    }

    clickButtonRemoveTicket(){
        cy.get('button').contains(this.removeTKBtn).click();
    }

    verifyButtonRemoveTicketIsAvailable(){
        cy.get('button').contains(this.removeTKBtn).should('be.visible');
    }

    verifyButtonRemoveTicketIsNotAvailable(){
        cy.get('button').contains(this.removeTKBtn).should('be.not.visible');
    }

    clickAddAnotherTicket(){
        cy.get('button').contains(this.addAnotherTKBtn).click();
    }

    clickRemoveTicketButton(){
        cy.get('button').contains(this.removeTKBtn).click();
    }

    verifyRegisterFormForAttendees2(){
        cy.get(this.firstNameRegisterInput2).should('be.visible');
        cy.get(this.lastNameRegisterInput2).should('be.visible');
        cy.get(this.phoneRegisterInput2).should('be.visible');
        cy.get(this.emailAddress2).should('be.visible');
    }

    verifyNewTeamDisplayInRegisterPage(newTeam: string) {
        cy.get(this.teamSelect).select(newTeam);
        cy.get(this.teamSelect).should('contain', newTeam);
    }

    verifyTeamIsNotExist(team: string) {
        cy.get('option').contains(team).should('be.not.exist');
    }
}