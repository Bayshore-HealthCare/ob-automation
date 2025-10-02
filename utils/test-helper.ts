import { Page } from "@playwright/test";

/**
 * Helper functions for tests
 */
export class TestHelper {
  constructor(private page: Page) {}

  /**
   * Wait for network calls to finish
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Take a screenshot with a custom name
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }
}
