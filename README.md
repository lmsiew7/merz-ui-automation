# Welcome to Cypress test!

This project is to test A class hatchback price comparison function using Cypress. This will output a text file with the highest and the lowest price.

## Project structure

| File       | Path                              |
|------------|-----------------------------------|
| test specs | cypress/e2e/validatePricing.cy.js |
| screenshot | cypress/screenshots               |
| recording  | cypress/videos                    |
|  report    | cypress/report                    |


## Prerequisites

- Cypress
- NodeJS v18

## Installation

```
npm install
```

## Run tests

```
npm run e2e
```

## Run tests on cross browser
Ensure the browser is installed in your machine.
[Reference](https://docs.cypress.io/guides/guides/cross-browser-testing.html)


```
npm run e2e:chrome
```

```
npm run e2e:firefox
```
