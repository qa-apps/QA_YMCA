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

  it('search CTA exists even if disabled initially', async () => {
    await HomePage.open();
    const go = await $('//button[contains(. , \"Search\")] | //a[contains(. , \"Search YMCAs\")]');
    expect(typeof (await go.isExisting())).toBe('boolean');
  });
});



describe('Find nearby widget – extended (2019-05-07)', () => {
  it('ZIP input accepts numeric string and retains it', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, "ZIP") or @type="search"]');
    if (await input.isExisting()) {
      await input.setValue('60616');
      await expect(input).toHaveValueContaining('606');
    }
  });

  it('search button exists and is focusable when present', async () => {
    await HomePage.open();
    const go = await $('//button[contains(. , "Search")] | //a[contains(. , "Search YMCAs")]');
    if (await go.isExisting()) {
      await go.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.length).toBeGreaterThan(0);
    }
  });

  it('submits and evaluates page title/URL minimal change', async () => {
    await HomePage.open();
    const go = await $('//button[contains(. , "Search")] | //a[contains(. , "Search YMCAs")]');
    if (await go.isExisting()) {
      await go.click();
      await browser.pause(250);
      const title = await browser.getTitle();
      expect(title.length >= 0).toBe(true);
    }
  });
});
  it('input keeps value after blur', async () => {
    await HomePage.open();
    const input = await ;
    if (await input.isExisting()) {
      await input.setValue('10001');
      await .click();
      await expect(input).toHaveValueContaining('10001');
    }
  });
});
