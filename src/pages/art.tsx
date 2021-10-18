import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { PageWithContent } from "../components/design-system/templates/page-with-content";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { Gallery } from "../components/design-system/organism/gallery";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const ArtDescription = styled(Paragraph)`
  margin-bottom: ${(props) => props.theme.spacing[6]};
`;

const ArtLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${(props) => props.theme.spacing[8]}
    ${(props) => props.theme.spacing[2]} ${(props) => props.theme.spacing[6]};
`;

const Art: React.FC<PageProps<ArtQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <PageWithContent
      location={getCurrentLocationFrom(location)}
      author={author}
      ogPageType={OgPageType.WebSite}
      ogImage={featuredImage}
      trackingCategory={tracking.category.art}
      customTitle={"Fabrizio Duroni art gallery"}
      description={"Fabrizio Duroni art gallery"}
    >
      <ArtLogoContainer>
        <StaticImage
          src={"https://via.placeholder.com/700x500"}
          alt={"Chicio Art Logo"}
        />
      </ArtLogoContainer>
      <ArtDescription>
        During the last years I started learning to draw. This page is a
        collection of all the draws I created. You can consider it like an art
        gallery, where you can see my drawing skill growing more and more. I
        hope you will enjoy it and you will find something that you like.
      </ArtDescription>
      <Gallery images={data.allFile.edges} />
    </PageWithContent>
  );
};

export default Art;

export const artQuery = graphql`
  query Art {
    site {
      siteMetadata {
        title
        author
        featuredImage
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
