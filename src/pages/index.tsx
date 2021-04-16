import * as React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.home.scss";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { config } from "@fortawesome/fontawesome-svg-core";
import { DownArrow } from "../components/DownArrow";
import { ProfilePresentation } from "../components/ProfilePresentation";
import { Technologies } from "../components/Technologies";
import { ProjectsAndCarrier } from "../components/ProjectsAndCarrier";
import { Footer } from "../components/Footer";
import { tracking } from "../utils/tracking";
import { Head } from "../components/Head";
import { HomePageQuery } from "../../graphql-types";

config.autoAddCss = false; //https://github.com/FortAwesome/react-fontawesome/issues/134

const HomePage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<HomePageQuery>(
    graphql`
      query HomePage {
        site {
          siteMetadata {
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
    <main>
      <Head
        url={location.href}
        pageType={"profile"}
        imageUrl={`/${featuredImage}`}
      />
      <div
        id="profile-introduction"
        className="container-fluid profile-introduction"
      >
        <ProfilePresentation author={author} />
        <DownArrow />
      </div>
      <Technologies author={author} />
      <ProjectsAndCarrier />
      <Footer
        author={author}
        trackingCategory={tracking.category.home}
        trackingLabel={tracking.label.footer}
      />
    </main>
  );
};

export default HomePage;
