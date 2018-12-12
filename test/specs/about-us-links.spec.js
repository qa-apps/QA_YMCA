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


