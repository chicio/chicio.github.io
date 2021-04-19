import * as React from "react";
import "../styles/style.home.scss";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { DownArrow } from "../components/design-system/molecules/down-arrow";
import { ProfilePresentation } from "../components/ProfilePresentation";
import { Technologies } from "../components/Technologies";
import { ProjectsAndCarrier } from "../components/ProjectsAndCarrier";
import { Head } from "../components/head";
import { HomePageQuery } from "../../graphql-types";
import { Page } from "../components/design-system/templates/page";

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
    <Page>
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
      {/*<Footer author={author} trackingCategory={tracking.category.home} />*/}
    </Page>
  );
};

export default HomePage;
