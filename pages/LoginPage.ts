import { browser, $ } from "@wdio/globals";
import loginData from "../test-data/loginData.json";
import testConfig from "../test-data/testConfig.json";
import { buildSelector } from "../utils/selectorBuilder";

/**
 * LoginPage class for OneBayshore Mobile Android app
 * Handles all login-related interactions and validations
 */
export class LoginPage {
  /**
   * Get username input field
   */
  get usernameField() {
    return $(buildSelector(loginData.selectors.usernameField));
  }

  /**
   * Get password input field
   */
  get passwordField() {
    return $(buildSelector(loginData.selectors.passwordField));
  }

  /**
   * Get login button
   */
  get loginButton() {
    return $(buildSelector(loginData.selectors.loginButton));
  }

  /**
   * Get login header text element
   */
  get loginHeaderText() {
    return $(buildSelector(loginData.selectors.loginHeaderText));
  }

  /**
   * Get login title element
   */
  get loginTitle() {
    return $(`android=new UiSelector().textContains("${loginData.loginTitle}")`);
  }

  /**
   * Get invalid credential header error element
   */
  get invalidCredentialHeader() {
    return $(buildSelector(loginData.errorMessages.invalidCredentialHeader));
  }

  /**
   * Get invalid credential message error element
   */
  get invalidCredentialMessage() {
    return $(buildSelector(loginData.errorMessages.invalidCredentialMessage));
  }

  /**
   * Wait for login page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.loginTitle.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
  }

  /**
   * Check if login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.loginTitle.isDisplayed();
  }

  /**
   * Enter username in the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameField.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.usernameField.setValue(username);
  }

  /**
   * Enter password in the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordField.waitForDisplayed({
      timeout: testConfig.timeouts.default,
    });
    await this.passwordField.setValue(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform login with username and password
   * @param username - The username
   * @param password - The password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Wait for successful login (dashboard appears)
   */
  async waitForLoginSuccess(): Promise<void> {
    await browser.pause(testConfig.timeouts.login);
  }

  /**
   * Check if login was successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      const url = await browser.getUrl();
      return !url.includes("login");
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    try {
      await this.invalidCredentialHeader.waitForDisplayed({ timeout: 3000 });
      return await this.invalidCredentialHeader.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    if (await this.isErrorMessageDisplayed()) {
      return await this.invalidCredentialMessage.getText();
    }
    return "";
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  // Password recovery methods - disabled until selectors are added to loginData.json
  // /**
  //  * Navigate to password recovery via email
  //  */
  // async clickEmailRecovery(): Promise<void> {
  //   await this.troubleText.waitForDisplayed({
  //     timeout: loginData.timeouts.default,
  //   });
  //   await this.emailLink.click();
  // }

  // /**
  //  * Navigate to password recovery via phone
  //  */
  // async clickPhoneRecovery(): Promise<void> {
  //   await this.troubleText.waitForDisplayed({
  //     timeout: loginData.timeouts.default,
  //   });
  //   await this.phoneLink.click();
  // }

  /**
   * Verify all login page elements are displayed
   */
  async verifyLoginPageElements(): Promise<{
    title: boolean;
    usernameField: boolean;
    passwordField: boolean;
    loginButton: boolean;
  }> {
    return {
      title: await this.loginTitle.isDisplayed(),
      usernameField: await this.usernameField.isDisplayed(),
      passwordField: await this.passwordField.isDisplayed(),
      loginButton: await this.loginButton.isDisplayed(),
    };
  }

  /**
   * Clear username field
   */
  async clearUsername(): Promise<void> {
    await this.usernameField.clearValue();
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.passwordField.clearValue();
  }

  /**
   * Clear all login fields
   */
  async clearAllFields(): Promise<void> {
    await this.clearUsername();
    await this.clearPassword();
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameField.getValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordField.getValue();
  }
}

export default new LoginPage();
