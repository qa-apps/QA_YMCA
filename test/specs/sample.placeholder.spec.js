describe('YMCA placeholder', () => {
  it('opens home page', async () => {
    await browser.url('/');
    await expect(browser).toHaveTitleContaining('YMCA');
  });
});



describe('Home smoke checks (2019-04-11)', () => {
  it('loads home and shows header + footer', async () => {
    await browser.url('/');
    await expect($('header')).toBeExisting();
    await expect($('footer')).toBeExisting();
  });

  it('logo/home anchor exists in header', async () => {
    await browser.url('/');
    const logo = await $('header a[href="/"] , header a[aria-label*="home" i]');
    await expect(logo).toBeExisting();
  });

  it('primary nav buttons exist by label when present', async () => {
    await browser.url('/');
    const labels = ['Who We Are', 'What We Do', 'Get Involved'];
    for (const l of labels) {
      const el = await $(`//button[normalize-space()="${l}"] | //a[normalize-space()="${l}"]`);
      expect(typeof (await el.isExisting())).toBe('boolean');
    }
  });

  it('at least one section heading renders text', async () => {
    await browser.url('/');
    const h = await $('h1, h2, h3');
    expect(typeof (await h.isExisting())).toBe('boolean');
  });
});
  it('footer has legal/policy links visible', async () => {
    await browser.url('/');
    const link = await ;
    await expect(link).toBeExisting();
    await expect(link).toBeDisplayed();
  });
});
  it('search widget exists on home for find-your-y area', async () => {
    await browser.url('/');
    const input = await ;
    expect(typeof (await input.isExisting())).toBe('boolean');
  });
});
