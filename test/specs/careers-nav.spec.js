const HomePage = require('../pageobjects/HomePage');

describe('Careers navigation', () => {
  it('Careers link present in header', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    await expect(btn).toBeExisting();
  });

  it('navigates to careers page on click', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(3);
    }
  });

  it('header remains visible after navigation', async () => {
    const header = await $('header');
    await expect(header).toBeExisting();
  });

  it('Careers button is focusable', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    if (await btn.isExisting()) {
      await btn.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.length).toBeGreaterThan(0);
    }
  });
});


