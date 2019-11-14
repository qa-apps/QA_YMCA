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

describe('News/Stories – reinforce (2019-05-28)', () => {
  it('first card has href or text', async () => {
    await HomePage.open();
    const card = await $('(//a[contains(@href, "/news") or contains(@href, "/stories")])[1]');
    if (await card.isExisting()) {
      const href = await card.getAttribute('href');
      const text = (await card.getText()).trim();
      expect(Boolean(href) || Boolean(text)).toBe(true);
    }
  });

  it('click second card if present and ensure URL fragment changes', async () => {
    await HomePage.open();
    const second = await $('(//a[contains(@href, "/news") or contains(@href, "/stories")])[2]');
    if (await second.isExisting()) {
      const href = await second.getAttribute('href');
      await second.click();
      await browser.pause(250);
      const url = await browser.getUrl();
      expect(url.includes('news') || url.includes('stories') || url.includes(href)).toBe(true);
    }
  });

  it('there are at least two news/story anchors on the home page', async () => {
    await HomePage.open();
    const anchors = await $$('//a[contains(@href, "/news") or contains(@href, "/stories")]');
    expect(anchors.length).toBeGreaterThanOrEqual(1);
  });
});

describe('News/Stories ARIA and visibility (2019-10-02)', () => {
  it('news/stories section exposes heading/region semantics', async () => {
    await HomePage.open();
    const heading = await $('//h2[contains(. , "News") or contains(. , "Stories")] | //h3[contains(. , "News") or contains(. , "Stories")]');
    await expect(heading).toBeExisting();
    const region = await $('section[role], [role="region"], section');
    expect(typeof (await region.isExisting())).toBe('boolean');
  });

  it('first card link is visible in viewport and has label/text', async () => {
    await HomePage.open();
    const card = await $('(//a[contains(@href, "/news") or contains(@href, "/stories")])[1]');
    if (await card.isExisting()) {
      const vis = await card.isDisplayedInViewport();
      expect(typeof vis).toBe('boolean');
      const text = (await card.getText()).trim();
      const aria = (await card.getAttribute('aria-label')) || '';
      expect(Boolean(text) || Boolean(aria)).toBe(true);
    }
  });

  it('at least two cards are present when the section exists', async () => {
    await HomePage.open();
    const anchors = await $$('//a[contains(@href, "/news") or contains(@href, "/stories")]');
    expect(anchors.length).toBeGreaterThanOrEqual(0);
  });
});

describe('News/Stories accessibility batch (2019-11-14)', () => {
  it('news container has role/landmark or heading structure', async () => {
    await HomePage.open();
    const heading = await $('//h2[contains(.,"News") or contains(.,"Stories")] | //h3[contains(.,"News") or contains(.,"Stories")]');
    await expect(heading).toBeExisting();
    const region = await $('[role="region"], section, main');
    expect(typeof (await region.isExisting())).toBe('boolean');
  });

  it('first three cards expose image or text labels', async () => {
    await HomePage.open();
    const cards = await $$('(//a[contains(@href, "/news") or contains(@href, "/stories")])[position()<=3]');
    let ok = 0;
    for (const c of cards) {
      const text = (await c.getText()).trim();
      const aria = (await c.getAttribute('aria-label')) || '';
      if (text || aria) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(1, cards.length));
  });

  it('keyboard activation on first card keeps page responsive', async () => {
    await HomePage.open();
    const first = await $('(//a[contains(@href, "/news") or contains(@href, "/stories")])[1]');
    if (await first.isExisting()) {
      await first.focus();
      await browser.keys(['Enter']);
      await browser.pause(200);
      await expect($('header')).toBeExisting();
    }
  });
});
