import { browser, $ } from "@wdio/globals";
import signInData from "../test-data/signInData.json";
import testConfig from "../test-data/testConfig.json";
import { buildSelector } from "../utils/selectorBuilder";

/**
 * SignInPage class for OneBayshore Mobile Android app
 * Handles initial sign-in screen interactions
 */
export class SignInPage {
  /**
   * Get header text element
   */
  get headerText() {
    return $(buildSelector(signInData.selectors.headerText));
  }

  /**
   * Get sign in here button
   */
  get signInHereButton() {
    return $(buildSelector(signInData.selectors.signInHereButton));
  }

  /**
   * Get news and job opportunities button
   */
  get newsJobButton() {
    return $(buildSelector(signInData.selectors.newsJobButton));
  }

  /**
   * Wait for sign-in page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.headerText.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
  }

  /**
   * Check if sign-in page is displayed
   */
  async isSignInPageDisplayed(): Promise<boolean> {
    return await this.headerText.isDisplayed();
  }

  /**
   * Click the sign in here button
   */
  async clickSignInHereButton(): Promise<void> {
    await this.signInHereButton.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.signInHereButton.click();
  }

  /**
   * Click the news and job opportunities button
   */
  async clickNewsJobButton(): Promise<void> {
    await this.newsJobButton.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.newsJobButton.click();
  }

  /**
   * Verify all sign-in page elements are displayed
   */
  async verifySignInPageElements(): Promise<{
    header: boolean;
    signInButton: boolean;
    newsJobButton: boolean;
  }> {
    return {
      header: await this.headerText.isDisplayed(),
      signInButton: await this.signInHereButton.isDisplayed(),
      newsJobButton: await this.newsJobButton.isDisplayed(),
    };
  }
}

export default new SignInPage();
