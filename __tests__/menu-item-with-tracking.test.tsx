import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { trackWith } from "../src/logic/tracking";
import { BlogThemePage } from "../src/components/design-system/templates/blog-theme-page";
import { MenuItemWithTracking } from "../src/components/menu-item-with-tracking";

jest.mock("../src/logic/tracking", () => ({
  ...jest.requireActual("../src/logic/tracking"),
  trackWith: jest.fn(),
}));

const trackWithMock = trackWith as jest.MockedFunction<typeof trackWith>;

describe("MenuItemWithTracking", () => {
  it("track", async () => {
    render(
      <BlogThemePage>
        <MenuItemWithTracking
          to={"/an-url"}
          trackingData={{
            category: "category",
            action: "action",
            label: "label",
          }}
          selected={false}
        >
          Link
        </MenuItemWithTracking>
      </BlogThemePage>
    );
    const button = screen.getByText("Link");

    fireEvent.click(button);

    expect(trackWithMock).toHaveBeenCalledTimes(1);
    expect(trackWithMock).toHaveBeenLastCalledWith({
      category: "category",
      action: "action",
      label: "label",
    });
  });
});
