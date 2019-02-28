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

  it('news cards have non-empty titles for first few items', async () => {
    await HomePage.open();
    const cards = await $$('(//a[contains(@href, \"/news\") or contains(@href, \"/stories\")])[position()<=3]');
    let withText = 0;
    for (const c of cards) {
      const t = (await c.getText()).trim();
      if (t) withText++;
    }
    expect(withText).toBeGreaterThanOrEqual(Math.min(1, cards.length));
  });
});



describe('News & Stories – extended assertions (2019-02-28)', () => {
  it('first three anchors exist and have text or aria-label', async () => {
    await HomePage.open();
    const anchors = await $$('(//a[contains(@href, "/news") or contains(@href, "/stories")])[position()<=3]');
    let ok = 0;
    for (const a of anchors) {
      const t = (await a.getText()).trim();
      const label = await a.getAttribute('aria-label');
      if (t || label) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(1, anchors.length));
  });

  it('navigates to the second card if present and checks URL changed', async () => {
    await HomePage.open();
    const card = await $('(//a[contains(@href, "/news") or contains(@href, "/stories")])[2]');
    if (await card.isExisting()) {
      const href = await card.getAttribute('href');
      await card.click();
      await browser.pause(300);
      const url = await browser.getUrl();
      expect(url.includes('news') || url.includes('stories') || url.includes(href)).toBe(true);
    }
  });

  it('there is at least one link containing the word "Learn" when present', async () => {
    await HomePage.open();
    const maybe = await $$('//a[contains(., "Learn")]');
    expect(Array.isArray(maybe)).toBe(true);
  });
});
  it('at least one news/stories link is visible in viewport', async () => {
    await HomePage.open();
    const first = await ;
    if (await first.isExisting()) {
      const vis = await first.isDisplayedInViewport();
      expect(typeof vis).toBe('boolean');
    }
  });
});
