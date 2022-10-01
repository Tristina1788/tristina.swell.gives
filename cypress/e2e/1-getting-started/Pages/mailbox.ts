export class Mailbox {
    verifyMailboxGetEmailPledge(inboxId: string) {
        cy.waitForLatestEmail(inboxId, 120000).then(latestEmail => {
            console.log(latestEmail.from);
            console.log("latestEmail:" + latestEmail);
            expect(latestEmail.from).to.eql('info@swellfundraising.com');
            expect(latestEmail.headers.Subject).to.contain('Thanks for Pledging Support to');
        });
        cy.emptyInbox(inboxId);

    }

    verifyMailboxGetEmailPurchaseSuccess(inboxId: string) {
        cy.waitForLatestEmail(inboxId, 120000).then(latestEmail => {
            console.log(latestEmail.from);
            console.log("latestEmail:" + latestEmail);
            expect(latestEmail.from).to.eql('info@swellfundraising.com');
            expect(latestEmail.subject).to.contain('Thank you for supporting');
            expect(latestEmail.body).to.contain('This is your receipt confirming <u>your donation</u> of');
        });

        cy.emptyInbox(inboxId);

    }

    verifyMailboxGetEmailPurchaseTicketSuccess(inboxId: string) {
        cy.wait(70000);
        let email1 = 0;
        let email2 = 0;
        let email3 = 0;
        cy.getAllEmail(inboxId).then(emails => {
            console.log("emails:" + emails[0]);
            console.log("emails111:" + emails[0].id);
            expect(emails.length).to.equal(3);
            for (let i = 0; i < 3; i++) {

                cy.getEmail(emails[i].id).then(email => {
                    console.log("subject:" + email.subject);
                    let subject = email.subject;
                    if (subject.includes('Thanks for your purchase supporting')) {
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thanks for your purchase supporting');
                        expect(email.body).to.contain('This is your receipt confirming <u>you purchased');
                        
                        // expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u> 1 ticket(s) for $33.00');
                        email1++;
                        console.log("email1:" + email1);
                    } else if (subject.includes('Thank you for supporting')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thank you for supporting');
                        expect(email.body).to.contain('This is your receipt confirming');
                        // expect(email.body).to.contain('This is your receipt confirming <u>your donation</u> of $75.00.');
                        email2++;
                        console.log("email2:" + email2);
                    } else if (subject.includes('Here is your ticket to')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Here is your ticket to');
                        email3++;
                        console.log("email3:" + email3);
                    }
                    if (i == 2) {
                        expect(email1).equal(1);
                        expect(email2).equal(1);
                        expect(email3).equal(1);
                    }
                })
            }
        });
        cy.emptyInbox(inboxId);

    }

    verifyMailboxGetEmailPurchaseMultiTicketSuccess(inboxId: string) {
        let email1 = 0;
        let email2 = 0;
        let email3 = 0;
        let email4 = 0;
        cy.wait(70000);
        cy.getAllEmail(inboxId).then(emails => {
            expect(emails.length).to.equal(5);
            for (let i = 0; i < 5; i++) {

                cy.getEmail(emails[i].id).then(email => {
                    console.log("subject:" + email.subject);
                    let subject = email.subject;
                    if (subject.includes('Thanks for your purchase supporting')) {
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thanks for your purchase supporting');
                        expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u>');
                        // expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u> 1 ticket(s) for $33.00');
                        email1++;
                    } else if (subject.includes('Thank you for supporting')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thank you for supporting');
                        expect(email.body).to.contain('This is your receipt confirming <u>your donation</u> of');
                        // expect(email.body).to.contain('This is your receipt confirming <u>your donation</u> of $75.00.');
                        email2++;
                    } else if (subject.includes('Here is your ticket to')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Here is your ticket to');
                        email3++;
                    } else if (subject.includes('Here is your virtual ticket')) {
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Here is your virtual ticket');
                        email4++;
                    }

                    if (i == 4) {
                        expect(email1).equal(1);
                        expect(email2).equal(1);
                        expect(email3).equal(2);
                        expect(email4).equal(1);
                    }
                })
            }
             console.log("emails count:" + emails.length);
             cy.emptyInbox(inboxId);
        });
    }

    verifyMailboxGetEmailBecomeHostSuccess(inboxId : string){
        let email1 = 0;
        let email2 = 0;
        let email3 = 0;
        let email4 = 0;
        cy.wait(70000);
        cy.getAllEmail(inboxId).then(emails => {
            expect(emails.length).to.equal(4);
            for (let i = 0; i < 4; i++) {

                cy.getEmail(emails[i].id).then(email => {
                    console.log("subject:" + email.subject);
                    let subject = email.subject;
                    if (subject.includes('Thanks for your purchase supporting')) {
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thanks for your purchase supporting');
                        expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u>');
                        // expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u> 1 ticket(s) for $33.00');
                        email1++;
                    } else if (subject.includes('Thank you for supporting') && !subject.includes('Invite your guests here.')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thank you for supporting');
                        expect(email.body).to.contain('This is your receipt confirming');
                        // expect(email.body).to.contain('This is your receipt confirming <u>your donation</u> of $75.00.');
                        email2++;
                    } else if (subject.includes('Here is your ticket to')) {
                        console.log("subject:" + email.subject);
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Here is your ticket to');
                        email3++;
                    } else if (subject.includes('by hosting a Table.  Invite your guests here')) {
                        expect(email.from).to.eql('info@swellfundraising.com');
                        expect(email.subject).to.contain('Thank you for supporting');
                        expect(email.subject).to.contain('by hosting a Table.  Invite your guests here.');
                        email4++;
                    }

                    if (i == 4) {
                        expect(email1).equal(1);
                        expect(email2).equal(1);
                        expect(email3).equal(1);
                        expect(email4).equal(1);
                    }
                })
            }
             console.log("emails count:" + emails.length);
             cy.emptyInbox(inboxId);
        });
    }

    verifyMailboxGetEmailBecomeHostGuestSuccess(inboxId : string, name : string){
        cy.waitForLatestEmail(inboxId, 120000).then(latestEmail => {
            console.log(latestEmail.from);
            console.log("latestEmail:" + latestEmail);
            expect(latestEmail.from).to.eql('info@swellfundraising.com');
            expect(latestEmail.subject).to.contain('Hey! '+name+' invited you to');
            expect(latestEmail.subject).to.contain('Please say you are going.');
            
        });
    
        cy.emptyInbox(inboxId);
    }

    verifyMailboxGetEmailSponsorshipSuccess(inboxId : string, name : string){
        cy.waitForLatestEmail(inboxId, 120000).then(email => {
            expect(email.from).to.eql('info@swellfundraising.com');
            expect(email.subject).to.contain('Thanks for your purchase supporting');
            expect(email.body).to.contain('This is your receipt confirming <u>you purchased</u>');
            
        });
    
        cy.emptyInbox(inboxId);
    }

    verifyMailboxGetEmailFundraiserSuccess(inboxId : string, name : string){
        cy.waitForLatestEmail(inboxId, 120000).then(email => {
            expect(email.from).to.eql('info@swellfundraising.com');
            expect(email.subject).to.contain('Thanks for Registering as a fundraiser for');
            expect(email.body).to.contain('Way to go, you are now a fundraiser for');
            
        });
    
        cy.emptyInbox(inboxId);
    }

    verifyMailboxGetEmailCompTicketSuccess(inboxId : string, name : string){
        cy.wait(70000);
        cy.waitForLatestEmail(inboxId, 120000).then(email => {
            console.log('email :'+email);
            console.log('email.from :'+email.from);
            expect(email.from).to.eql('info@swellfundraising.com');
            expect(email.subject).to.contain('Please register your guests for');
            expect(email.body).to.contain('Here is a link for you to redeem your');
            
        });
    
        cy.emptyInbox(inboxId);
    }

    verifyMailboxGetEmailRegisterCompTicketSuccess(inboxId : string, name : string){
        cy.wait(70000);
        cy.waitForLatestEmail(inboxId, 120000).then(email => {
            console.log('email :'+email);
            console.log('email.from :'+email.from);
            expect(email.from).to.eql('info@swellfundraising.com');
            expect(email.subject).to.contain('Here is your ticket to');
            expect(email.body).to.contain('You are confirmed to attend');
            
        });
    
        cy.emptyInbox(inboxId);
    }

    verifyMailboxGetEmailHostingTableSuccess(inboxId : string, name : string){
        cy.waitForLatestEmail(inboxId, 120000).then(email => {
            expect(email.from).to.eql('info@swellfundraising.com');
            expect(email.subject).to.contain('Thank you for supporting');
            expect(email.body).to.contain('Thank you for hosting a Table');
            
        });
    
        cy.emptyInbox(inboxId);
    }
}