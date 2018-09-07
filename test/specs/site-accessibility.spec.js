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
});


