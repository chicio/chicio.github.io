import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CallToActionInternalWithTracking } from "../src/components/call-to-action-internal-with-tracking";
import { trackWith } from "../src/logic/tracking";
import { Page } from "../src/components/design-system/templates/page";

jest.mock("../src/logic/tracking", () => ({
  ...jest.requireActual("../src/logic/tracking"),
  trackWith: jest.fn(),
}));

const trackWithMock = trackWith as jest.MockedFunction<typeof trackWith>;

describe("CallToActionInternalWithTracking", () => {
  it("track", async () => {
    render(
      <Page>
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
      </Page>
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
