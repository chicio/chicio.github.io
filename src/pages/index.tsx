import { graphql, PageProps, useStaticQuery } from "gatsby";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { getCurrentLocationFrom } from "../logic/current-location";
import { blogTheme } from "../components/design-system/themes/theme";
import { blogPrimaryColor } from "../components/design-system/themes/blog-colors";
import { FC } from "react";
import { Technologies } from "../components/design-system/organism/technologies";
import { Resume } from "../components/design-system/organism/resume";

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
      fullScreenComponent={<ProfilePresentation author={author} />}
      trackingCategory={tracking.category.home}
      ogPageType={OgPageType.Person}
      featuredImage={featuredImage}
      cookieConsentColor={blogPrimaryColor}
    >
      <Technologies author={author} />
      <Resume />
    </ShowcasePageTemplate>
  );
};

export default HomePage;
