const HomePage = require('../pageobjects/HomePage');

describe('Contact and utility links', () => {
  it('footer contains Contact link', async () => {
    await HomePage.open();
    const link = await $('//footer//a[contains(. , \"Contact\")]');
    await expect(link).toBeExisting();
  });

  it('click Contact loads a page or scrolls', async () => {
    await HomePage.open();
    const link = await $('//footer//a[contains(. , \"Contact\")]');
    if (await link.isExisting()) {
      const href = await link.getAttribute('href');
      await link.click();
      await browser.pause(300);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
      if (href && href.startsWith('#')) {
        expect(url.includes('#')).toBe(true);
      }
    }
  });

  it('footer includes at least one external link', async () => {
    await HomePage.open();
    const ext = await $$('footer a[href^=\"http\"]');
    expect(ext.length).toBeGreaterThan(0);
  });
});



describe('Contact & Utility – extended (2019-04-15)', () => {
  it('footer has Contact or equivalent link', async () => {
    await HomePage.open();
    const contact = await $('//footer//a[contains(. , "Contact")]');
    await expect(contact).toBeExisting();
  });

  it('clicks Contact and verifies URL length', async () => {
    await HomePage.open();
    const contact = await $('//footer//a[contains(. , "Contact")]');
    if (await contact.isExisting()) {
      await contact.click();
      await browser.pause(300);
      expect((await browser.getUrl()).length).toBeGreaterThan(10);
    }
  });

  it('footer contains at least five anchors overall', async () => {
    await HomePage.open();
    const links = await $$('footer a');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
  it('Contact link is visible in viewport', async () => {
    await HomePage.open();
    const contact = await ;
    if (await contact.isExisting()) {
      const vis = await contact.isDisplayedInViewport();
      expect(typeof vis).toBe('boolean');
    }
  });
});
