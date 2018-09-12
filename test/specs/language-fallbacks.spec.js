const HomePage = require('../pageobjects/HomePage');

describe('Language and text fallbacks', () => {
  it('site has a lang attribute on html element', async () => {
    await HomePage.open();
    const lang = await $('html').getAttribute('lang');
    expect(typeof lang === 'string').toBe(true);
  });

  it('important headings are non-empty', async () => {
    await HomePage.open();
    const h1 = await $('h1');
    if (await h1.isExisting()) {
      const text = await h1.getText();
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  it('buttons have accessible names', async () => {
    await HomePage.open();
    const buttons = await $$('button');
    const sample = buttons.slice(0, 8);
    for (const b of sample) {
      const name = await b.getAttribute('aria-label');
      const text = await b.getText();
      expect(Boolean((name && name.trim()) || (text && text.trim()))).toBe(true);
    }
  });
});


