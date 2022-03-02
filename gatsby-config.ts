import { GatsbyConfig } from "gatsby";

require("dotenv").config();

const config: GatsbyConfig = {
  siteMetadata: {
    title:
      "Fabrizio Duroni | Fabrizio Duroni ‘Chicio Coding’ official site with profile details. Official blog chicio coding. Main skills: mobile application development, computer graphics, web development.",
    siteUrl: "https://www.fabrizioduroni.it",
    featuredImage: "/chicio-coding-feature-graphic.jpg",
    featuredArtImage: "/chicio-art-featured.png",
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
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-97399890-1", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Chicio Coding",
        short_name: "Chicio",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: `any maskable`,
        },
        start_url:
          "/?utm_source=pwa&utm_medium=application&utm_campaign=entry-point",
        display: "standalone",
        background_color: "#303F9F",
        theme_color: "#303F9F",
        orientation: "portrait",
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/blog/`],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: "100%",
              height: "auto",
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1140,
              showCaptions: true,
            },
          },
          {
            resolve: "gatsby-remark-emojis",
            options: {
              active: true,
              class: "emoji-icon",
              size: 64, // Select the size (available size: 16, 24, 32, 64)
              styles: {
                // Add custom styles
                display: "inline",
                margin: "0",
                position: "relative",
                width: "20px",
              },
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
              delimiters: [
                { left: "£$", right: "£$", display: true },
                { left: "$", right: "$", display: false },
              ],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: (query: any) => {
              return query.allMarkdownRemark.edges.map((edge: any) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: query.site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: query.site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Chicio coding",
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-loadable-components-ssr`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/logic/algolia"),
      },
    },
  ],
};

export default config;
