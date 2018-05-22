const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('Get Involved dropdown', () => {
  beforeEach(async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
  });

  it('lists actionable links like Become a Member and Volunteer', async () => {
    const links = await NavMenu.visibleDropdownLinks();
    const text = (await Promise.all(links.map(l => l.getText()))).map(t => t.trim());
    const checks = ['Become a Member', 'Volunteer', 'Work at the Y', 'Partner'];
    let found = 0;
    for (const c of checks) {
      if (text.some(t => t.includes(c))) found++;
    }
    expect(found).toBeGreaterThanOrEqual(2);
  });

  it('navigates to Become a Member or first available link', async () => {
    const member = await $('//a[contains(. , \"Become a Member\")]');
    if (await member.isExisting()) {
      await member.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      await links[0].click();
    }
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Y');
  });

  it('ensures there are at least three distinct links', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const link of links) {
      const t = (await link.getText()).trim();
      if (t) texts.push(t);
    }
    const unique = new Set(texts);
    expect(unique.size).toBeGreaterThanOrEqual(3);
  });

  it('opens Advocate or Drive Change page if present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const advocate = await $('//a[contains(. , \"Advocate\")]');
    const drive = await $('//a[contains(. , \"Drive Change\")]');
    if (await advocate.isExisting()) {
      await advocate.click();
    } else if (await drive.isExisting()) {
      await drive.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      await links[links.length - 1].click();
    }
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Y');
  });
});


