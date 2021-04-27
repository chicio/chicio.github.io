import { generateTagLink } from "../src/logic/tag";

describe("tag", () => {
  describe("generate link", () => {
    it("for single word tag", () => {
      expect(generateTagLink("macos")).toBe("/blog/tags/macos/");
    });

    it("for multiple word tag", () => {
      expect(generateTagLink("mobile app")).toBe("/blog/tags/mobile-app/");
    });
  });
});
