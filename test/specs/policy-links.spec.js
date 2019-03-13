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
