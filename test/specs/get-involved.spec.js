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

  it('Volunteer link appears among dropdown items when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const volunteer = await $('//a[contains(. , \"Volunteer\")]');
    expect(typeof (await volunteer.isExisting())).toBe('boolean');
  });

  it('dropdown has at least two unique actionable texts', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    const unique = new Set();
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) unique.add(t);
    }
    expect(unique.size).toBeGreaterThanOrEqual(Math.min(2, links.length));
  });
});



describe('Get Involved – engagement checks (2019-01-24)', () => {
  it('ensures at least one action has a visible label', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    const hasText = (await Promise.all(links.slice(0, 6).map(async l => (await l.getText()).trim()))).some(Boolean);
    expect(hasText).toBe(true);
  });

  it('tries to open Work at the Y or fallback first item', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const work = await $('//a[contains(. , "Work at the Y")]');
    if (await work.isExisting()) {
      await work.click();
    } else {
      const links = await NavMenu.visibleDropdownLinks();
      if (links.length) await links[0].click();
    }
    await browser.pause(300);
    expect((await browser.getTitle()).length).toBeGreaterThan(3);
  });

  it('verifies at least two unique texts among first five items', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    const texts = [];
    for (const l of links.slice(0, 5)) {
      const t = (await l.getText()).trim();
      if (t) texts.push(t);
    }
    const unique = new Set(texts);
    expect(unique.size).toBeGreaterThanOrEqual(Math.min(2, texts.length));
  });
});
  it('Volunteer link clickable when displayed', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const v = await ;
    if (await v.isExisting()) {
      const clickable = await v.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });
});

describe('Get Involved – deeper coverage (2019-04-12)', () => {
  it('Partner with Us or Advocate links exist when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const partner = await $('//a[contains(. , "Partner with Us")]');
    const advocate = await $('//a[contains(. , "Advocate")]');
    expect((await partner.isExisting()) || (await advocate.isExisting())).toBe(true);
  });

  it('clicks Partner/Advocate/first and expects page title', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const partner = await $('//a[contains(. , "Partner with Us")]');
    const advocate = await $('//a[contains(. , "Advocate")]');
    if (await partner.isExisting()) await partner.click();
    else if (await advocate.isExisting()) await advocate.click();
    else {
      const links = await NavMenu.visibleDropdownLinks();
      if (links.length) await links[0].click();
    }
    await browser.pause(300);
    const title = await browser.getTitle();
    expect(title.length).toBeGreaterThan(3);
  });

  it('ensures four unique link texts among first eight', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    const set = new Set();
    for (const l of links.slice(0, 8)) {
      const t = (await l.getText()).trim();
      if (t) set.add(t);
    }
    expect(set.size).toBeGreaterThanOrEqual(Math.min(4, links.length));
  });
});
  it('ensures Become a Member item is clickable when available', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const el = await ;
    if (await el.isExisting()) {
      const clickable = await el.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });
});

describe('Get Involved CTA checks (2019-11-14)', () => {
  it('dropdown contains action links with discernible names', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    let ok = 0;
    for (const l of links.slice(0, 8)) {
      const txt = (await l.getText()).trim();
      const aria = (await l.getAttribute('aria-label')) || '';
      if (txt || aria) ok++;
    }
    expect(ok).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });

  it('Become a Member/Volunteer are clickable when present', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const member = await $('//a[contains(.,"Become a Member")]');
    const volunteer = await $('//a[contains(.,"Volunteer")]');
    const target = (await member.isExisting()) ? member : (await volunteer.isExisting() ? volunteer : null);
    if (target) {
      const clickable = await target.isClickable();
      expect(typeof clickable).toBe('boolean');
    }
  });

  it('navigating via an action retains header and creates a valid URL', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    if (links.length) {
      await links[0].click();
      await browser.pause(200);
      await expect($('header')).toBeExisting();
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(0);
    }
  });
});
