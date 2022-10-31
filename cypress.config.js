const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "15nfmu",
    "defaultCommandTimeout": 60000,
    "pageLoadTimeout": 90000,
    "video": false,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // use mochawesome reporter as usually
        "reporter": "junit",
        "reporterOptions": {
            "mochaFile": "tests/test-output.xml",
            "toConsole": true,
            "attachments": true
        },
    },
    "watchForFileChanges": false,
    "chromeWebSecurity": false,
    "modifyObstructiveCode": false,
    "retries": {
        // Configure retry attempts for `cypress run`
        // Default is 0
        "runMode": 2,
        // Configure retry attempts for `cypress open`
        // Default is 0
        "openMode": 0
      }
});