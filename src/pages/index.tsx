import * as React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { HomePageQuery } from "../../graphql-types";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { BackgroundFullScreen } from "../components/background-fullscreen";
import loadable from "@loadable/component";
import { ShowcasePage } from "../components/design-system/templates/showcase-page";
import { getCurrentLocationFrom } from "../logic/current-location";

const BottomIndex = loadable(() => import(`../components/bottom-index`));

const HomePage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<HomePageQuery>(
    graphql`
      query HomePage {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );
  const author = data.site!.siteMetadata!.author!;

  return (
    <ShowcasePage
      location={getCurrentLocationFrom(location)}
      fullScreenComponent={
        <ContainerFullscreen>
          <BackgroundFullScreen />
          <ProfilePresentation author={author} />
        </ContainerFullscreen>
      }
      trackingCategory={tracking.category.home}
      ogPageType={OgPageType.Person}
    >
      <BottomIndex author={author} />
    </ShowcasePage>
  );
};

export default HomePage;
