class HomePage {
  /**
   * Open home page.
   * @returns {Promise<void>}
   */
  async open() {
    await browser.url('/');
  }

  /**
   * Get the top navigation container element.
   * @returns {Promise<WebdriverIO.Element>}
   */
  async topNav() {
    return $('header');
  }

  /**
   * Get a top-level nav button by its text (e.g., "Who We Are").
   * @param {string} label
   * @returns {Promise<WebdriverIO.Element>}
   */
  async navButton(label) {
    const selector = `//button[normalize-space()=\"${label}\"]`;
    return $(selector);
  }

  /**
   * Hover a navigation item to reveal its dropdown.
   * @param {string} label
   * @returns {Promise<void>}
   */
  async hoverNav(label) {
    const btn = await this.navButton(label);
    await btn.waitForExist({ timeout: 10000 });
    await btn.moveTo();
  }

  /**
   * Return a dropdown panel associated with a label.
   * @param {string} label
   * @returns {Promise<WebdriverIO.Element>}
   */
  async dropdownPanel(label) {
    const btn = await this.navButton(label);
    const id = await btn.getAttribute('aria-controls');
    if (id) {
      return $(`#${id}`);
    }
    return $('div[role=\"menu\"]');
  }
}

module.exports = new HomePage();


