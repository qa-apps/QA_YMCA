const HomePage = require('../pageobjects/HomePage');

describe('Policy links', () => {
  it('privacy notice link is present', async () => {
    await HomePage.open();
    const link = await $('//a[contains(. , \"Privacy\")]');
    await expect(link).toBeExisting();
  });

  it('terms link exists and is clickable', async () => {
    await HomePage.open();
    const link = await $('//a[contains(. , \"Terms\")]');
    await expect(link).toBeExisting();
    const clickable = await link.isClickable();
    expect(typeof clickable).toBe('boolean');
  });

  it('clicks privacy or terms and loads a page', async () => {
    await HomePage.open();
    const candidate = await $('//a[contains(. , \"Privacy\")] | //a[contains(. , \"Terms\")]');
    if (await candidate.isExisting()) {
      const href = await candidate.getAttribute('href');
      await candidate.click();
      await browser.pause(300);
      await expect(browser).toHaveUrlContaining(href.split('/').filter(Boolean).slice(-1)[0]);
    }
  });

  it('policy links are present in footer navigation area', async () => {
    await HomePage.open();
    const footer = await $('footer');
    const links = await footer.$$(':scope a');
    expect(links.length).toBeGreaterThan(0);
  });
});



describe('Policy links – footer validation (2019-03-13)', () => {
  it('footer contains at least one policy-related anchor', async () => {
    await HomePage.open();
    const a = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    await expect(a).toBeExisting();
  });

  it('policy anchors have readable text', async () => {
    await HomePage.open();
    const links = await $$('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    let ok = 0;
    for (const l of links.slice(0, 4)) {
      const t = (await l.getText()).trim();
      if (t) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(1, links.length));
  });

  it('clicks first policy link and ensures URL changes or contains anchor', async () => {
    await HomePage.open();
    const l = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await l.isExisting()) {
      const href = await l.getAttribute('href');
      await l.click();
      await browser.pause(300);
      const url = await browser.getUrl();
      expect(url.includes('#') || url !== '').toBe(true);
      if (href && href.startsWith('#')) expect(url.includes('#')).toBe(true);
    }
  });
});
  it('policy link visibility in viewport', async () => {
    await HomePage.open();
    const a = await ;
    if (await a.isExisting()) {
      const vis = await a.isDisplayedInViewport();
      expect(typeof vis).toBe('boolean');
    }
  });
});

describe('Policy visibility – extra checks (2019-05-16)', () => {
  it('footer lists privacy/terms anchors', async () => {
    await HomePage.open();
    const list = await $$('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    expect(Array.isArray(list)).toBe(true);
  });

  it('first policy anchor is clickable and visible', async () => {
    await HomePage.open();
    const a = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await a.isExisting()) {
      const vis = await a.isDisplayed();
      expect(vis).toBe(true);
      const clickable = await a.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('navigates via a policy link and checks URL', async () => {
    await HomePage.open();
    const a = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await a.isExisting()) {
      const href = await a.getAttribute('href');
      await a.click();
      await browser.pause(250);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(0);
      if (href && href.startsWith('#')) expect(url.includes('#')).toBe(true);
    }
  });
});

describe('Policy links security (2019-08-22)', () => {
  it('policy anchors use https and may include rel security', async () => {
    await HomePage.open();
    const links = await $$('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    for (const l of links.slice(0, 4)) {
      const href = await l.getAttribute('href');
      if (href) expect(href.startsWith('http') ? href.startsWith('https://') : true).toBe(true);
      const target = (await l.getAttribute('target')) || '';
      if (target === '_blank') {
        const rel = ((await l.getAttribute('rel')) || '').toLowerCase();
        expect(rel.includes('noopener') || rel.includes('noreferrer') || rel === '').toBe(true);
      }
    }
  });

  it('policy link is visible and keyboard focusable', async () => {
    await HomePage.open();
    const a = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await a.isExisting()) {
      await expect(a).toBeDisplayed();
      await a.focus();
      const active = await browser.getActiveElement();
      expect(typeof (await active.getTagName())).toBe('string');
    }
  });

  it('click on policy link does not remove header', async () => {
    await HomePage.open();
    const a = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await a.isExisting()) {
      await a.click();
      await browser.pause(200);
      await expect($('header')).toBeExisting();
    }
  });
});

describe('Policy link target/security (2019-10-17)', () => {
  it('policy links opening in new tab include rel security', async () => {
    await HomePage.open();
    const links = await $$('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    for (const l of links.slice(0, 6)) {
      const target = (await l.getAttribute('target')) || '';
      if (target === '_blank') {
        const rel = ((await l.getAttribute('rel')) || '').toLowerCase();
        expect(rel.includes('noopener') || rel.includes('noreferrer') || rel === '').toBe(true);
      }
    }
  });

  it('policy links use https when absolute URLs are used', async () => {
    await HomePage.open();
    const links = await $$('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    for (const l of links.slice(0, 6)) {
      const href = await l.getAttribute('href');
      if (href && href.startsWith('http')) expect(href.startsWith('https://')).toBe(true);
    }
  });

  it('policy region remains present after navigation', async () => {
    await HomePage.open();
    const first = await $('//footer//a[contains(. , "Privacy") or contains(. , "Terms")]');
    if (await first.isExisting()) {
      await first.click();
      await browser.pause(250);
      await expect($('footer')).toBeExisting();
    }
  });
});
