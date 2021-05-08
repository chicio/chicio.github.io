import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Gallery,
  GalleryProps,
} from "../../src/components/design-system/organism/gallery";

const Template: Story<GalleryProps> = (args) => <Gallery {...args} />;

export const GalleryStory = Template.bind({});
GalleryStory.args = {
  images: [
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#b8a888",
            images: {
              fallback: {
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-30.jpg",
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
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-29.jpg",
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
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#b8a888",
            images: {
              fallback: {
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-28.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-28.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-28.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-28",
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
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-27.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-27.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-27.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-27",
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
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-26.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-26.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-26.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-26",
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
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-25.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-25.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-25.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-25",
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
                src:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-24.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-24.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-24.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-24",
      },
    },
  ],
};
GalleryStory.storyName = "Gallery";

export default {
  title: "Organisms/Gallery",
  component: Gallery,
} as Meta;
