const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "15nfmu",
  "defaultCommandTimeout":7000,
  "pageLoadTimeout":60000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  // use mochawesome reporter as usually
  "reporter": "mochawesome",
  "reporterOptions": {
    // disable overwrite to generate many JSON reports
    "overwrite": false,
    // do not generate intermediate HTML reports
    "html": false,
    // generate intermediate JSON reports
    "json": true
  }
  },
  "watchForFileChanges": true,
  "chromeWebSecurity":false,
  "modifyObstructiveCode":false
});
