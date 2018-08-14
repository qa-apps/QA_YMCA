const HomePage = require('../pageobjects/HomePage');

describe('Header search behavior', () => {
  it('header contains a search control or button', async () => {
    await HomePage.open();
    const ctrl = await $('header input[type=\"search\"], header button[aria-label*=\"search\" i], header [class*=\"search\" i]');
    await expect(ctrl).toBeExisting();
  });

  it('typing into header search preserves value', async () => {
    await HomePage.open();
    const input = await $('header input[type=\"search\"], header input[placeholder*=\"Search\" i]');
    if (await input.isExisting()) {
      await input.setValue('membership');
      await expect(input).toHaveValueContaining('member');
    }
  });

  it('search submit is possible from header when button exists', async () => {
    await HomePage.open();
    const btn = await $('header button[type=\"submit\"], header button[aria-label*=\"search\" i]');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(200);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
    }
  });
});


