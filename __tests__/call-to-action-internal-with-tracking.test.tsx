import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CallToActionInternalWithTracking } from "../src/components/call-to-action-internal-with-tracking";
import { trackWith } from "../src/logic/tracking";
import { BlogThemePage } from "../src/components/design-system/templates/blog-theme-page";

jest.mock("../src/logic/tracking", () => ({
  ...jest.requireActual("../src/logic/tracking"),
  trackWith: jest.fn(),
}));

const trackWithMock = trackWith as jest.MockedFunction<typeof trackWith>;

describe("CallToActionInternalWithTracking", () => {
  it("track", async () => {
    render(
      <BlogThemePage>
        <CallToActionInternalWithTracking
          to={"/an-url"}
          trackingData={{
            category: "category",
            action: "action",
            label: "label",
          }}
        >
          Button
        </CallToActionInternalWithTracking>
      </BlogThemePage>
    );
    const button = screen.getByText("Button");

    fireEvent.click(button);

    expect(trackWithMock).toHaveBeenCalledTimes(1);
    expect(trackWithMock).toHaveBeenLastCalledWith({
      category: "category",
      action: "action",
      label: "label",
    });
  });
});
