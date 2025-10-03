import { baseConfig } from "./wdio.conf.base";
import { deepmerge } from "deepmerge-ts";

/**
 * WebdriverIO configuration for local development
 * Extends base configuration with local-specific settings
 */
export const config: WebdriverIO.Config = deepmerge(baseConfig, {
  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Pixel_7a",
      "appium:platformVersion": "14.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": "./app/onebayshore.apk",
      "appium:autoWebview": false,  // Disables webview automation
      "appium:autoGrantPermissions": true,
      "appium:noReset": false,
      "appium:fullReset": false,
    },
  ],

  logLevel: "info",

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
} as WebdriverIO.Config);
