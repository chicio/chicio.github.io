import { SiteSiteMetadataContactsLinks } from "../../graphql-types";

export enum OgPageType {
  BlogPosting = "BlogPosting",
  WebSite = "WebSite",
  Person = "Person",
}

export const createMetaAttributes = (
  author: string,
  title: string,
  url: string,
  imageUrl: string,
  ogPageType: OgPageType,
  keywords: ReadonlyArray<string | null>,
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
  {
    name: "yandex-verification",
    content: "741cf901cb1dbdf5",
  },
  {
    name: "keywords",
    content: keywords.join(", "),
  },
];

export const createJsonLD = (
  ogPageType: OgPageType,
  url: string,
  imageUrl: string,
  author: string,
  title: string,
  links: Pick<
    SiteSiteMetadataContactsLinks,
    | "twitter"
    | "facebook"
    | "linkedin"
    | "github"
    | "medium"
    | "devto"
    | "instagram"
  >,
  keywords: ReadonlyArray<string | null>,
  description?: string,
  date?: string,
) => `{
        ${
          date
            ? `"datePublished":"${date}",
               "dateModified":"${date}", `
            : ""
        }
        "@type":"${ogPageType}",
        "url":"${url}",
        "image":"${imageUrl}",
        ${
          ogPageType === OgPageType.BlogPosting
            ? `"mainEntityOfPage":{\n"@type":"WebPage",\n"@id":"${url}"\n},`
            : ""
        }
        ${
          ogPageType !== OgPageType.Person
            ? `"author":{
          "@type":"Person",
          "name":"${author}"
        },`
            : ""
        }
        ${
          ogPageType !== OgPageType.Person
            ? `"publisher":{
          "@type":"Organization",
          "logo":{
            "@type":"ImageObject",
            "url":"${imageUrl}"
          },
          "name":"${author}"
        },`
            : ""
        }
        ${ogPageType === OgPageType.WebSite ? `"headline":"${author}",` : ""}
        ${
          ogPageType === OgPageType.BlogPosting
            ? `"headline":"${
                title.length > 110 ? title.substr(0, 110) : title
              }",`
            : ""
        }
        "description":"${
          ogPageType === OgPageType.BlogPosting ? description : title
        }",
        "sameAs":[
          "${links!.twitter}",
          "${links!.facebook}",
          "${links!.linkedin}",
          "${links!.github}"
        ],
        "name":"${author}",
        "@context":"https://schema.org"
        "keywords": [
          ${keywords.join(",")}   
        ]
      }`;
