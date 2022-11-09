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
            backgroundColor: "#d8d8d8",
            images: {
              fallback: {
                src: "/static/d91415fd4b18003859c9ff621f4f0596/e3115/2021-04-18.jpg",
                srcSet:
                  "/static/d91415fd4b18003859c9ff621f4f0596/e3115/2021-04-18.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d91415fd4b18003859c9ff621f4f0596/8ffad/2021-04-18.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-04-18",
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
                src: "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-18.jpg",
                srcSet:
                  "/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-18.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-18.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-18",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#d8d8d8",
            images: {
              fallback: {
                src: "/static/617e9a5009f456d3a16060908f474963/e3115/2021-03-07.jpg",
                srcSet:
                  "/static/617e9a5009f456d3a16060908f474963/e3115/2021-03-07.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/617e9a5009f456d3a16060908f474963/8ffad/2021-03-07.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-03-07",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#e8e8e8",
            images: {
              fallback: {
                src: "/static/e047f986b42333fa75dc0ff0d02ead2e/e3115/2021-02-21.jpg",
                srcSet:
                  "/static/e047f986b42333fa75dc0ff0d02ead2e/e3115/2021-02-21.jpg 640w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/e047f986b42333fa75dc0ff0d02ead2e/8ffad/2021-02-21.webp 640w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-02-21",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#a89888",
            images: {
              fallback: {
                src: "/static/c1a6764b0e07aaa8423197bf5ea42baf/ccdae/2021-01-31.jpg",
                srcSet:
                  "/static/c1a6764b0e07aaa8423197bf5ea42baf/a6eba/2021-01-31.jpg 750w,\n/static/c1a6764b0e07aaa8423197bf5ea42baf/ccdae/2021-01-31.jpg 1080w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/c1a6764b0e07aaa8423197bf5ea42baf/de80f/2021-01-31.webp 750w,\n/static/c1a6764b0e07aaa8423197bf5ea42baf/886bc/2021-01-31.webp 1080w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 0.7981481481481482,
          },
        },
        name: "2021-01-31",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#e8c8a8",
            images: {
              fallback: {
                src: "/static/556abc843cb34ae666f4d7e8f000eab3/68d35/2021-01-13.jpg",
                srcSet:
                  "/static/556abc843cb34ae666f4d7e8f000eab3/4423a/2021-01-13.jpg 750w,\n/static/556abc843cb34ae666f4d7e8f000eab3/68d35/2021-01-13.jpg 1080w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/556abc843cb34ae666f4d7e8f000eab3/3131c/2021-01-13.webp 750w,\n/static/556abc843cb34ae666f4d7e8f000eab3/017df/2021-01-13.webp 1080w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2021-01-13",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#e8c8a8",
            images: {
              fallback: {
                src: "/static/2d9a015e1931e2e416a62abeafc91ceb/d93c0/2020-12-21.jpg",
                srcSet:
                  "/static/2d9a015e1931e2e416a62abeafc91ceb/33257/2020-12-21.jpg 750w,\n/static/2d9a015e1931e2e416a62abeafc91ceb/d93c0/2020-12-21.jpg 1080w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/2d9a015e1931e2e416a62abeafc91ceb/56234/2020-12-21.webp 750w,\n/static/2d9a015e1931e2e416a62abeafc91ceb/b36af/2020-12-21.webp 1080w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 0.7925925925925926,
          },
        },
        name: "2020-12-21",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#f8d8b8",
            images: {
              fallback: {
                src: "/static/81602406773c0409bbe9016362435bf4/49438/2020-11-11.jpg",
                srcSet:
                  "/static/81602406773c0409bbe9016362435bf4/6c918/2020-11-11.jpg 750w,\n/static/81602406773c0409bbe9016362435bf4/49438/2020-11-11.jpg 1080w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/81602406773c0409bbe9016362435bf4/66907/2020-11-11.webp 750w,\n/static/81602406773c0409bbe9016362435bf4/27610/2020-11-11.webp 1080w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 0.75,
          },
        },
        name: "2020-11-11",
      },
    },
    {
      node: {
        childImageSharp: {
          gatsbyImageData: {
            layout: "fullWidth",
            backgroundColor: "#d8b898",
            images: {
              fallback: {
                src: "/static/6d78e5250cc32ed29a9694fa0db5e30a/68d35/2020-10-20.jpg",
                srcSet:
                  "/static/6d78e5250cc32ed29a9694fa0db5e30a/4423a/2020-10-20.jpg 750w,\n/static/6d78e5250cc32ed29a9694fa0db5e30a/68d35/2020-10-20.jpg 1080w",
                sizes: "100vw",
              },
              sources: [
                {
                  srcSet:
                    "/static/6d78e5250cc32ed29a9694fa0db5e30a/3131c/2020-10-20.webp 750w,\n/static/6d78e5250cc32ed29a9694fa0db5e30a/017df/2020-10-20.webp 1080w",
                  type: "image/webp",
                  sizes: "100vw",
                },
              ],
            },
            width: 1,
            height: 1.25,
          },
        },
        name: "2020-10-20",
      },
    },
  ],
};
GalleryStory.storyName = "Gallery";

export default {
  title: "Organisms/Gallery",
  component: Gallery,
} as Meta;
