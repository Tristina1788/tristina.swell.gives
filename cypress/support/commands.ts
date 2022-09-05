/// <reference types="cypress" />
import { MailSlurp } from "../../node_modules/mailslurp-client";
// set your api key with an environment variable `CYPRESS_API_KEY` or configure using `env` property in config file
// (cypress prefixes environment variables with CYPRESS)
const apiKey = '2180e5ecdf3748d4e9624d9a2f3c6953849acb73641803008b73f3998542d121';
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  // how long we should hold connection waiting for an email to arrive
  const timeoutMillis = 30_000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
});

Cypress.Commands.add("getAllEmail", (inboxId) => {
  // how long we should hold connection waiting for an email to arrive
  return mailslurp.getEmails(inboxId);
});



// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self'); 
      });
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});