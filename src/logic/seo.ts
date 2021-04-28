export enum OgPageType {
  article = "article",
  website = "website",
  profile = "profile",
}

export const createMetaAttributes = (
  author: string,
  title: string,
  url: string,
  imageUrl: string,
  ogPageType: OgPageType
) => [
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
  },
  {
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge",
  },
  {
    name: "p:domain_verify",
    content: "33d2d5dad0e1496d9f7974925340ea50",
  },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black",
  },
  {
    name: "author",
    content: author,
  },
  {
    name: "description",
    content: title,
  },
  {
    property: "og:title",
    content: title,
  },

  {
    property: "og:locale",
    content: "en_US",
  },
  {
    property: "og:description",
    content: title,
  },
  {
    property: "og:url",
    content: url,
  },
  {
    property: "og:site_name",
    content: author,
  },
  {
    property: "og:image",
    content: imageUrl,
  },
  {
    name: "twitter:card",
    content: "summary",
  },
  {
    property: "twitter:image",
    content: imageUrl,
  },
  {
    property: "twitter:title",
    content: title,
  },
  {
    name: "twitter:site",
    content: "@chicio86",
  },
  {
    name: "twitter:creator",
    content: "@chicio86",
  },
  {
    property: "article:publisher",
    content: "https://www.facebook.com/fabrizio.duroni",
  },
  {
    property: "fb:app_id",
    content: "443203399348229",
  },
  {
    property: "og:type",
    content: ogPageType,
  },
  {
    name: "msapplication-config",
    content: "browserconfig.xml",
  },
  {
    name: "msapplication-TileColor",
    content: "#303f9f",
  },
  {
    name: "msapplication-TileImage",
    content: `/mstile-144x144.png`,
  },
];
