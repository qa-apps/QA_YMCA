describe('YMCA placeholder', () => {
  it('opens home page', async () => {
    await browser.url('/');
    await expect(browser).toHaveTitleContaining('YMCA');
  });
});


