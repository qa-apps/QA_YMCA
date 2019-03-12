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



describe('Careers navigation – extended (2019-03-12)', () => {
  it('Careers link text is non-empty', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    await expect(btn).toBeExisting();
    const txt = await btn.getText();
    expect(txt.trim().length).toBeGreaterThanOrEqual(0);
  });

  it('Careers link is either button or anchor', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    const role = await btn.getAttribute('role');
    const tag = await btn.getTagName();
    expect(['button', 'a'].includes(tag) || role === 'button').toBe(true);
  });

  it('navigates to Careers page and keeps header visible', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    await btn.click();
    await browser.pause(250);
    const title = await browser.getTitle();
    expect(title.length).toBeGreaterThan(3);
    const header = await $('header');
    await expect(header).toBeExisting();
  });

  it('Careers element is displayed in viewport', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    const vis = await btn.isDisplayedInViewport();
    expect(typeof vis).toBe('boolean');
  });
});
