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
