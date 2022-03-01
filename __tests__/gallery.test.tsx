import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Gallery } from "../src/components/design-system/organism/gallery";
import { BlogThemePage } from "../src/components/design-system/templates/blog-theme-page";

const images = [
  {
    node: {
      childImageSharp: {
        gatsbyImageData: {
          layout: "fullWidth",
          backgroundColor: "#b8a888",
          images: {
            fallback: {
              src: "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-30.jpg",
              srcSet:
                "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-30.jpg 640w",
              sizes: "100vw",
            },
            sources: [
              {
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-30.webp 640w",
                type: "image/webp",
                sizes: "100vw",
              },
            ],
          },
          width: 1,
          height: 1.25,
        },
      },
      name: "2021-03-30",
    },
  },
  {
    node: {
      childImageSharp: {
        gatsbyImageData: {
          layout: "fullWidth",
          backgroundColor: "#b8a888",
          images: {
            fallback: {
              src: "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-29.jpg",
              srcSet:
                "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-29.jpg 640w",
              sizes: "100vw",
            },
            sources: [
              {
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-29.webp 640w",
                type: "image/webp",
                sizes: "100vw",
              },
            ],
          },
          width: 1,
          height: 1.25,
        },
      },
      name: "2021-03-29",
    },
  },
];

describe("Gallery", () => {
  it("shows the image when the user clicks on it", async () => {
    render(
      <BlogThemePage>
        <Gallery

          images={images} />
      </BlogThemePage>
    );

    const image = screen.getByAltText("2021-03-30");
    fireEvent.click(image);
    const modal = screen.getByAltText("Modal Image");

    expect(modal).toBeDefined();
  });
});
