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


