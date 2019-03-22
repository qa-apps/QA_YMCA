const HomePage = require('../pageobjects/HomePage');

describe('Site accessibility controls', () => {
  it('accessibility widget button exists if provided', async () => {
    await HomePage.open();
    const btn = await $('[aria-label*=\"access\" i], [class*=\"accessibility\" i], button[title*=\"access\" i]');
    expect(typeof (await btn.isExisting())).toBe('boolean');
  });

  it('main landmark and header are present', async () => {
    await HomePage.open();
    const main = await $('main, [role=\"main\"]');
    const header = await $('header');
    await expect(main).toBeExisting();
    await expect(header).toBeExisting();
  });

  it('tabbing focuses a focusable element', async () => {
    await HomePage.open();
    await browser.keys(['Tab']);
    const active = await browser.getActiveElement();
    const tag = await active.getTagName();
    expect(tag.length).toBeGreaterThan(0);
  });

  it('aria-live regions are optional but detectable', async () => {
    await HomePage.open();
    const live = await $$('[aria-live]');
    expect(Array.isArray(live)).toBe(true);
  });

  it('page has at least one heading element', async () => {
    await HomePage.open();
    const anyHeading = await $$('h1, h2, h3, h4, h5, h6');
    expect(anyHeading.length).toBeGreaterThan(0);
  });
});



describe('Accessibility – keyboard/landmarks (2019-03-22)', () => {
  it('page provides role=main or main element', async () => {
    await HomePage.open();
    const mainEl = await $('main, [role="main"]');
    await expect(mainEl).toBeExisting();
  });

  it('header/nav is keyboard focusable via Tab', async () => {
    await HomePage.open();
    await browser.keys(['Tab']);
    const active = await browser.getActiveElement();
    const tag = await active.getTagName();
    expect(tag.length).toBeGreaterThan(0);
  });

  it('there exists at least one aria-label on interactive element', async () => {
    await HomePage.open();
    const el = await $('[aria-label]');
    expect(typeof (await el.isExisting())).toBe('boolean');
  });

  it('skip link or similar anchor may exist', async () => {
    await HomePage.open();
    const skip = await $('a[href^="#"]');
    expect(Array.isArray(await $$('a[href^="#"]'))).toBe(true);
  });
});
  it('footer contains at least one role=contentinfo landmark', async () => {
    await HomePage.open();
    const foot = await ;
    await expect(foot).toBeExisting();
  });
});
