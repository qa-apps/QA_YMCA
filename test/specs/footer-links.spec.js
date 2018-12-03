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


