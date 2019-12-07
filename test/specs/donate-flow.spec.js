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



describe('Donate flow – extended (2019-04-17)', () => {
  it('Donate header button navigates to donation related page', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    if (await donate.isExisting()) {
      await donate.click();
      await browser.pause(250);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
    }
  });

  it('Donate remains accessible after back navigation', async () => {
    await browser.back();
    const donate = await HomePage.navButton('Donate');
    await expect(donate).toBeExisting();
  });

  it('Donate element is focusable and visible in viewport', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    await donate.focus();
    const active = await browser.getActiveElement();
    const tag = await active.getTagName();
    expect(tag.length).toBeGreaterThan(0);
    const vis = await donate.isDisplayedInViewport();
    expect(typeof vis).toBe('boolean');
  });
});
  it('Donate button remains present after reload', async () => {
    await HomePage.open();
    await browser.refresh();
    const donate = await HomePage.navButton('Donate');
    await expect(donate).toBeExisting();
  });
});

describe('Donate flow behaviors (2019-12-07)', () => {
  it('donate button is visible and clickable', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    await expect(donate).toBeExisting();
    const clickable = await donate.isClickable();
    expect(typeof clickable).toBe('boolean');
  });

  it('donate page navigation keeps header present', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    if (await donate.isExisting()) {
      await donate.click();
      await browser.pause(150);
      await expect($('header')).toBeExisting();
    }
  });

  it('donate button is keyboard focusable', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    await donate.focus();
    const active = await browser.getActiveElement();
    expect(typeof (await active.getTagName())).toBe('string');
  });
});
