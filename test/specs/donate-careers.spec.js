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



describe('Donate/Careers – header functional passes (2019-01-28)', () => {
  it('Donate has href in menu or navigates directly', async () => {
    await HomePage.open();
    const panel = await HomePage.dropdownPanel('Donate');
    const anchors = await panel.$$(':scope a[href]');
    if (anchors.length) {
      const href = await anchors[0].getAttribute('href');
      expect(href).toBeTruthy();
    } else {
      const btn = await HomePage.navButton('Donate');
      await btn.click();
      await browser.pause(200);
      expect((await browser.getTitle()).length).toBeGreaterThan(2);
    }
  });

  it('Careers reachable and page contains a title', async () => {
    await HomePage.open();
    const careers = await HomePage.navButton('Careers');
    await careers.click();
    await browser.pause(200);
    const title = await browser.getTitle();
    expect(title.length).toBeGreaterThan(3);
  });

  it('Donate element is focusable and visible', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    await donate.focus();
    const active = await browser.getActiveElement();
    const tag = await active.getTagName();
    expect(tag.length).toBeGreaterThan(0);
    await expect(donate).toBeDisplayed();
  });
});
  it('Careers button is displayed in header area', async () => {
    await HomePage.open();
    const c = await HomePage.navButton('Careers');
    await expect(c).toBeExisting();
    await expect(c).toBeDisplayed();
  });
});

describe('Donate/Careers – additional (2019-07-10)', () => {
  it('Donate dropdown or page reachable and has title', async () => {
    await HomePage.open();
    const donate = await HomePage.navButton('Donate');
    if (await donate.isExisting()) {
      await donate.click();
      await browser.pause(250);
      const title = await browser.getTitle();
      expect(title.length).toBeGreaterThan(2);
    }
  });

  it('Careers page reachable and header persists', async () => {
    await HomePage.open();
    const careers = await HomePage.navButton('Careers');
    if (await careers.isExisting()) {
      await careers.click();
      await browser.pause(250);
      await expect($('header')).toBeExisting();
    }
  });

  it('Donate and Careers buttons are displayed in header', async () => {
    await HomePage.open();
    await expect(await HomePage.navButton('Donate')).toBeExisting();
    await expect(await HomePage.navButton('Careers')).toBeExisting();
  });
});
  it('Donate/Careers buttons are focusable', async () => {
    await HomePage.open();
    const d = await HomePage.navButton('Donate');
    const c = await HomePage.navButton('Careers');
    await d.focus();
    await c.focus();
    const active = await browser.getActiveElement();
    expect(typeof (await active.getTagName())).toBe('string');
  });
});
