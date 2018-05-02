/* eslint-disable no-undef */
exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.spec.js'
  ],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'wdio:devtoolsOptions': {
      headless: true
    }
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.ymca.org/',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['devtools'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  before: async function () {
    await browser.setWindowSize(1440, 900);
  }
};


