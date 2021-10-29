import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { artTheme } from "../components/design-system/theme";
import loadable from "@loadable/component";
import { artPrimaryColor } from "../components/design-system/art-colors";
import styled from "styled-components";
import { opacity } from "../components/design-system/utils-css/opacity-keyframes";
// @ts-ignore
import ChicioArt from "../images/chicio-art.png";
// @ts-ignore
import Background from "../images/wall-bricks-violet.jpg";

const BottomArt = loadable(() => import(`../components/bottom-art`));

const ArtPresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  animation: ${opacity} 1s linear 0.5s;
  animation-fill-mode: forwards;
  margin: ${(props) => props.theme.spacing[4]};
  height: 50%;
`;

const LogoImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: url(${Background});
  width: 100%;
  height: 100%;
  z-index: -300;
`;

const Art: React.FC<PageProps<ArtQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const artImage = siteMetadata.featuredArtImage!;

  return (
    <ShowcasePageTemplate
      location={getCurrentLocationFrom(location)}
      theme={artTheme}
      fullScreenComponent={
        <ArtPresentationContainer>
          <BackgroundImage />
          <LogoImage src={ChicioArt} alt={"chicio art logo"} />
        </ArtPresentationContainer>
      }
      trackingCategory={tracking.category.art}
      ogPageType={OgPageType.WebSite}
      title={"Chicio Art"}
      featuredImage={artImage}
      cookieConsentColor={artPrimaryColor}
    >
      <BottomArt images={data.allFile.edges} />
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
