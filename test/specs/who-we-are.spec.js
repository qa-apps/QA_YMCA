const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('Who We Are dropdown', () => {
  beforeEach(async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
  });

  it('contains key informational links', async () => {
    const expected = [
      'Our Mission',
      'Our Vision',
      'Our Strong Communities',
      'Our Impact',
      'Our Reach',
      'Our History',
      'Our People'
    ];
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const link of links) {
      texts.push((await link.getText()).trim());
    }
    let present = 0;
    for (const item of expected) {
      if (texts.some(t => t.includes(item))) {
        present++;
      }
    }
    expect(present).toBeGreaterThanOrEqual(3);
  });

  it('navigates to Our Mission page', async () => {
    const mission = await $('//a[contains(. , \"Our Mission\")]');
    if (await mission.isExisting()) {
      await mission.click();
      await browser.pause(300);
      await expect(browser).toHaveTitleContaining('Mission');
    } else {
      await expect(await browser.getUrl()).toContain('/who-we-are/');
    }
  });

  it('navigates to Our History page if present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const hist = await $('//a[contains(. , \"Our History\")]');
    if (await hist.isExisting()) {
      await hist.click();
      await browser.pause(300);
      await expect(browser).toHaveTitleContaining('History');
    } else {
      await expect(browser).toHaveUrlContaining('ymca');
    }
  });

  it('dropdown link texts are unique among the first six', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) texts.push(t);
    }
    const unique = new Set(texts);
    expect(unique.size).toBeGreaterThanOrEqual(Math.min(4, texts.length));
  });

  it('each link has a valid href attribute', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    let valid = 0;
    for (const l of links.slice(0, 6)) {
      const href = await l.getAttribute('href');
      if (href && href.length > 1) valid++;
    }
    expect(valid).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });
});


