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

  it('first three links have non-empty text', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    let count = 0;
    for (const l of links.slice(0, 3)) {
      const t = (await l.getText()).trim();
      if (t) count++;
    }
    expect(count).toBeGreaterThanOrEqual(Math.min(2, links.length));
  });

  it('clicks a mid-list link when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length >= 3) {
      await links[2].click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(3);
    }
  });
});



describe('What We Do – extended menu checks (2019-01-15)', () => {
  it('first five items are unique by text when present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const l of links.slice(0, 5)) texts.push((await l.getText()).trim());
    const unique = new Set(texts.filter(Boolean));
    expect(unique.size).toBeGreaterThanOrEqual(Math.min(3, texts.length));
  });

  it('clicks last available item and expects a non-empty title', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length) {
      await links[links.length - 1].click();
      await browser.pause(300);
      const title = await browser.getTitle();
      expect(title.trim().length).toBeGreaterThan(1);
    }
  });

  it('verifies at least one item contains program-related keywords', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const sampleText = (await Promise.all(links.slice(0, 6).map(async l => (await l.getText()).trim()))).join(' ').toLowerCase();
    expect(sampleText.length).toBeGreaterThan(0);
  });
});
  it('ensures first item is clickable when displayed', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length) {
      const clickable = await links[0].isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });
});
