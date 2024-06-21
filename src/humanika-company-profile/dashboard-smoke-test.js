import { browser } from 'k6/experimental/browser';
import { sleep, check } from 'k6';

export const options = {
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

  // 01. Go to the homepage
  try {
    await page.goto(__ENV.DEV_COMPRO);

    page.waitForSelector('#nav-1');
    
    // Validate UI Dashboard Fully Loaded  
    check(page, {
      'Header': p => p.locator('#title-cta').textContent() == 'ONE STEP IN BECOMING THE BEST IN THE INDUSTRY'+'Register Now',
      'Button-register': p => p.locator('#title-cta > div > div > h1 > div > a').isVisible(),
      'Button-offline-bootcamp': p => p.locator('#top > div.col-lg-6.col-7.d-flex.flex-column.justify-content-center.ps-lg-3.ps-2.py-2 > div.col-10.col-md-6.col-lg-7.col-xxl-5 > div').isVisible(),
      'Button-online-bootcamp': p => p.locator('#bottom > div.col-lg-6.col-7.d-flex.flex-column.justify-content-center.ps-lg-4.pt-3.py-4 > div.col-10.col-md-6.col-lg-7.col-xxl-5 > div').isVisible(),
      'Button-experience-hiring': p => p.locator('#card-wrapper-right > div.col-6.d-flex.flex-column.justify-content-center.px-2 > div.col-11.col-md-9.col-lg-11.col-xxl-7 > div').isVisible(),
      'Section-providing-indonesia': p => p.locator('#section-statistic').isVisible(),
      'Section-why-enigmacamp': p => p.locator('#section-why-enigma').isVisible(),
      'Section-testimonials': p => p.locator('#section-testimonials > div > div > div').isVisible(),
      'Section-programs-and-services': p => p.locator('#section-program-and-services').isVisible(),
      'Section-our-graduates': p => p.locator('#section-our-graduates').isVisible(),
      'Section-for-corporate': p => p.locator('#section-for-corporate').isVisible(),
      'Section-articles': p => p.locator('#section-articles').isVisible(),
      'Footer': p => p.locator('body > footer > div.ec-container-sm.pt-3').isVisible(),
      'Section-copyright': p => p.locator('body > footer > div.text-center.ec-fs-6.p-4').isVisible()
    });
    sleep(4);
  } finally {
    page.close();
  }
}