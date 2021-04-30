import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { HeadQuery } from "../../graphql-types";
import { createJsonLD, createMetaAttributes, OgPageType } from "../logic/seo";
import { primaryColorDark } from "./theme";

const cookieConsetCss = `
       .cc-window{opacity:1;transition:opacity 1s ease}.cc-window.cc-invisible{opacity:0}.cc-animate.cc-revoke{transition:transform 1s ease}.cc-animate.cc-revoke.cc-top{transform:translateY(-2em)}.cc-animate.cc-revoke.cc-bottom{transform:translateY(2em)}.cc-animate.cc-revoke.cc-active.cc-bottom,.cc-animate.cc-revoke.cc-active.cc-top,.cc-revoke:hover{transform:translateY(0)}.cc-grower{max-height:0;overflow:hidden;transition:max-height 1s}
.cc-link,.cc-revoke:hover{text-decoration:none}.cc-revoke,.cc-window{position:fixed;overflow:hidden;box-sizing:border-box;font-family:Helvetica,Calibri,Arial,sans-serif;font-size:16px;line-height:1.5em;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;z-index:9999}.cc-window.cc-static{position:static}.cc-window.cc-floating{padding:2em;max-width:24em;-ms-flex-direction:column;flex-direction:column}.cc-window.cc-banner{padding:1em 1.8em;width:100%;-ms-flex-direction:row;flex-direction:row}.cc-revoke{padding:.5em}.cc-header{font-size:18px;font-weight:700}.cc-btn,.cc-close,.cc-link,.cc-revoke{cursor:pointer}.cc-link{opacity:.8;display:inline-block;padding:.2em}.cc-link:hover{opacity:1}.cc-link:active,.cc-link:visited{color:initial}.cc-btn{display:block;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap}.cc-banner .cc-btn:last-child{min-width:140px}.cc-highlight .cc-btn:first-child{background-color:transparent;border-color:transparent}.cc-highlight .cc-btn:first-child:focus,.cc-highlight .cc-btn:first-child:hover{background-color:transparent;text-decoration:underline}.cc-close{display:block;position:absolute;top:.5em;right:.5em;font-size:1.6em;opacity:.9;line-height:.75}.cc-close:focus,.cc-close:hover{opacity:1}
.cc-revoke.cc-top{top:0;left:3em;border-bottom-left-radius:.5em;border-bottom-right-radius:.5em}.cc-revoke.cc-bottom{bottom:0;left:3em;border-top-left-radius:.5em;border-top-right-radius:.5em}.cc-revoke.cc-left{left:3em;right:unset}.cc-revoke.cc-right{right:3em;left:unset}.cc-top{top:1em}.cc-left{left:1em}.cc-right{right:1em}.cc-bottom{bottom:1em}.cc-floating>.cc-link{margin-bottom:1em}.cc-floating .cc-message{display:block;margin-bottom:1em}.cc-window.cc-floating .cc-compliance{-ms-flex:1;flex:1}.cc-window.cc-banner{-ms-flex-align:center;align-items:center}.cc-banner.cc-top{left:0;right:0;top:0}.cc-banner.cc-bottom{left:0;right:0;bottom:0}.cc-banner .cc-message{-ms-flex:1;flex:1}.cc-compliance{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between}.cc-compliance>.cc-btn{-ms-flex:1;flex:1}.cc-btn+.cc-btn{margin-left:.5em}
@media print{.cc-revoke,.cc-window{display:none}}@media screen and (max-width:900px){.cc-btn{white-space:normal}}@media screen and (max-width:414px) and (orientation:portrait),screen and (max-width:736px) and (orientation:landscape){.cc-window.cc-top{top:0}.cc-window.cc-bottom{bottom:0}.cc-window.cc-banner,.cc-window.cc-left,.cc-window.cc-right{left:0;right:0}.cc-window.cc-banner{-ms-flex-direction:column;flex-direction:column}.cc-window.cc-banner .cc-compliance{-ms-flex:1;flex:1}.cc-window.cc-floating{max-width:none}.cc-window .cc-message{margin-bottom:1em}.cc-window.cc-banner{-ms-flex-align:unset;align-items:unset}}
.cc-floating.cc-theme-classic{padding:1.2em;border-radius:5px}.cc-floating.cc-type-info.cc-theme-classic .cc-compliance{text-align:center;display:inline;-ms-flex:none;flex:none}.cc-theme-classic .cc-btn{border-radius:4px}.cc-theme-classic .cc-btn:last-child{min-width:140px}.cc-floating.cc-type-info.cc-theme-classic .cc-btn{display:inline-block}
.cc-theme-edgeless.cc-window{padding:0}.cc-floating.cc-theme-edgeless .cc-message{margin:2em 2em 1.5em}.cc-banner.cc-theme-edgeless .cc-btn{margin:0;padding:.8em 1.8em;height:100%}.cc-banner.cc-theme-edgeless .cc-message{margin-left:1em}.cc-floating.cc-theme-edgeless .cc-btn+.cc-btn{margin-left:0}
    `;

const cookieConsentScript = `
if (typeof window !== "undefined") {
  window.addEventListener('load', () => { 
       window.cookieconsent.initialise({
                      palette: {
                          popup: {
                              background: '${primaryColorDark}',
                              text: '#ffffff'
                          },
                          button: {
                              background: '#0F67FF',
                              text: '#ffffff'
                          }
                      },
                      theme: 'classic',
                      content: {
                          dismiss: 'Ok',
                          href: window.location.protocol + '//' + window.location.host + '/cookie-policy/',
                          message: 'This website uses cookies to ensure you get the best experience.',
                          link: 'Learn more about cookie policy'
                      }
       });
  });
} else {
  console.log("no cookieconsent");
}      
`;

interface HeadProps {
  url: string;
  pageType: OgPageType;
  imageUrl: string;
  customTitle?: string;
  date?: string;
  description?: string;
}

export const Head: React.FC<HeadProps> = ({
  url,
  pageType,
  imageUrl,
  customTitle,
  date,
  description,
}) => {
  const data = useStaticQuery<HeadQuery>(
    graphql`
      query Head {
        site {
          siteMetadata {
            author
            title
            contacts {
              links {
                twitter
                facebook
                linkedin
                github
                medium
                devto
                instagram
              }
            }
          }
        }
      }
    `
  );

  const siteMetadata = data.site!.siteMetadata!;
  const title = customTitle ? customTitle : siteMetadata.title!;
  const author = siteMetadata.author!;
  const links = siteMetadata.contacts!.links!;

  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: "en" }}
      meta={createMetaAttributes(author, title, url, imageUrl, pageType)}
    >
      <link rel="canonical" href={url} />
      <link rel="author" href={"/humans.txt"} />
      <link
        rel="preload"
        href="/fonts/opensans/OpenSans-Regular.woff2"
        as="font"
        crossOrigin="anonymous"
      />
      <script
        type={"text/javascript"}
        defer
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        data-cfasync="false"
      />
      <style type="text/css">{cookieConsetCss}</style>
      <script type={"text/javascript"}>{cookieConsentScript}</script>
      <script type="application/ld+json">
        {createJsonLD(
          pageType,
          url,
          imageUrl,
          author,
          title,
          links,
          description,
          date
        )}
      </script>
    </Helmet>
  );
};
