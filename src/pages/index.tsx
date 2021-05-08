import * as React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { DownArrow } from "../components/design-system/molecules/down-arrow";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { Head } from "../components/head";
import { HomePageQuery } from "../../graphql-types";
import { Page } from "../components/design-system/templates/page";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { BackgroundFullScreen } from "../components/background-fullscreen";
import loadable from "@loadable/component";

const BottomIndex = loadable(() => import(`../components/bottom-index`));

const Footer = loadable(
  () => import(`../components/design-system/organism/footer`)
);

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
        pageType={OgPageType.Person}
        imageUrl={featuredImage}
      />
      <ContainerFullscreen>
        <BackgroundFullScreen />
        <ProfilePresentation author={author} />
        <DownArrow />
      </ContainerFullscreen>
      <BottomIndex author={author} />
      <Footer author={author} trackingCategory={tracking.category.home} />
    </Page>
  );
};

export default HomePage;
