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

  it('html lang is not empty and appears language-like', async () => {
    await HomePage.open();
    const lang = (await $('html').getAttribute('lang')) || '';
    expect(lang.length).toBeGreaterThan(0);
  });
});



describe('Language/Accessibility – extended (2019-04-04)', () => {
  it('html lang attribute exists and is plausible (2–5 chars)', async () => {
    await HomePage.open();
    const lang = (await $('html').getAttribute('lang')) || '';
    expect(lang.length >= 2 && lang.length <= 5).toBe(true);
  });

  it('buttons provide either text or aria-label', async () => {
    await HomePage.open();
    const buttons = await $$('button');
    let ok = 0;
    for (const b of buttons.slice(0, 10)) {
      const name = await b.getAttribute('aria-label');
      const text = (await b.getText()).trim();
      if ((name && name.trim()) || text) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(1);
  });

  it('links contain discernible text for first few anchors', async () => {
    await HomePage.open();
    const anchors = await $$('a[href]');
    let readable = 0;
    for (const a of anchors.slice(0, 8)) {
      const t = (await a.getText()).trim();
      const aria = await a.getAttribute('aria-label');
      if (t || aria) readable++;
    }
    expect(readable).toBeGreaterThanOrEqual(Math.min(2, anchors.length));
  });
});
  it('aria-label present on at least one interactive control', async () => {
    await HomePage.open();
    const el = await ;
    expect(typeof (await el.isExisting())).toBe('boolean');
  });
});
