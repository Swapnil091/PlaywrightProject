# Specs

Gherkin test plans for the StockMaster web application:

- `stockmaster-management.feature` covers the dashboard, products, categories, customers, and suppliers.
- `../features/login.feature` is the runnable authentication feature, covering sign-in, sign-out, and protected pages.

Run data-changing scenarios only against an isolated test or staging instance, never production. Configure the test environment with `STOCKMASTER_BASE_URL`, `STOCKMASTER_ADMIN_EMAIL`, and `STOCKMASTER_ADMIN_PASSWORD`; do not commit real credentials. Use unique test records and remove them during scenario cleanup.

The login feature is runnable with Cucumber.js and Playwright. Install dependencies and Chromium with `npm install` and `npx playwright install chromium`. Copy `.env.example` to `.env`, set a test or staging URL, and add credentials for the authenticated scenarios. Never run data-changing scenarios against production.

Run all authentication scenarios with `npm run test:cucumber:auth:chromium`. Run scenarios that do not need administrator credentials with `npm run test:cucumber:auth:chromium:independent`. The HTML report is written to `reports/cucumber-report.html`. Management scenarios remain specifications until their step definitions are implemented.

Run the smoke-tagged scenarios with `npm run test:cucumber:smoke`. This includes a credential-independent login-page check; the sign-in and sign-out smoke scenarios require the administrator credentials.
