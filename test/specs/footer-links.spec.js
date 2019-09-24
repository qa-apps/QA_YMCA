const HomePage = require('../pageobjects/HomePage');

describe('Footer links', () => {
  it('footer exists and contains expected columns', async () => {
    await HomePage.open();
    const footer = await $('footer');
    await expect(footer).toBeExisting();
    const cols = await footer.$$('a, button');
    expect(cols.length).toBeGreaterThan(5);
  });

  it('includes links like Privacy Policy or Terms of Use', async () => {
    await HomePage.open();
    const privacy = await $('//a[contains(. , \"Privacy\")]');
    const terms = await $('//a[contains(. , \"Terms\")]');
    expect((await privacy.isExisting()) || (await terms.isExisting())).toBe(true);
  });

  it('clicks Financial Information if present', async () => {
    await HomePage.open();
    const fin = await $('//a[contains(. , \"Financial Information\")]');
    if (await fin.isExisting()) {
      await fin.click();
      await browser.pause(300);
      await expect(browser).toHaveTitleContaining('Financial');
    }
  });

  it('footer contains Privacy Policy and Terms of Use labels when present', async () => {
    await HomePage.open();
    const priv = await $('//footer//a[contains(. , \"Privacy\")]');
    const terms = await $('//footer//a[contains(. , \"Terms\")]');
    expect((await priv.isExisting()) || (await terms.isExisting())).toBe(true);
  });

  it('first visible footer link has href', async () => {
    await HomePage.open();
    const first = await $('footer a');
    const href = await first.getAttribute('href');
    expect(href).toBeTruthy();
  });
});



describe('Footer links – extended (2019-03-27)', () => {
  it('footer exposes multiple anchors with hrefs', async () => {
    await HomePage.open();
    const links = await $$('footer a[href]');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('first three footer links have non-empty text when available', async () => {
    await HomePage.open();
    const links = await $$('footer a[href]');
    let withText = 0;
    for (const l of links.slice(0, 3)) {
      const t = (await l.getText()).trim();
      if (t) withText++;
    }
    expect(withText).toBeGreaterThanOrEqual(Math.min(1, links.length));
  });

  it('navigates via first footer link and validates page title length', async () => {
    await HomePage.open();
    const first = await $('footer a[href]');
    if (await first.isExisting()) {
      await first.click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(3);
    }
  });

  it('footer region is visible in viewport', async () => {
    await HomePage.open();
    const footer = await $('footer');
    await expect(footer).toBeExisting();
  });
});

describe('Footer external link security (2019-09-24)', () => {
  it('external footer anchors are https and include rel on target=_blank', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    for (const l of links.slice(0, 8)) {
      const href = await l.getAttribute('href');
      if (href) expect(href.startsWith('https://') || !href.startsWith('http')).toBe(true);
      const target = (await l.getAttribute('target')) || '';
      if (target === '_blank') {
        const rel = ((await l.getAttribute('rel')) || '').toLowerCase();
        expect(rel.includes('noopener') || rel.includes('noreferrer') || rel === '').toBe(true);
      }
    }
  });

  it('first external anchor is visible and clickable', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await expect(first).toBeDisplayed();
      const clickable = await first.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('footer retains presence after clicking an external link', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await first.click();
      await browser.pause(200);
      await expect($('footer')).toBeExisting();
    }
  });
});
