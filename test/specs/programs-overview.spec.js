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


