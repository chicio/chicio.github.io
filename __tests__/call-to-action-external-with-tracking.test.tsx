import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { trackWith } from "../src/logic/tracking";
import { Page } from "../src/components/design-system/templates/page";
import { CallToActionExternalWithTracking } from "../src/components/call-to-action-external-with-tracking";

jest.mock("../src/logic/tracking", () => ({
  ...jest.requireActual("../src/logic/tracking"),
  trackWith: jest.fn(),
}));

const trackWithMock = trackWith as jest.MockedFunction<typeof trackWith>;

describe("CallToActionExternalWithTracking", () => {
  it("track", async () => {
    render(
      <Page>
        <CallToActionExternalWithTracking
          href={"/an-url"}
          trackingData={{
            category: "category",
            action: "action",
            label: "label",
          }}
        >
          Button
        </CallToActionExternalWithTracking>
      </Page>
    );
    const button = screen.getByText("Button");

    await fireEvent.click(button);

    expect(trackWithMock).toHaveBeenCalledTimes(1);
    expect(trackWithMock).toHaveBeenLastCalledWith({
      category: "category",
      action: "action",
      label: "label",
    });
  });
});
