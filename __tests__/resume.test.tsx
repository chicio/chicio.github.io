import { fireEvent, render, screen } from "@testing-library/react";
import { Page } from "../src/components/design-system/templates/page";
import React from "react";
import { Resume } from "../src/components/design-system/organism/resume";

describe("Resume", () => {
  it("shows the correct tab on click", async () => {
    render(
      <Page>
        <Resume />
      </Page>
    );

    const experienceTab = screen.getByText("Experience");
    fireEvent.click(experienceTab);

    expect(
      screen.getByText("Master's degree in Computer Science")
    ).toBeDefined();

    const projectsTab = screen.getByText("Projects");
    fireEvent.click(projectsTab);

    expect(screen.getByText("Spectral Clara Lux Tracer")).toBeDefined();
  });
});
