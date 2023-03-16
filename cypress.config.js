const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.mercedes-benz.co.uk",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
