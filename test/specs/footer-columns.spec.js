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


