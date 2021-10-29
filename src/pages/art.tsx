import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { blogTheme } from "../components/design-system/theme";
import loadable from "@loadable/component";

const BottomArt = loadable(() => import(`../components/bottom-art`));

const Art: React.FC<PageProps<ArtQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const artImage = siteMetadata.featuredArtImage!;

  return (
    <ShowcasePageTemplate
      location={getCurrentLocationFrom(location)}
      theme={blogTheme}
      fullScreenComponent={<div>ciao</div>}
      trackingCategory={tracking.category.art}
      ogPageType={OgPageType.WebSite}
      title={"Chicio Art"}
      featuredImage={artImage}
    >
      <BottomArt author={author} images={data.allFile.edges} />
    </ShowcasePageTemplate>
  );
};

export default Art;

export const artQuery = graphql`
  query Art {
    site {
      siteMetadata {
        author
        featuredArtImage
      }
    }
    allFile(
      filter: {
        relativeDirectory: { eq: "art" }
        extension: { regex: "/(jpg)|(jpeg)|(png)/" }
      }
      sort: { fields: name, order: DESC }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          name
        }
      }
    }
  }
`;
