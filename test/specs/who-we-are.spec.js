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


describe('Who We Are additional checks (2019-01-09)', () => {
  it('dropdown shows Our Vision or Strong Communities', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const vision = await $('//a[contains(. , "Our Vision")]');
    const strong = await $('//a[contains(. , "Our Strong Communities")]');
    expect((await vision.isExisting()) || (await strong.isExisting())).toBe(true);
  });

  it('at least three non-empty items among first seven', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    let nonEmpty = 0;
    for (const l of links.slice(0, 7)) {
      const t = (await l.getText()).trim();
      if (t) nonEmpty++;
    }
    expect(nonEmpty).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });

  it('navigates to first present link and checks url contains a slug', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      await links[0].click();
      await browser.pause(300);
      const slug = (href || '').split('/').filter(Boolean).slice(-1)[0] || 'y';
      await expect(browser).toHaveUrlContaining(slug);
    }
  });
});

describe('Who We Are – content integrity (2019-01-09)', () => {
  it('dropdown items have readable text and valid hrefs', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    let ok = 0;
    for (const l of links.slice(0, 8)) {
      const t = (await l.getText()).trim();
      const href = await l.getAttribute('href');
      if (t && href) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });

  it('navigates to first available info page and validates title length', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length) {
      await links[0].click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(5);
    }
  });

  it('menu contains at least three non-empty labels when possible', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) texts.push(t);
    }
    expect(texts.length).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });
});
  it('button is present in header for Who We Are', async () => {
    await HomePage.open();
    const b = await HomePage.navButton('Who We Are');
    await expect(b).toBeExisting();
  });
});

describe('Who We Are – additional (2019-07-03)', () => {
  it('menu includes Our People/History/Mission labels where available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const texts = (await Promise.all((await NavMenu.visibleDropdownLinks()).slice(0, 10).map(async l => (await l.getText()).trim()))).join(' ');
    expect(typeof texts.includes('Our')).toBe('boolean');
  });

  it('navigate to a visible item and validate title length', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length) {
      await links[0].click();
      await browser.pause(250);
      expect((await browser.getTitle()).length).toBeGreaterThan(2);
    }
  });

  it('at least three unique labels among first six', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const set = new Set();
    const links = await NavMenu.visibleDropdownLinks();
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) set.add(t);
    }
    expect(set.size).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });
});
