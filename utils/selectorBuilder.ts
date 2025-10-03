/**
 * Build selector based on strategy and value from test data
 * @param locator - Object containing strategy and value
 * @returns Selector string for WebdriverIO
 */
export function buildSelector(locator: { strategy: string; value: string }): string {
  switch (locator.strategy) {
    case "accessibility_id":
      return `~${locator.value}`;
    case "hint":
      // Android doesn't have .hint() in UiSelector, use XPath instead
      return `//android.widget.EditText[@hint="${locator.value}"]`;
    case "text":
      return `android=new UiSelector().text("${locator.value}")`;
    case "xpath":
      return locator.value;
    default:
      throw new Error(`Unknown strategy: ${locator.strategy}`);
  }
}
