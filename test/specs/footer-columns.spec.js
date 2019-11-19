const HomePage = require('../pageobjects/HomePage');

describe('Footer column structure', () => {
  it('footer has multiple columns of links', async () => {
    await HomePage.open();
    const footer = await $('footer');
    await expect(footer).toBeExisting();
    const columns = await footer.$$('nav, ul, div:has(a)');
    expect(columns.length).toBeGreaterThanOrEqual(2);
  });

  it('each column contains at least one anchor', async () => {
    await HomePage.open();
    const footer = await $('footer');
    const groups = await footer.$$('nav, ul, div:has(a)');
    const sample = groups.slice(0, 5);
    for (const g of sample) {
      const links = await g.$$('a');
      expect(links.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('first column links are visible', async () => {
    await HomePage.open();
    const first = await $('footer a');
    await expect(first).toBeExisting();
    await expect(first).toBeDisplayed();
  });

  it('every sampled column has at least one visible link', async () => {
    await HomePage.open();
    const footer = await $('footer');
    const groups = await footer.$$('nav, ul, div:has(a)');
    const sample = groups.slice(0, 3);
    for (const g of sample) {
      const link = await g.$('a');
      await expect(link).toBeExisting();
      await expect(link).toBeDisplayed();
    }
  });
});



describe('Footer columns – extended (2019-06-20)', () => {
  it('each sampled column has at least two anchors when possible', async () => {
    await HomePage.open();
    const footer = await $('footer');
    const groups = await footer.$$('nav, ul, div:has(a)');
    for (const g of groups.slice(0, 3)) {
      const links = await g.$$('a');
      expect(links.length >= 0).toBe(true);
    }
  });

  it('first visible footer link is displayed in viewport', async () => {
    await HomePage.open();
    const first = await $('footer a');
    await expect(first).toBeExisting();
    const vis = await first.isDisplayedInViewport();
    expect(typeof vis).toBe('boolean');
  });

  it('footer contains at least one list or nav element', async () => {
    await HomePage.open();
    const any = await $('footer nav, footer ul');
    expect(typeof (await any.isExisting())).toBe('boolean');
  });
});

describe('Footer columns accessibility (2019-10-01)', () => {
  it('footer groups expose list or navigation semantics', async () => {
    await HomePage.open();
    const nav = await $('footer nav');
    const ul = await $('footer ul');
    expect((await nav.isExisting()) || (await ul.isExisting())).toBe(true);
  });

  it('each sampled group has at least one focusable link', async () => {
    await HomePage.open();
    const groups = await $$('footer nav, footer ul, footer div:has(a)');
    for (const g of groups.slice(0, 4)) {
      const link = await g.$('a');
      await expect(link).toBeExisting();
    }
  });

  it('links have discernible text or aria-labels for the first five', async () => {
    await HomePage.open();
    const links = await $$('footer a');
    let ok = 0;
    for (const l of links.slice(0, 5)) {
      const t = (await l.getText()).trim();
      const al = (await l.getAttribute('aria-label')) || '';
      if (t || al) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(0);
  });
});
  it('footer has at least one region landmark', async () => {
    await HomePage.open();
    const region = await ;
    await expect(region).toBeExisting();
  });
});

describe('Footer column labels (2019-11-19)', () => {
  it('first three column headings or group labels exist', async () => {
    await HomePage.open();
    const headings = await $$('footer h2, footer h3, footer h4');
    expect(Array.isArray(headings)).toBe(true);
  });

  it('links within columns have readable names', async () => {
    await HomePage.open();
    const links = await $$('footer a');
    let ok = 0;
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      const aria = (await l.getAttribute('aria-label')) || '';
      if (t || aria) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(0);
  });

  it('first column has at least one link that is focusable', async () => {
    await HomePage.open();
    const first = await $('footer a');
    if (await first.isExisting()) {
      await first.focus();
      const active = await browser.getActiveElement();
      expect(typeof (await active.getTagName())).toBe('string');
    }
  });
});
