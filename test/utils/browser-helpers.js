/**
 * Click an element if it exists and is clickable.
 * @param {WebdriverIO.Element} el
 * @returns {Promise<boolean>}
 */
async function safeClick(el) {
  if (!el) return false;
  try {
    await el.waitForClickable({ timeout: 10000 });
    await el.click();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get trimmed texts from a list of elements.
 * @param {Array<WebdriverIO.Element>} elements
 * @returns {Promise<string[]>}
 */
async function getTexts(elements) {
  const out = [];
  for (const el of elements) {
    out.push((await el.getText()).trim());
  }
  return out;
}

module.exports = {
  safeClick,
  getTexts
};


