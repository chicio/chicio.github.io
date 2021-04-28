import React from "react";
import { render } from "@testing-library/react";
import { Head } from "../src/components/head";
import { useStaticQuery } from "gatsby";
import { Helmet, HelmetData } from "react-helmet";
import {
  createJsonLD,
  createMetaAttributes,
  OgPageType,
} from "../src/logic/seo";

jest.mock("../src/logic/seo", () => ({
  ...jest.requireActual("../src/logic/seo"),
  createMetaAttributes: jest.fn(),
  createJsonLD: jest.fn(),
}));

const createMetaAttributesMock = createMetaAttributes as jest.MockedFunction<
  typeof createMetaAttributes
>;

const createJsonLDMock = createJsonLD as jest.MockedFunction<
  typeof createJsonLD
>;

describe("<Head />", () => {
  const useStaticQueryMock = useStaticQuery as jest.MockedFunction<
    typeof useStaticQuery
  >;

  beforeEach(() => {
    useStaticQueryMock.mockReturnValue({
      site: {
        siteMetadata: {
          title: "Fabrizio Duroni | Fabrizio Duroni ‘Chicio Coding’",
          siteUrl: "https://www.fabrizioduroni.it",
          featuredImage: "chicio-coding-feature-graphic.jpg",
          author: "Fabrizio Duroni",
          contacts: {
            email: "fabrizio.duroni@gmail.com",
            phone: "+393285926828",
            links: {
              twitter: "https://twitter.com/chicio86",
              facebook: "https://www.facebook.com/fabrizio.duroni",
              linkedin: "https://www.linkedin.com/in/fabrizio-duroni/",
              github: "https://github.com/chicio",
              medium: "https://medium.com/@chicio",
              devto: "https://dev.to/chicio",
              instagram: "https://www.instagram.com/__chicio__/",
            },
          },
        },
      },
    });
    createMetaAttributesMock.mockImplementation(() => [
      { name: "attribute", content: "content" },
    ]);
    createJsonLDMock.mockImplementation(() => `json-ld`);
  });

  describe("title", () => {
    it("custom received as prop", async () => {
      render(
        <Head
          url={"https://localhost:8000/blog"}
          pageType={OgPageType.website}
          imageUrl={""}
          customTitle={"a custom title"}
          date={""}
          description={""}
        />
      );

      const helmet: HelmetData = Helmet.peek();

      expect(helmet.title).toEqual("a custom title");
    });

    it("default", () => {
      render(
        <Head
          url={"https://localhost:8000/blog"}
          pageType={OgPageType.website}
          imageUrl={""}
          date={""}
          description={""}
        />
      );

      const helmet: HelmetData = Helmet.peek();

      expect(helmet.title).toEqual(
        "Fabrizio Duroni | Fabrizio Duroni ‘Chicio Coding’"
      );
    });
  });

  it("html attributes", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.website}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet: HelmetData = Helmet.peek();

    expect(helmet.htmlAttributes).toEqual({ lang: "en" });
  });

  it("meta attributes", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.website}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet = Helmet.peek();

    // @ts-ignore
    expect(helmet.metaTags).toEqual([
      { name: "attribute", content: "content" },
    ]);
  });

  it("link attributes", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.website}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet = Helmet.peek();

    // @ts-ignore
    expect(helmet.linkTags).toEqual([
      {
        href: "https://localhost:8000/blog",
        rel: "canonical",
      },
      {
        href: "/humans.txt",
        rel: "author",
      },
      {
        as: "font",
        crossOrigin: "anonymous",
        href: "/fonts/opensans/OpenSans-Regular.woff2",
        rel: "preload",
      },
    ]);
  });

  it("json ld", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.website}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet = Helmet.peek();

    // @ts-ignore
    expect(helmet.scriptTags[2]).toEqual({
      type: "application/ld+json",
      innerHTML: "json-ld",
    });
  });
});
