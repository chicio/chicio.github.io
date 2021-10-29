import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { PageTitle } from "../components/design-system/molecules/page-title";
import { Gallery } from "../components/design-system/organism/gallery";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import styled from "styled-components";
import { Page } from "../components/design-system/templates/page";
import { Head } from "../components/head";
import { Container } from "../components/design-system/atoms/container";
import Footer from "../components/design-system/organism/footer";

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
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <Page>
      <Head
        url={getCurrentLocationFrom(location).url}
        pageType={OgPageType.WebSite}
        imageUrl={featuredImage}
        customTitle={"Fabrizio Duroni art gallery"}
        description={"Fabrizio Duroni art gallery"}
      />
      <ContentContainer>
        <PageTitle>My drawings</PageTitle>
        <ArtDescription>
          During the last years I started learning to draw. This page is a
          collection of all the draws I created. You can consider it like an art
          gallery, where you can see my drawing skill growing more and more. I
          hope you will enjoy it and you will find something that you like.
        </ArtDescription>
        <Gallery images={data.allFile.edges} />
      </ContentContainer>
      <Footer author={author} trackingCategory={tracking.category.art} />
    </Page>
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
