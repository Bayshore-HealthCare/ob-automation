import { Options } from "@wdio/types";

/**
 * Base WebdriverIO configuration
 * Shared settings between local and CI environments
 */
export const baseConfig: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",

  port: 4723,

  specs: ["./testsmob/**/*.ts"],

  exclude: [],

  framework: "mocha",

  logLevel: "info",

  bail: 0,

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: ["appium"],

  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const testName = test.title.replace(/\s+/g, '_');
      const filename = `./screenshots/${testName}_${timestamp}.png`;

      const screenshot = await browser.takeScreenshot();
      const fs = await import('fs');
      const path = await import('path');

      // Create screenshots directory if it doesn't exist
      const dir = path.dirname(filename);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Save screenshot
      fs.writeFileSync(filename, screenshot, 'base64');
      console.log(`Screenshot saved: ${filename}`);
    }
  },
};
