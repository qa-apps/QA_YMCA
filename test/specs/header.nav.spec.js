const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');

describe('Header navigation', () => {
  it('renders the top navigation and reveals dropdowns on hover', async () => {
    await HomePage.open();
    const top = await HomePage.topNav();
    await expect(top).toBeExisting();

    const labels = [
      'Who We Are',
      'What We Do',
      'Get Involved',
      'Donate',
      'Careers'
    ];

    for (const label of labels) {
      await HomePage.hoverNav(label);
      const panel = await HomePage.dropdownPanel(label);
      await expect(panel).toBeDisplayed();
    }
  });

  it('lists links inside a dropdown when visible', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links.slice(0, 5)) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  it('each primary dropdown exposes at least three links', async () => {
    await HomePage.open();
    const labels = ['Who We Are', 'What We Do', 'Get Involved'];
    for (const label of labels) {
      await NavMenu.revealDropdown(label);
      const links = await NavMenu.visibleDropdownLinks();
      expect(links.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('navigates via the first link in a dropdown and loads a page', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('What We Do');
    const links = await NavMenu.visibleDropdownLinks();
    const first = links[0];
    const href = await first.getAttribute('href');
    await first.click();
    await browser.pause(300);
    await expect(browser).toHaveUrlContaining(href.split('/').filter(Boolean).slice(-1)[0]);
    await expect(browser).toHaveTitleContaining('Y');
  });

  it('Donate and Careers buttons exist and are clickable', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    const careers = await HomePage.navButton('Careers');
    await expect(donate).toBeExisting();
    await expect(careers).toBeExisting();
    await donate.moveTo();
    await careers.moveTo();
  });

  it('Who We Are dropdown has at least one link with href', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Who We Are');
    const links = await NavMenu.visibleDropdownLinks();
    expect(links.length).toBeGreaterThan(0);
    const href = await links[0].getAttribute('href');
    expect(href).toBeTruthy();
  });

  it('Get Involved dropdown links are not empty text', async () => {
    await HomePage.open();
    await NavMenu.revealDropdown('Get Involved');
    const links = await NavMenu.visibleDropdownLinks();
    let nonEmpty = 0;
    for (const l of links.slice(0, 6)) {
      const t = (await l.getText()).trim();
      if (t) nonEmpty++;
    }
    expect(nonEmpty).toBeGreaterThanOrEqual(Math.min(3, links.length));
  });
});


describe('Header nav deep checks (2019-01-07)', () => {
  it('top nav buttons expose controls or links', async () => {
    await HomePage.open();
    const labels = ['Who We Are', 'What We Do', 'Get Involved'];
    for (const label of labels) {
      const btn = await HomePage.navButton(label);
      await expect(btn).toBeExisting();
      const controls = await btn.getAttribute('aria-controls');
      const role = await btn.getAttribute('role');
      expect(Boolean(controls) || role === 'link').toBe(true);
    }
  });

  it('hover What We Do exposes at least two links', async () => {
    await HomePage.open();
    await HomePage.hoverNav('What We Do');
    const panel = await HomePage.dropdownPanel('What We Do');
    await expect(panel).toBeDisplayed();
    const links = await panel.$$(':scope a[href]');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('hover Get Involved exposes actionable links', async () => {
    await HomePage.open();
    await HomePage.hoverNav('Get Involved');
    const panel = await HomePage.dropdownPanel('Get Involved');
    await expect(panel).toBeDisplayed();
    const links = await panel.$$(':scope a[href]');
    let count = 0;
    for (const a of links.slice(0, 5)) {
      const t = (await a.getText()).trim();
      if (t) count++;
    }
    expect(count).toBeGreaterThanOrEqual(2);
  });

  it('Donate and Careers are reachable in header area', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    const careers = await HomePage.navButton('Careers');
    await expect(donate).toBeExisting();
    await expect(careers).toBeExisting();
  });
});
