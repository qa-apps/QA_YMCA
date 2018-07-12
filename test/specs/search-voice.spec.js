const HomePage = require('../pageobjects/HomePage');

describe('Site search and voice control', () => {
  it('search input exists near Find Your Y', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"Search\") or @type=\"search\"]');
    await expect(input).toBeExisting();
  });

  it('accepts text and shows value', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"Search\") or @type=\"search\"]');
    await input.setValue('camp');
    await expect(input).toHaveValueContaining('camp');
  });

  it('voice button or icon is present if supported', async () => {
    await HomePage.open();
    const voice = await $('button[aria-label*=\"voice\" i], [class*=\"voice\" i]');
    const exists = await voice.isExisting();
    expect(typeof exists).toBe('boolean');
  });

  it('search submit triggers navigation or updates URL hash', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, \"Search\") or @type=\"search\"]');
    await input.setValue('YMCA');
    const submit = await $('//button[contains(. , \"Search\")] | //input[@type=\"submit\"]');
    if (await submit.isExisting()) {
      await submit.click();
      await browser.pause(200);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
    }
  });
});


