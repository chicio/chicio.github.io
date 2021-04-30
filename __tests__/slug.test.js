import { generateTagSlug, generatePostSlug } from "../src/logic/slug";

describe("slug", () => {
  describe("tag", () => {
    it("generate slug for single word tag", () => {
      expect(generateTagSlug("macos")).toEqual("/blog/tags/macos/");
    });

    it("generate slug for multiple word tag", () => {
      expect(generateTagSlug("mobile app")).toEqual("/blog/tags/mobile-app/");
    });
  });

  it("post", () => {
    expect(generatePostSlug("/2017-05-10-about-me")).toEqual(
      "/2017/05/10/about-me"
    );
  });
});
