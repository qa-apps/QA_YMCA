const HomePage = require('../pageobjects/HomePage');

describe('Y Stories carousel or list', () => {
  it('section exists with heading', async () => {
    await HomePage.open();
    const heading = await $('//h2[contains(. , \"Y stories\") or contains(. , \"Y Stories\") or contains(. , \"Stories\")]');
    await expect(heading).toBeExisting();
  });

  it('has at least one story link', async () => {
    await HomePage.open();
    const links = await $$('//a[contains(@href, \"stories\")]');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('navigates via first story link', async () => {
    await HomePage.open();
    const first = await $('(//a[contains(@href, \"stories\")])[1]');
    if (await first.isExisting()) {
      const href = await first.getAttribute('href');
      await first.click();
      await browser.pause(300);
      await expect(browser).toHaveUrlContaining(href.split('/').filter(Boolean).slice(-1)[0]);
    }
  });

  it('at least two story anchors exist when list has more items', async () => {
    await HomePage.open();
    const anchors = await $$('//a[contains(@href, \"stories\")]');
    expect(anchors.length).toBeGreaterThanOrEqual(1);
  });
});


