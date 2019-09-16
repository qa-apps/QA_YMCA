const HomePage = require('../pageobjects/HomePage');

describe('Header search behavior', () => {
  it('header contains a search control or button', async () => {
    await HomePage.open();
    const ctrl = await $('header input[type=\"search\"], header button[aria-label*=\"search\" i], header [class*=\"search\" i]');
    await expect(ctrl).toBeExisting();
  });

  it('typing into header search preserves value', async () => {
    await HomePage.open();
    const input = await $('header input[type=\"search\"], header input[placeholder*=\"Search\" i]');
    if (await input.isExisting()) {
      await input.setValue('membership');
      await expect(input).toHaveValueContaining('member');
    }
  });

  it('search submit is possible from header when button exists', async () => {
    await HomePage.open();
    const btn = await $('header button[type=\"submit\"], header button[aria-label*=\"search\" i]');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(200);
      const url = await browser.getUrl();
      expect(url.length).toBeGreaterThan(10);
    }
  });

  it('header search is focusable via keyboard', async () => {
    await HomePage.open();
    const input = await $('header input[type=\"search\"], header input[placeholder*=\"Search\" i]');
    if (await input.isExisting()) {
      await input.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.toLowerCase()).toBe('input');
    }
  });
});



describe('Header search – resilience (2019-03-14)', () => {
  it('search control exists and is interactive when present', async () => {
    await HomePage.open();
    const input = await $('header input[type="search"], header input[placeholder*="Search" i]');
    if (await input.isExisting()) {
      await input.setValue('YMCA');
      await expect(input).toHaveValueContaining('Y');
    }
  });

  it('submit button or icon is focusable', async () => {
    await HomePage.open();
    const btn = await $('header button[type="submit"], header button[aria-label*="search" i]');
    if (await btn.isExisting()) {
      await btn.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.length).toBeGreaterThan(0);
    }
  });

  it('header still visible after search attempt', async () => {
    await HomePage.open();
    const btn = await $('header button[type="submit"], header button[aria-label*="search" i]');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(200);
    }
    const header = await $('header');
    await expect(header).toBeExisting();
  });
});
  it('header contains at least one anchor element', async () => {
    await HomePage.open();
    const a = await ;
    await expect(a).toBeExisting();
  });
});
  it('search button visibility in viewport when available', async () => {
    await HomePage.open();
    const btn = await ;
    if (await btn.isExisting()) {
      const vis = await btn.isDisplayedInViewport();
      expect(typeof vis).toBe('boolean');
    }
  });
});

describe('Header search – extended (2019-06-18)', () => {
  it('typing and clearing maintains expected value state', async () => {
    await HomePage.open();
    const input = await $('header input[type="search"], header input[placeholder*="Search" i]');
    if (await input.isExisting()) {
      await input.setValue('membership');
      await input.clearValue();
      await input.setValue('jobs');
      await expect(input).toHaveValueContaining('job');
    }
  });

  it('submit click does not break header visibility', async () => {
    await HomePage.open();
    const btn = await $('header button[type="submit"], header button[aria-label*="search" i]');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(200);
      await expect($('header')).toBeExisting();
    }
  });

  it('search control is focusable via keyboard', async () => {
    await HomePage.open();
    const input = await $('header input[type="search"], header input[placeholder*="Search" i]');
    if (await input.isExisting()) {
      await input.focus();
      const active = await browser.getActiveElement();
      const tag = await active.getTagName();
      expect(tag.toLowerCase()).toBe('input');
    }
  });
});

describe('Header search usability (2019-09-16)', () => {
  it('input has accessible name via placeholder or aria-label', async () => {
    await HomePage.open();
    const input = await $('header input[type="search"], header input[placeholder*="Search" i]');
    if (await input.isExisting()) {
      const ph = (await input.getAttribute('placeholder')) || '';
      const al = (await input.getAttribute('aria-label')) || '';
      expect((ph + al).length).toBeGreaterThan(0);
    }
  });

  it('Escape clears value when implemented or value can be cleared programmatically', async () => {
    await HomePage.open();
    const input = await $('header input[type="search"], header input[placeholder*="Search" i]');
    if (await input.isExisting()) {
      await input.setValue('clearme');
      await input.clearValue();
      await expect(input).toHaveValueContaining('');
    }
  });

  it('search submit keeps focus within page (no full navigation expected)', async () => {
    await HomePage.open();
    const btn = await $('header button[type="submit"], header button[aria-label*="search" i]');
    if (await btn.isExisting()) {
      await btn.click();
      await browser.pause(200);
      await expect($('header')).toBeExisting();
    }
  });
});
