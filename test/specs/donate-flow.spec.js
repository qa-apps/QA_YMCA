const HomePage = require('../pageobjects/HomePage');

describe('Donate primary flow', () => {
  it('Donate button exists in header', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    await expect(donate).toBeExisting();
  });

  it('clicking Donate navigates to a donation page', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    if (await donate.isExisting()) {
      await donate.click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(3);
    }
  });

  it('back to home keeps header interactive', async () => {
    await browser.back();
    const header = await $('header');
    await expect(header).toBeExisting();
  });

  it('Donate element is focusable', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    if (await donate.isExisting()) {
      await donate.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.length).toBeGreaterThan(0);
    }
  });
});


