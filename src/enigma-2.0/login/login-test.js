import { browser } from 'k6/experimental/browser';
import { LoginPage } from './login.js';
import { check } from 'k6'

const url = 'https://dev.enigmacamp.com/apps/portal/backoffice/#/auth/login';

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
    name: 'BACKOFFICE LOGIN'
  },
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const page = browser.newPage();
  try {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.submitForm();

    check(page, {
        'Homepage': loginPage.getVerificationName() == 'Welcome, Admin Portal!'
    });
    page.screenshot({ path: `screenshots/success-login.png` });

  } finally {
    page.close();
  }
}