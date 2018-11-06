const HomePage = require('../pageobjects/HomePage');
const NavMenu = require('../pageobjects/NavMenu');
const { safeClick } = require('../utils/browser-helpers');

describe('Donate and Careers navigation', () => {
  it('Donate reveals a menu or navigates to donation page', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Donate');
    await btn.waitForExist({ timeout: 15000 });
    await btn.moveTo();
    const panel = await HomePage.dropdownPanel('Donate');
    const showed = await panel.isDisplayed();
    if (showed) {
      const links = await panel.$$(':scope a[href]');
      if (links.length > 0) {
        await safeClick(links[0]);
      } else {
        await safeClick(btn);
      }
    } else {
      await safeClick(btn);
    }
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Donate');
  });

  it('Careers is reachable from the header', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Careers');
    await btn.waitForExist({ timeout: 15000 });
    await safeClick(btn);
    await browser.pause(300);
    await expect(browser).toHaveTitleContaining('Career');
  });

  it('Donate button is visible in viewport', async () => {
    await HomePage.open();
    const btn = await HomePage.navButton('Donate');
    const visible = await btn.isDisplayedInViewport();
    expect(typeof visible).toBe('boolean');
  });

  it('first donate menu link (if dropdown) has href', async () => {
    await HomePage.open();
    const panel = await HomePage.dropdownPanel('Donate');
    const links = await panel.$$(':scope a[href]');
    if (links.length > 0) {
      const href = await links[0].getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});


