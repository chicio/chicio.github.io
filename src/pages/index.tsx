import { graphql, PageProps, useStaticQuery } from "gatsby";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { BackgroundFullScreen } from "../components/background-fullscreen";
import loadable from "@loadable/component";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { getCurrentLocationFrom } from "../logic/current-location";
import { blogTheme } from "../components/design-system/theme";
import { blogPrimaryColor } from "../components/design-system/blog-colors";
import { FC } from "react";

const BottomIndex = loadable(() => import(`../components/bottom-index`));

const HomePage: FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<Queries.HomePageQuery>(graphql`
    query HomePage {
      site {
        siteMetadata {
          author
          featuredImage
        }
      }
    }
  `);
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

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
      cookieConsentColor={blogPrimaryColor}
    >
      <BottomIndex author={author} />
    </ShowcasePageTemplate>
  );
};

export default HomePage;
