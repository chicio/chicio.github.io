import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import styled from "styled-components";
import { Container } from "../components/design-system/atoms/container";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { Gallery } from "../components/design-system/organism/gallery";

const ArtDescription = styled(Paragraph)`
  margin-bottom: ${(props) => props.theme.spacing[6]};
`;

const ContentContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[4]};
  flex: 1 0 auto;
`;

const Art: React.FC<PageProps<ArtQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const artImage = siteMetadata.featuredArtImage!;

  return (
    <ShowcasePageTemplate
      location={getCurrentLocationFrom(location)}
      fullScreenComponent={<div>ciao</div>}
      trackingCategory={tracking.category.art}
      ogPageType={OgPageType.WebSite}
      title={"Chicio Art"}
      featuredImage={artImage}
    >
      <ContentContainer>
        <ArtDescription>
          {`Hi, I'm ${author}!!. During the last years I started learning to draw. This page is a
          collection of all the draws I created. You can consider it like an art
          gallery, where you can see my drawing skill growing more and more. I
          hope you will enjoy it and you will find something that you like.`}
        </ArtDescription>
        <Gallery images={data.allFile.edges} />
      </ContentContainer>
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
