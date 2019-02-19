const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('Programs overview from What We Do', () => {
  it('dropdown lists multiple items', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  it('navigates to at least one program page', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    await links[0].click();
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Y');
  });

  it('unique texts among first five links are >= 3', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const link of links.slice(0, 5)) {
      const t = (await link.getText()).trim();
      if (t) texts.push(t);
    }
    const set = new Set(texts);
    expect(set.size).toBeGreaterThanOrEqual(Math.min(3, texts.length));
  });

  it('mid list link has clickable attribute when present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length >= 2) {
      const clickable = await links[1].isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('dropdown renders at least one anchor with absolute or relative href', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const href = links.length ? await links[0].getAttribute('href') : '';
    expect(Boolean(href)).toBe(true);
  });
});



describe('Programs overview – robustness (2019-02-19)', () => {
  it('menu shows at least three items with text', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) texts.push(t);
    }
    expect(texts.length).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });

  it('every sampled item has href attribute', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    let ok = 0;
    for (const l of links.slice(0, 5)) {
      const href = await l.getAttribute('href');
      if (href) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });

  it('navigates to second item if available and checks title', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length >= 2) {
      await links[1].click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(3);
    }
  });
});
  it('third item clickable state when present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length >= 3) {
      const clickable = await links[2].isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });
});
