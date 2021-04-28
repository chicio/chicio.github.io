import { generateTagUrl } from "../src/logic/url";

describe("url", () => {
  describe("tag", () => {
    it("generate url for single word tag", () => {
      expect(generateTagUrl("macos")).toBe("/blog/tags/macos/");
    });

    it("generate url for multiple word tag", () => {
      expect(generateTagUrl("mobile app")).toBe("/blog/tags/mobile-app/");
    });
  });
});
