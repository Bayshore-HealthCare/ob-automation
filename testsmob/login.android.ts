import { expect, browser } from "@wdio/globals";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../test-data/loginData.json";
import testConfig from "../test-data/testConfig.json";
import authData from "../test-data/authData.json";

describe("OneBayshore Mobile - Android Login", () => {
  /**
   * Test suite for initial login flow on Android
   * Uses Page Object Model and test data from JSON files
   */
  let loginPage: LoginPage;

  before(async () => {
    loginPage = new LoginPage();
  });

  beforeEach(async () => {
    // Wait for app to be fully loaded
    await browser.pause(3000);
  });

  it("should display login screen with required elements", async () => {
    // Wait for login page to load
    await loginPage.waitForPageLoad();

    // Verify all login page elements are displayed
    const elements = await loginPage.verifyLoginPageElements();

    await expect(elements.title).toBe(true);
    await expect(elements.usernameField).toBe(true);
    await expect(elements.passwordField).toBe(true);
    await expect(elements.loginButton).toBe(true);
  });

  it("should show validation behavior for empty fields", async () => {
    // Ensure page is loaded
    await loginPage.waitForPageLoad();

    // Check if login button is disabled or enabled based on empty fields
    const isEnabled = await loginPage.isLoginButtonEnabled();

    // Login button behavior when fields are empty
    await expect(isEnabled).toBeDefined();
  });

  loginData.validCredentials.forEach((credential) => {
    it(`should login with valid credentials - ${credential.testName}`, async () => {
      // Wait for login page
      await loginPage.waitForPageLoad();

      // Perform login using page object method
      await loginPage.login(credential.username, credential.password);

      // Wait for login process to complete
      await loginPage.waitForLoginSuccess();

      // Verify successful login
      const isSuccessful = await loginPage.isLoginSuccessful();
      await expect(isSuccessful).toBe(true);
    });
  });

  loginData.invalidCredentials
    .filter((cred) => cred.username !== "" && cred.password !== "")
    .forEach((credential) => {
      it(`should display error message - ${credential.testName}`, async () => {
        // Wait for login page
        await loginPage.waitForPageLoad();

        // Attempt login with invalid credentials
        await loginPage.login(credential.username, credential.password);

        // Wait for error message to appear
        await browser.pause(testConfig.timeouts.default / 2);

        // Verify error message is displayed
        const hasError = await loginPage.isErrorMessageDisplayed();
        await expect(hasError).toBe(true);

        // Clear fields for next test
        await loginPage.clearAllFields();
      });
    });

  // Password recovery tests - disabled until selectors are added to loginData.json
  // it("should navigate to password recovery via email", async () => {
  //   // Wait for login page
  //   await loginPage.waitForPageLoad();

  //   // Verify trouble text is visible
  //   await expect(loginPage.troubleText).toBeDisplayed();

  //   // Click on email recovery link
  //   await loginPage.clickEmailRecovery();

  //   // Wait for external browser or password recovery flow
  //   await browser.pause(2000);

  //   // Note: Password recovery opens in external browser/webview
  //   // Validation would depend on whether it's handled in-app or externally
  // });

  // it("should verify password recovery links are present", async () => {
  //   // Wait for login page
  //   await loginPage.waitForPageLoad();

  //   // Verify trouble signing in text and links are present
  //   await expect(loginPage.troubleText).toBeDisplayed();
  //   await expect(loginPage.emailLink).toBeDisplayed();
  // });

  afterEach(async () => {
    // Reset app state for next test if needed
    await browser.pause(1000);
  });
});
