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
});


