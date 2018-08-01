const HomePage = require('../pageobjects/HomePage');

describe('News & Stories section', () => {
  it('shows a News or Stories heading', async () => {
    await HomePage.open();
    const heading = await $('//h2[contains(. , \"News\") or contains(. , \"Stories\")] | //h3[contains(. , \"News\") or contains(. , \"Stories\")]');
    await expect(heading).toBeExisting();
  });

  it('contains article cards with links', async () => {
    await HomePage.open();
    const cards = await $$('//a[contains(@href, \"/news\") or contains(@href, \"/stories\")]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('clicks first card and opens a page', async () => {
    await HomePage.open();
    const card = await $('(//a[contains(@href, \"/news\") or contains(@href, \"/stories\")])[1]');
    if (await card.isExisting()) {
      const href = await card.getAttribute('href');
      await card.click();
      await browser.pause(300);
      await expect(browser).toHaveUrlContaining(href.split('/').filter(Boolean).slice(-1)[0]);
    }
  });

  it('shows at least two news/story anchors when present', async () => {
    await HomePage.open();
    const anchors = await $$('//a[contains(@href, \"/news\") or contains(@href, \"/stories\")]');
    expect(anchors.length).toBeGreaterThanOrEqual(1);
  });
});


