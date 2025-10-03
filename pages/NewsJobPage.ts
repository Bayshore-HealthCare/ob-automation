import { browser, $ } from "@wdio/globals";
import newsJobData from "../test-data/newsJobData.json";
import testConfig from "../test-data/testConfig.json";
import { buildSelector } from "../utils/selectorBuilder";

/**
 * NewsJobPage class for OneBayshore Mobile Android app
 * Handles news and job opportunities subscription interactions
 */
export class NewsJobPage {
  /**
   * Get header text element
   */
  get headerText() {
    return $(buildSelector(newsJobData.selectors.headerText));
  }

  /**
   * Get name input field
   */
  get nameField() {
    return $(buildSelector(newsJobData.selectors.nameField));
  }

  /**
   * Get email input field
   */
  get emailField() {
    return $(buildSelector(newsJobData.selectors.emailField));
  }

  /**
   * Get subscribe button
   */
  get subscribeButton() {
    return $(buildSelector(newsJobData.selectors.subscribeButton));
  }

  /**
   * Wait for news/job page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.headerText.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
  }

  /**
   * Check if news/job page is displayed
   */
  async isNewsJobPageDisplayed(): Promise<boolean> {
    return await this.headerText.isDisplayed();
  }

  /**
   * Enter name in the name field
   * @param name - The name to enter
   */
  async enterName(name: string): Promise<void> {
    await this.nameField.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.nameField.setValue(name);
  }

  /**
   * Enter email in the email field
   * @param email - The email to enter
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailField.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.emailField.setValue(email);
  }

  /**
   * Click the subscribe button
   */
  async clickSubscribeButton(): Promise<void> {
    await this.subscribeButton.click();
  }

  /**
   * Subscribe with name and email
   * @param name - The name
   * @param email - The email
   */
  async subscribe(name: string, email: string): Promise<void> {
    await this.enterName(name);
    await this.enterEmail(email);
    await this.clickSubscribeButton();
  }

  /**
   * Verify all news/job page elements are displayed
   */
  async verifyNewsJobPageElements(): Promise<{
    header: boolean;
    nameField: boolean;
    emailField: boolean;
    subscribeButton: boolean;
  }> {
    return {
      header: await this.headerText.isDisplayed(),
      nameField: await this.nameField.isDisplayed(),
      emailField: await this.emailField.isDisplayed(),
      subscribeButton: await this.subscribeButton.isDisplayed(),
    };
  }

  /**
   * Clear name field
   */
  async clearName(): Promise<void> {
    await this.nameField.clearValue();
  }

  /**
   * Clear email field
   */
  async clearEmail(): Promise<void> {
    await this.emailField.clearValue();
  }

  /**
   * Clear all fields
   */
  async clearAllFields(): Promise<void> {
    await this.clearName();
    await this.clearEmail();
  }

  /**
   * Get name field value
   */
  async getNameValue(): Promise<string> {
    return await this.nameField.getValue();
  }

  /**
   * Get email field value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailField.getValue();
  }

  /**
   * Check if subscribe button is enabled
   */
  async isSubscribeButtonEnabled(): Promise<boolean> {
    return await this.subscribeButton.isEnabled();
  }
}

export default new NewsJobPage();
