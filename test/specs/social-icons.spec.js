const HomePage = require('../pageobjects/HomePage');

describe('Social media icons', () => {
  it('footer contains social links', async () => {
    await HomePage.open();
    const footer = await $('footer');
    await expect(footer).toBeExisting();
    const links = await footer.$$('[href*=\"facebook\" i], [href*=\"instagram\" i], [href*=\"tiktok\" i], [href*=\"youtube\" i]');
    expect(links.length).toBeGreaterThan(0);
  });

  it('each social link has an href and is visible', async () => {
    await HomePage.open();
    const links = await $$('footer a[href*=\"http\"]');
    const sample = links.slice(0, 6);
    for (const a of sample) {
      const href = await a.getAttribute('href');
      const displayed = await a.isDisplayed();
      expect(Boolean(href)).toBe(true);
      expect(displayed).toBe(true);
    }
  });

  it('at least one link points off-site (starts with http)', async () => {
    await HomePage.open();
    const offsite = await $$('footer a[href^=\"http\"]');
    expect(offsite.length).toBeGreaterThan(0);
  });
});


