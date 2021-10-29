import * as React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { HomePageQuery } from "../../graphql-types";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { BackgroundFullScreen } from "../components/background-fullscreen";
import loadable from "@loadable/component";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { getCurrentLocationFrom } from "../logic/current-location";
import { blogTheme } from "../components/design-system/theme";

const BottomIndex = loadable(() => import(`../components/bottom-index`));

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
  const siteMetada = data.site!.siteMetadata!;
  const author = siteMetada.author!;
  const featuredImage = siteMetada.featuredImage!;

  return (
    <ShowcasePageTemplate
      location={getCurrentLocationFrom(location)}
      theme={blogTheme}
      fullScreenComponent={
        <>
          <BackgroundFullScreen />
          <ProfilePresentation author={author} />
        </>
      }
      trackingCategory={tracking.category.home}
      ogPageType={OgPageType.Person}
      featuredImage={featuredImage}
    >
      <BottomIndex author={author} />
    </ShowcasePageTemplate>
  );
};

export default HomePage;
