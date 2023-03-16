/// <reference types="cypress" />

describe("Validate A Class models price are between £15,000 and £60,000", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Visits the UK website", () => {
    cy.visit("/");
    cy.get("cmm-cookie-banner")
      .shadow()
      .find('button[data-test="handle-accept-all-button"]')
      .first()
      .click();
  });

  it("Select model", () => {
    // to ensure the entire page is ready
    cy.get('iframe[title="Message bubble"]', { timeout: 10000 });
    cy.get("owc-header")
      .shadow()
      .find("p.owc-header-navigation-topic__label")
      .first()
      .click();
    cy.get("vmos-flyout").shadow().find('wb-icon[name="sportstourer"]').click();
    cy.get("vmos-flyout")
      .shadow()
      .find("p")
      .contains("A-Class Hatchback")
      .click();
    cy.get("cmm-cookie-banner")
      .shadow()
      .find('button[data-test="handle-accept-all-button"]')
      .first()
      .click();
    cy.get("owc-stage").shadow().find("a").contains("Build your car").click();
  });

  it("Select fuel type", () => {
    cy.get("owcc-car-configurator")
      .shadow()
      .find("div.wb-multi-select-control__label")
      .click({ force: true });
    cy.get("owcc-car-configurator")
      .shadow()
      .find('input[type="checkbox"]')
      .first()
      .check({ force: true });
    // close the checkbox list
    cy.get("owcc-car-configurator")
      .shadow()
      .find("div.wb-multi-select-control__label")
      .click({ force: true });
  });

  it("Take screenshot", () => {
    cy.get("cmm-cookie-banner")
      .shadow()
      .find('button[data-test="handle-accept-all-button"]')
      .first()
      .click({ force: true });
    cy.screenshot("a-class-hatchback-diesel-pricing");
  });

  it("Save highest and lowest price", () => {
    cy.get("cmm-cookie-banner")
      .shadow()
      .find('button[data-test="handle-accept-all-button"]')
      .first()
      .click({ force: true });

    const priceList = [];
    cy.get("owcc-car-configurator")
      .shadow()
      .find("div.cc-motorization-comparison-wrapper")
      .children()
      .each((result) => {
        let price = result
          .find(
            'span[class="cc-motorization-header__price--with-environmental-hint"]'
          )
          .text();
        price = parseFloat(price.trim().substring(1).replace(/,/g, ""));
        priceList.push(price);
      });

    cy.wrap(priceList).then((pl) => {
      const highest = Math.max(...pl);
      const lowest = Math.min(...pl);
      const output = `Highest: ${highest}
Lowest: ${lowest}
`;
      cy.writeFile(`./report/pricing.txt`, output);
    });
  });
});
