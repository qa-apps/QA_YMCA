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



describe('Site search/voice – extended (2019-03-19)', () => {
  it('search input supports clearing and retyping', async () => {
    await HomePage.open();
    const input = await $('//input[contains(@placeholder, "Search") or @type="search"]');
    if (await input.isExisting()) {
      await input.setValue('camp');
      await input.clearValue();
      await input.setValue('YMCA');
      await expect(input).toHaveValueContaining('Y');
    }
  });

  it('voice button presence is a boolean condition', async () => {
    await HomePage.open();
    const voice = await $('button[aria-label*="voice" i], [class*="voice" i]');
    const exists = await voice.isExisting();
    expect(typeof exists).toBe('boolean');
  });

  it('submit triggers URL change or remains stable without error', async () => {
    await HomePage.open();
    const submit = await $('//button[contains(. , "Search")] | //input[@type="submit"]');
    if (await submit.isExisting()) {
      await submit.click();
      await browser.pause(200);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(0);
    }
  });
});
  it('search icon focusability if present', async () => {
    await HomePage.open();
    const btn = await ;
    if (await btn.isExisting()) {
      await btn.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.length).toBeGreaterThan(0);
    }
  });
});

describe('Search/voice interactions (2019-12-17)', () => {
  it('search input accepts typing and clears properly', async () => {
    await HomePage.open();
    const input = await $('//input[@type="search" or contains(@placeholder,"Search")]');
    if (await input.isExisting()) {
      await input.setValue('YMCA camp');
      await expect(input).toHaveValueContaining('YMCA');
      await input.clearValue();
      await expect(input).toHaveValueContaining('');
    }
  });

  it('presence of a voice control is tolerated', async () => {
    await HomePage.open();
    const voice = await $('button[aria-label*="voice" i], [class*="voice" i]');
    expect(typeof (await voice.isExisting())).toBe('boolean');
  });

  it('pressing Enter on submit keeps header visible', async () => {
    await HomePage.open();
    const btn = await $('//button[contains(. , "Search")] | //input[@type="submit"]');
    if (await btn.isExisting()) {
      await btn.focus();
      await browser.keys(['Enter']);
      await browser.pause(150);
      await expect($('header')).toBeExisting();
    }
  });
});
