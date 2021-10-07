import React from "react";
import { render } from "@testing-library/react";
import { Head } from "../src/components/head";
import { useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
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
          pageType={OgPageType.WebSite}
          imageUrl={""}
          customTitle={"a custom title"}
          date={""}
          description={""}
        />
      );

      const helmet = Helmet.peek();

      expect(helmet.title).toEqual("a custom title");
    });

    it("default", () => {
      render(
        <Head
          url={"https://localhost:8000/blog"}
          pageType={OgPageType.WebSite}
          imageUrl={""}
          date={""}
          description={""}
        />
      );

      const helmet = Helmet.peek();

      expect(helmet.title).toEqual(
        "Fabrizio Duroni | Fabrizio Duroni ‘Chicio Coding’"
      );
    });
  });

  it("html attributes", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.WebSite}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet = Helmet.peek();

    expect(helmet.htmlAttributes).toEqual({ lang: "en" });
  });

  it("meta attributes", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.WebSite}
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

  it("links", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.WebSite}
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

  it("scripts", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.WebSite}
        imageUrl={""}
        customTitle={"a custom title"}
        date={""}
        description={""}
      />
    );

    const helmet = Helmet.peek();

    // @ts-ignore
    expect(helmet.scriptTags).toEqual([
      {
        type: "text/javascript",
        defer: true,
        src:
          "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js",
        "data-cfasync": "false",
      },
      {
        type: "text/javascript",
        innerHTML:
          "\nif (typeof window !== \"undefined\") {\n  window.addEventListener('load', () => { \n       window.cookieconsent.initialise({\n                      palette: {\n                          popup: {\n                              background: '#303F9F',\n                              text: '#ffffff'\n                          },\n                          button: {\n                              background: '#0F67FF',\n                              text: '#ffffff'\n                          }\n                      },\n                      theme: 'classic',\n                      content: {\n                          dismiss: 'Ok',\n                          href: window.location.protocol + '//' + window.location.host + '/cookie-policy/',\n                          message: 'This website uses cookies to ensure you get the best experience.',\n                          link: 'Learn more about cookie policy'\n                      }\n       });\n  });\n} else {\n  console.log(\"no cookieconsent\");\n}      \n",
      },
      {
        type: "application/ld+json",
        innerHTML: "json-ld",
      },
    ]);
  });

  it("json ld", () => {
    render(
      <Head
        url={"https://localhost:8000/blog"}
        pageType={OgPageType.WebSite}
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
