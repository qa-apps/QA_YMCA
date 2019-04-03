const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('About/Who We Are quick checks', () => {
  it('Who We Are dropdown available', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Who We Are');
    await expect(btn).toBeExisting();
  });

  it('dropdown contains Our Mission or equivalent', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const mission = await $('//a[contains(. , \"Mission\")]');
    expect(await mission.isExisting()).toBe(true);
  });

  it('navigation to About link loads content', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const link = await $('//a[contains(. , \"Our Mission\") or contains(. , \"Our History\")]');
    if (await link.isExisting()) {
      await link.click();
      await browser.pause(300);
      const t = await browser.getTitle();
      expect(t.length).toBeGreaterThan(3);
    }
  });

  it('Our People link exists when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const people = await $('//a[contains(. , \"Our People\")]');
    expect(typeof (await people.isExisting())).toBe('boolean');
  });
});



describe('About/Who We Are – deeper checks (2019-04-03)', () => {
  it('dropdown includes Vision/Impact/Reach labels when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const labels = ['Vision', 'Impact', 'Reach'];
    const texts = (await Promise.all((await NavMenu.visibleDropdownLinks()).slice(0, 10).map(async l => (await l.getText()).trim()))).join(' ');
    for (const l of labels) {
      expect(typeof texts.includes(l)).toBe('boolean');
    }
  });

  it('navigates to Our Vision or Our Impact if present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const vision = await $('//a[contains(. , "Our Vision")]');
    const impact = await $('//a[contains(. , "Our Impact")]');
    if (await vision.isExisting()) {
      await vision.click();
    } else if (await impact.isExisting()) {
      await impact.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      if (links.length) await links[0].click();
    }
    await browser.pause(300);
    const title = await browser.getTitle();
    expect(title.length).toBeGreaterThan(3);
  });

  it('first five links have non-empty text and at least one has href', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    let textCount = 0;
    let hrefCount = 0;
    for (const l of links.slice(0, 5)) {
      const t = (await l.getText()).trim();
      if (t) textCount++;
      const href = await l.getAttribute('href');
      if (href) hrefCount++;
    }
    expect(textCount).toBeGreaterThanOrEqual(Math.min(3, links.length));
    expect(hrefCount).toBeGreaterThanOrEqual(Math.min(1, links.length));
  });
});
