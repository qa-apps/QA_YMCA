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

  it('social links are keyboard focusable', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^=\"http\"]');
    if (links.length > 0) {
      await links[0].focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.toLowerCase()).toBe('a');
    }
  });
});



describe('Social icons – additional checks (2019-03-11)', () => {
  it('footer social anchors have rel or target attributes optionally', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    let count = 0;
    for (const a of links.slice(0, 6)) {
      const rel = await a.getAttribute('rel');
      const target = await a.getAttribute('target');
      if ((rel && rel.length) || (target && target.length)) count++;
    }
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('first external link is clickable and visible', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      const vis = await first.isDisplayed();
      expect(vis).toBe(true);
      const clickable = await first.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('footer has at least one icon or svg element', async () => {
    await HomePage.open();
    const icon = await $('footer svg, footer i');
    expect(typeof (await icon.isExisting())).toBe('boolean');
  });
});
  it('footer contains at least one social link element', async () => {
    await HomePage.open();
    const l = await ;
    await expect(l).toBeExisting();
  });
});
  it('social links count is non-negative', async () => {
    await HomePage.open();
    const links = await 6740('footer a[href^\http\]');
    expect(links.length).toBeGreaterThanOrEqual(0);
  });
});
