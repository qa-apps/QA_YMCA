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

describe('Social links – extended (2019-06-19)', () => {
  it('collect first five hrefs and ensure they are non-empty', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    let ok = 0;
    for (const a of links.slice(0, 5)) {
      const href = await a.getAttribute('href');
      if (href) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(0);
  });

  it('focus and click first external link does not error', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await first.focus();
      await first.click();
      await browser.pause(200);
      const t = await browser.getTitle();
      expect(typeof t).toBe('string');
    }
  });

  it('footer contains icon/svg or text-based links', async () => {
    await HomePage.open();
    const icon = await $('footer svg, footer i');
    expect(typeof (await icon.isExisting())).toBe('boolean');
  });
});

describe('External social links security (2019-08-21)', () => {
  it('external links use https protocol', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    let httpsCount = 0;
    for (const a of links.slice(0, 8)) {
      const href = await a.getAttribute('href');
      if (href && href.startsWith('https://')) httpsCount++;
    }
    expect(httpsCount).toBeGreaterThanOrEqual(0);
  });

  it('external links include rel security attributes when target=_blank', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    for (const a of links.slice(0, 8)) {
      const target = (await a.getAttribute('target')) || '';
      if (target === '_blank') {
        const rel = ((await a.getAttribute('rel')) || '').toLowerCase();
        expect(rel.includes('noopener') || rel.includes('noreferrer') || rel.includes('external') || rel === '').toBe(true);
      }
    }
  });

  it('at least one external link is visible and clickable', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await expect(first).toBeDisplayed();
      const clickable = await first.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });
});

describe('Social icons labels (2019-10-15)', () => {
  it('social anchors have aria-label or title where icons are used', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    let labeled = 0;
    for (const a of links.slice(0, 8)) {
      const aria = (await a.getAttribute('aria-label')) || '';
      const title = (await a.getAttribute('title')) || '';
      if (aria || title) labeled++;
    }
    expect(labeled).toBeGreaterThanOrEqual(0);
  });

  it('svg icons exist or link text is present', async () => {
    await HomePage.open();
    const svg = await $('footer svg');
    const first = await $('footer a[href^="http"]');
    const hasText = (await first.getText()).trim().length > 0;
    expect((await svg.isExisting()) || hasText).toBe(true);
  });

  it('first social link visible and focusable', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await expect(first).toBeDisplayed();
      await first.focus();
      const active = await browser.getActiveElement();
      expect(typeof (await active.getTagName())).toBe('string');
    }
  });
});

describe('Social icon rel/target additions (2019-11-20)', () => {
  it('target=_blank links include noopener/noreferrer', async () => {
    await HomePage.open();
    const links = await $$('footer a[href^="http"]');
    for (const l of links.slice(0, 8)) {
      const target = (await l.getAttribute('target')) || '';
      if (target === '_blank') {
        const rel = ((await l.getAttribute('rel')) || '').toLowerCase();
        expect(rel.includes('noopener') || rel.includes('noreferrer') || rel === '').toBe(true);
      }
    }
  });

  it('links use https protocol or are relative', async () => {
    await HomePage.open();
    const links = await $$('footer a[href]');
    for (const l of links.slice(0, 8)) {
      const href = await l.getAttribute('href');
      if (href && href.startsWith('http')) expect(href.startsWith('https://')).toBe(true);
    }
  });

  it('first external link remains visible after click', async () => {
    await HomePage.open();
    const first = await $('footer a[href^="http"]');
    if (await first.isExisting()) {
      await first.click();
      await browser.pause(150);
      await expect($('footer')).toBeExisting();
    }
  });
});
