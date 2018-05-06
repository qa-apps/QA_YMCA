class NavMenu {
  /**
   * Return a locator for a given top nav label.
   * @param {string} label
   * @returns {Promise<WebdriverIO.Element>}
   */
  async item(label) {
    const selector = `//button[normalize-space()=\"${label}\"]`;
    return $(selector);
  }

  /**
   * Ensure a dropdown for a label becomes visible via hover.
   * @param {string} label
   * @returns {Promise<WebdriverIO.Element>}
   */
  async revealDropdown(label) {
    const btn = await this.item(label);
    await btn.waitForExist({ timeout: 15000 });
    await btn.moveTo();
    const panel = await this.dropdownPanelFor(btn);
    await panel.waitForDisplayed({ timeout: 15000 });
    return panel;
  }

  /**
   * Resolve dropdown panel for a given nav button element.
   * @param {WebdriverIO.Element} buttonEl
   * @returns {Promise<WebdriverIO.Element>}
   */
  async dropdownPanelFor(buttonEl) {
    const id = await buttonEl.getAttribute('aria-controls');
    if (id) {
      return $(`#${id}`);
    }
    return $('div[role=\"menu\"]');
  }

  /**
   * Get all links inside a visible dropdown.
   * @returns {Promise<Array<WebdriverIO.Element>>}
   */
  async visibleDropdownLinks() {
    const menu = await $('div[role=\"menu\"]');
    const links = await menu.$$(':scope a[href]');
    return links;
  }

  /**
   * Find a child link in the currently visible dropdown by partial text.
   * @param {string} text
   * @returns {Promise<WebdriverIO.Element>}
   */
  async dropdownLinkByText(text) {
    const menu = await $('div[role=\"menu\"]');
    const sel = `:scope a*=${text}`;
    return menu.$(sel);
  }
}

module.exports = new NavMenu();


