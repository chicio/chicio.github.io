import { mediaQuery } from "../src/components/design-system/utils-css/media-query";

describe("media-query", () => {
  it("min-width", () => {
    expect(mediaQuery.minWidth.xs).toEqual("@media (min-width: 576px)");
    expect(mediaQuery.minWidth.sm).toEqual("@media (min-width: 768px)");
    expect(mediaQuery.minWidth.md).toEqual("@media (min-width: 992px)");
    expect(mediaQuery.minWidth.lg).toEqual("@media (min-width: 1200px)");
  });

  it("max-width", () => {
    expect(mediaQuery.maxWidth.xs).toEqual("@media (max-width: 576px)");
    expect(mediaQuery.maxWidth.sm).toEqual("@media (max-width: 768px)");
    expect(mediaQuery.maxWidth.md).toEqual("@media (max-width: 992px)");
    expect(mediaQuery.maxWidth.lg).toEqual("@media (max-width: 1200px)");
  });

  it("dark", () => {
    expect(mediaQuery.dark).toEqual("@media (prefers-color-scheme: dark)");
  });

  it("device", () => {
    expect(mediaQuery.inputDevice.mouse).toEqual(
      "@media (hover: hover) and (pointer: fine)",
    );
  });
});
