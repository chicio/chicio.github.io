import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { trackWith } from "../src/logic/tracking";
import { Page } from "../src/components/design-system/templates/page";
import { StandardExternalLinkWithTracking } from "../src/components/standard-external-link-with-tracking";

jest.mock("../src/logic/tracking", () => ({
  ...jest.requireActual("../src/logic/tracking"),
  trackWith: jest.fn(),
}));

const trackWithMock = trackWith as jest.MockedFunction<typeof trackWith>;

describe("StandardExternalLinkWithTracking", () => {
  it("track", async () => {
    render(
      <Page>
        <StandardExternalLinkWithTracking
          href={"/an-url"}
          trackingData={{
            category: "category",
            action: "action",
            label: "label",
          }}
        >
          Link
        </StandardExternalLinkWithTracking>
      </Page>
    );
    const button = screen.getByText("Link");

    await fireEvent.click(button);

    expect(trackWithMock).toHaveBeenCalledTimes(1);
    expect(trackWithMock).toHaveBeenLastCalledWith({
      category: "category",
      action: "action",
      label: "label",
    });
  });
});