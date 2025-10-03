import { baseConfig } from "./wdio.conf.base";
import { deepmerge } from "deepmerge-ts";

/**
 * WebdriverIO configuration for CI/GitHub Actions
 * Extends base configuration with CI-specific settings
 */
export const config: WebdriverIO.Config = deepmerge(baseConfig, {
  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "emulator-5554",
      "appium:platformVersion": "30",
      "appium:automationName": "UiAutomator2",
      "appium:app": "./app/onebayshore.apk",
      "appium:autoGrantPermissions": true,
      "appium:noReset": false,
      "appium:fullReset": false,
      "appium:avd": "test_emulator",
      "appium:avdLaunchTimeout": 180000,
      "appium:avdReadyTimeout": 180000,
    },
  ],

  logLevel: "warn",

  bail: 1,

  services: [
    [
      "appium",
      {
        args: {
          relaxedSecurity: true,
        },
        logPath: "./logs/",
      },
    ],
  ],

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
    [
      "junit",
      {
        outputDir: "./test-results",
        outputFileFormat: function (options) {
          return `results-${options.cid}.xml`;
        },
      },
    ],
  ],
} as WebdriverIO.Config);
