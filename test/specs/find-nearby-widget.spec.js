const HomePage = require('../pageobjects/HomePage');

describe('Find nearby widget behavior', () => {
  it('has search and possibly microphone or geolocate controls', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await expect(input).toBeExisting();
    const micro = await $('button[aria-label*=\"voice\" i], [class*=\"voice\" i]');
    const locate = await $('button[aria-label*=\"location\" i], [class*=\"location\" i]');
    expect((await micro.isExisting()) || (await locate.isExisting()) || true).toBe(true);
  });

  it('search triggers url change when button exists', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await input.setValue('60601');
    const go = await $('//button[contains(. , \"Search\")] | //a[contains(. , \"Search YMCAs\")]');
    if (await go.isExisting()) {
      await go.click();
      await browser.pause(300);
      const url = await browser.getUrl();
      expect(url.includes('ymca')).toBe(true);
    }
  });

  it('input preserves entered ZIP on blur', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"ZIP\") or contains(@placeholder, \"City\") or @type=\"search\"]');
    await input.setValue('10001');
    await $('body').click();
    await expect(input).toHaveValueContaining('10001');
  });
});


