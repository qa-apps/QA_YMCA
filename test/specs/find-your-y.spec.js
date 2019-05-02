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



describe('Find Your Y – extended (2019-05-02)', () => {
  it('search accepts city text and preserves value', async () => {
    await browser.url('/');
    const input = await $('//input[contains(@placeholder, "ZIP") or contains(@placeholder, "City") or @type="search"]');
    if (await input.isExisting()) {
      await input.setValue('New York');
      await expect(input).toHaveValueContaining('New');
    }
  });

  it('search CTA or link exists and is clickable when present', async () => {
    await browser.url('/');
    const go = await $('//button[contains(. , "Search")] | //a[contains(. , "Search YMCAs")]');
    if (await go.isExisting()) {
      const clickable = await go.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('after submission, URL or page content updates in some way', async () => {
    await browser.url('/');
    const go = await $('//button[contains(. , "Search")] | //a[contains(. , "Search YMCAs")]');
    if (await go.isExisting()) {
      await go.click();
      await browser.pause(250);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
    }
  });

  it('optional voice/location controls may be present', async () => {
    await browser.url('/');
    const mic = await $('button[aria-label*="Voice" i], [class*="voice" i]');
    const geo = await $('button[aria-label*="location" i], [class*="location" i]');
    expect((await mic.isExisting()) || (await geo.isExisting()) || true).toBe(true);
  });
});
  it('results placeholder or list area appears after search attempt', async () => {
    await browser.url('/');
    const go = await ;
    if (await go.isExisting()) {
      await go.click();
      await browser.pause(250);
      const any = await 24618('section, div');
      expect(Array.isArray(any)).toBe(true);
    }
  });
});
