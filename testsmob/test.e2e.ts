import { expect, browser, $ } from "@wdio/globals";

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await $("#username").setValue("tomsmith");
    await $("#password").setValue("SuperSecretPassword!");
    await $('button[type="submit"]').click();

    await expect($("#flash")).toBeExisting();
    await expect($("#flash")).toHaveText(
      expect.stringContaining("You logged into a secure area!")
    );
  });
});
