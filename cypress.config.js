const { defineConfig } = require("cypress");
const { rmdir } = require("fs");
const del = require("del");
const path = require("path");
module.exports = defineConfig({
    projectId: "15nfmu",
    "defaultCommandTimeout": 60000,
    "pageLoadTimeout": 90000,
    "video": false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
        configFile: "config/reporterOpts.json",
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on("after:spec", (spec, results) => {
                if (results && results.stats.failures === 0 && results.video) {
                  // `del()` returns a promise, so it's important to return it to ensure
                  // deleting the video is finished before moving on
                  return del(results.video);
                }
              });
        },
        // use mochawesome reporter as usually
        // "reporter": "junit",
        // "reporterOptions": {
        //     "mochaFile": "tests/test-output.xml",
        //     "toConsole": true,
        //     "attachments": true
        // },
        fixturesFolder: "cypress/fixtures",
        downloadsFolder: "cypress/downloads",
        screenshotsFolder: "reports/screenshots",
        videosFolder: "reports/videos",
        viewportWidth: 1024,
        viewportHeight: 800,
        videoCompression: 38,
        numTestsKeepInMemory: 1,
        video: true,
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
        "openMode": 1
      }
});