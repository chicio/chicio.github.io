import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.cookiepolicy.scss";
import "@fontsource/open-sans";
import { Head } from "../components/Head";
import { Menu } from "../components/design-system/organism/menu";
import { tracking } from "../utils/tracking";
import { BlogHeader } from "../components/BlogHeader";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { Footer } from "../components/Footer";
import { CookiePolicyQuery } from "../../graphql-types";
import { Page } from "../components/design-system/templates/page";

const CookiePolicy: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<CookiePolicyQuery>(
    graphql`
      query CookiePolicy {
        site {
          siteMetadata {
            title
            author
            featuredImage
          }
        }
      }
    `
  );
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <Page>
      <Head
        url={location.href}
        pageType={"website"}
        imageUrl={`${location.protocol}//${location.host}/${featuredImage}`}
      />
      <Menu
        trackingCategory={tracking.category.cookie_policy}
        pathname={location.pathname}
      />
      <div className="container blog-posts">
        <BlogHeader trackingCategory={tracking.category.cookie_policy} />
        <div className="blog-main">
          <div className="blog-post">
            <h1>
              <strong>Cookies Policy</strong>
            </h1>
            <p>
              Last updated: (20th November 2017) Fabrizio Duroni uses cookies on
              "Fabrizio Duroni" (the "Service"). By using the Service, you
              consent to the use of cookies. My Cookies Policy explains what
              cookies are, how I use cookies, how third­parties I may partner
              with may use cookies on the Service, your choices regarding
              cookies and further information about cookies.
            </p>
            <h4>
              <strong>What are cookies</strong>
            </h4>
            <p>
              Cookies are small pieces of text sent by your web browser by a
              website you visit. A cookie file is stored in your web browser and
              allows the Service or a third­party to recognize you and make your
              next visit easier and the Service more useful to you. Cookies can
              be "persistent" or "session" cookies.
            </p>
            <h4>
              <strong>How "Fabrizio Duroni" uses cookies</strong>
            </h4>
            <p>
              When you use and access the Service, I may place a number of
              cookies files in your web browser. I use cookies for the following
              purposes: to enable certain functions of the Service, to provide
              analytics, to store your preferences, to enable advertisements
              delivery, including behavioral advertising. I use both session and
              persistent cookies on the Service and I use different types of
              cookies to run the Service:
            </p>
            <ul>
              <li>
                Essential cookies. I may use essential cookies to authenticate
                users and prevent fraudulent use of user accounts.
              </li>
              <li>
                Advertising cookies. I may use essential cookies to deliver to
                the users advertisement.
              </li>
            </ul>
            <h4>
              <strong>Third­party cookies</strong>
            </h4>
            <p>
              In addition to our own cookies, I may also use various
              third­parties cookies to report usage statistics of the Service,
              deliver advertisements on and through the Service, and so on.
            </p>
            <h4>
              <strong>What are your choices regarding cookies</strong>
            </h4>
            <p>
              If you'd like to delete cookies or instruct your web browser to
              delete or refuse cookies, please visit the help pages of your web
              browser. Please note, however, that if you delete cookies or
              refuse to accept them, you might not be able to use all of the
              features I offer, you may not be able to store your preferences,
              and some of my pages might not display properly.
            </p>
            <h4>
              <strong>
                Where can your find more information about cookies
              </strong>
            </h4>
            <p>
              You can learn more about cookies and the following third­party
              websites:
            </p>
            <ul>
              <li>
                Cookies:{" "}
                <a href="https://en.wikipedia.org/wiki/HTTP_cookie">
                  https://en.wikipedia.org/wiki/HTTP_cookie
                </a>
              </li>
              <li>
                Network Advertising Initiative:{" "}
                <a href="https://www.networkadvertising.org/">
                  https://www.networkadvertising.org/
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer
        author={author}
        trackingCategory={tracking.category.cookie_policy}
        trackingLabel={tracking.label.footer}
      />
    </Page>
  );
};

export default CookiePolicy;
