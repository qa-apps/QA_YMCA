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
});


