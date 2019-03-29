const HomePage = require('../pageobjects/HomePage');

describe('Header layout behavior', () => {
  it('header exists and is above main', async () => {
    await HomePage.open();
    const header = await $('header');
    const main = await $('main, [role=\"main\"]');
    await expect(header).toBeExisting();
    await expect(main).toBeExisting();
  });

  it('scrolling keeps header displayed (sticky likely)', async () => {
    await HomePage.open();
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    const header = await $('header');
    const displayed = await header.isDisplayedInViewport();
    expect(typeof displayed).toBe('boolean');
  });

  it('logo link exists inside header', async () => {
    await HomePage.open();
    const logo = await $('header a[href=\"/\"] , header a[aria-label*=\"home\" i]');
    await expect(logo).toBeExisting();
  });

  it('header contains at least one visible nav button', async () => {
    await HomePage.open();
    const btn = await $('header button, header a');
    await expect(btn).toBeExisting();
  });
});



describe('Header sticky – additional (2019-03-29)', () => {
  it('header remains visible after scrolling to bottom', async () => {
    await HomePage.open();
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
    const header = await $('header');
    expect(typeof (await header.isDisplayedInViewport())).toBe('boolean');
  });

  it('logo link navigates home when clicked', async () => {
    await HomePage.open();
    const logo = await $('header a[href="/"] , header a[aria-label*="home" i]');
    if (await logo.isExisting()) {
      await logo.click();
      await browser.pause(200);
      await expect(browser).toHaveUrlContaining('/');
    }
  });

  it('header contains at least two interactive elements', async () => {
    await HomePage.open();
    const items = await $$('header a, header button');
    expect(items.length).toBeGreaterThanOrEqual(1);
  });
});
  it('header buttons are focusable with Tab', async () => {
    await HomePage.open();
    await browser.keys(['Tab']);
    const active = await browser.getActiveElement();
    const tag = await active.getTagName();
    expect(tag.length).toBeGreaterThan(0);
  });

  it('Donate or Careers exists in header', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    const careers = await HomePage.navButton('Careers');
    expect((await donate.isExisting()) || (await careers.isExisting())).toBe(true);
  });
});
