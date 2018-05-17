const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('What We Do dropdown', () => {
  before(async () => {
    await HomePage.open();
  });

  it('shows dropdown and lists multiple program areas', async () => {
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    expect(links.length).toBeGreaterThanOrEqual(3);
    const sampleTexts = [];
    for (const link of links.slice(0, 8)) {
      sampleTexts.push((await link.getText()).trim());
    }
    expect(sampleTexts.join(' ')).toMatch(/Youth|Healthy|Social/i);
  });

  it('attempts to visit Youth Development or fallback to first available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const youth = await $('//a[contains(. , \"Youth Development\")]');
    if (await youth.isExisting()) {
      await youth.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      await links[0].click();
    }
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Y');
  });

  it('navigates to Healthy Living or Social Responsibility if visible', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const healthy = await $('//a[contains(. , \"Healthy Living\")]');
    const social = await $('//a[contains(. , \"Social Responsibility\")]');
    if (await healthy.isExisting()) {
      await healthy.click();
    } else if (await social.isExisting()) {
      await social.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      await links[Math.min(1, links.length - 1)].click();
    }
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Y');
  });

  it('ensures at least five links are unique by text when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const link of links) {
      const t = (await link.getText()).trim();
      if (t) texts.push(t);
    }
    const set = new Set(texts);
    expect(set.size).toBeGreaterThanOrEqual(Math.min(5, texts.length));
  });
});


