const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "15nfmu",
    "defaultCommandTimeout": 30000,
    "pageLoadTimeout": 60000,
    "video": false,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // use mochawesome reporter as usually
        "reporter": "junit",
        "reporterOptions": {
            "mochaFile": "tests/test-output.[hash].xml",
            "toConsole": true,
            "attachments": true
        },
    },
    "watchForFileChanges": true,
    "chromeWebSecurity": false,
    "modifyObstructiveCode": false
});