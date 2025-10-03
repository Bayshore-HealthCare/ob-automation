import { expect, browser } from "@wdio/globals";
import { SignInPage } from "../pages/SignInPage";
import { LoginPage } from "../pages/LoginPage";
import { NewsJobPage } from "../pages/NewsJobPage";
import signInData from "../test-data/signInData.json";
import testConfig from "../test-data/testConfig.json";

describe("OneBayshore Mobile - Android Sign In", () => {
  /**
   * Test suite for initial sign-in screen on Android
   * Uses Page Object Model and test data from JSON files
   */
  let signInPage: SignInPage;
  let loginPage: LoginPage;
  let newsJobPage: NewsJobPage;

  before(async () => {
    signInPage = new SignInPage();
    loginPage = new LoginPage();
    newsJobPage = new NewsJobPage();
  });

  beforeEach(async () => {
    // Reset app to initial state between tests
    await browser.reloadSession();
    await browser.pause(3000);
  });

  it("should display sign-in screen with required elements", async () => {
    // Wait for sign-in page to load
    await signInPage.waitForPageLoad();

    // Verify all sign-in page elements are displayed
    const elements = await signInPage.verifySignInPageElements();

    await expect(elements.header).toBe(true);
    await expect(elements.signInButton).toBe(true);
    await expect(elements.newsJobButton).toBe(true);
  });

  it("should verify header text is correct", async () => {
    // Wait for sign-in page to load
    await signInPage.waitForPageLoad();

    // Verify header is displayed
    await expect(signInPage.headerText).toBeDisplayed();
  });

  it("should navigate to login when sign in here button is clicked", async () => {
    // Wait for sign-in page to load
    await signInPage.waitForPageLoad();

    // Click sign in here button
    await signInPage.clickSignInHereButton();

    // Wait for login page to load
    await loginPage.waitForPageLoad();

    // Verify login page elements are displayed
    const elements = await loginPage.verifyLoginPageElements();

    await expect(elements.title).toBe(true);
    await expect(elements.usernameField).toBe(true);
    await expect(elements.passwordField).toBe(true);
    await expect(elements.loginButton).toBe(true);
  });

  it("should navigate to news and jobs when button is clicked", async () => {

    // Wait for sign-in page to load
    await signInPage.waitForPageLoad();

   // Click News and Job button
    await signInPage.clickNewsJobButton();

    // Wait for news/job page to load
    await newsJobPage.waitForPageLoad();

    // Verify news/job page elements are displayed
    const elements = await newsJobPage.verifyNewsJobPageElements();

    await expect(elements.header).toBe(true);
    await expect(elements.nameField).toBe(true);
    await expect(elements.emailField).toBe(true);
    await expect(elements.subscribeButton).toBe(true);
  });

  afterEach(async () => {
    // Reset app state for next test if needed
    await browser.pause(1000);
  });
});
