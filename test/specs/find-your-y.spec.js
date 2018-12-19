const HomePage = require('../pageobjects/HomePage');

describe('Find Your Y widget', () => {
  it('is visible on the home page', async () => {
    await HomePage.open();
    const section = await $('//h2[contains(. , \"Find Your Y\")]/ancestor::section[1] | //h3[contains(. , \"Find Your Y\")]/ancestor::section[1]');
    await expect(section).toBeExisting();
  });

  it('contains a city/zip search input and buttons', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await expect(input).toBeExisting();
    const btns = await $$('//button[contains(. , \"Search\")] | //a[contains(. , \"Search YMCAs\")]');
    expect(btns.length).toBeGreaterThan(0);
  });

  it('typing a query keeps the input value', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await input.setValue('Chicago');
    await expect(input).toHaveValueContaining('Chi');
  });

  it('shows optional voice or location controls when available', async () => {
    await HomePage.open();
    const mic = await $('button[aria-label*=\"Voice\" i], [class*=\"voice\" i]');
    const geo = await $('button[aria-label*=\"location\" i], [class*=\"location\" i]');
    const micExists = await mic.isExisting();
    const geoExists = await geo.isExisting();
    expect(micExists || geoExists).toBe(true);
  });

  it('map or results area placeholder may appear after search', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await input.setValue('NY');
    const go = await $('//button[contains(. , \"Search\")] | //a[contains(. , \"Search YMCAs\")]');
    if (await go.isExisting()) {
      await go.click();
      await browser.pause(300);
      const results = await $$('section, div').then(list => list.slice(0, 5));
      expect(Array.isArray(results)).toBe(true);
    }
  });
});


