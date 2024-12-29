import { graphql, PageProps } from "gatsby";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import { ShowcasePageTemplate } from "../components/design-system/templates/showcase-page-template";
import { artTheme } from "../components/design-system/themes/theme";
import { artPrimaryColor } from "../components/design-system/themes/art-colors";
import styled from "styled-components";
import { opacity } from "../components/design-system/utils-css/opacity-keyframes";
// @ts-ignore
import ChicioArt from "../images/chicio-art.png";
// @ts-ignore
import Background from "../images/wall-bricks-violet.jpg";
import { FC } from "react";
import { Gallery } from "../components/design-system/organism/gallery";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { mediaQuery } from "../components/design-system/utils-css/media-query";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import { Container } from "../components/design-system/atoms/container";

const ArtDescriptionContainer = styled(ContainerFullscreen)`
  padding: ${(props) => props.theme.spacing[10]};

  ${mediaQuery.minWidth.sm} {
    padding: ${(props) => props.theme.spacing[14]};
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const ArtDescription = styled(Paragraph)`
  text-align: center;
  font-style: italic;
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin: ${(props) => props.theme.spacing[4]};
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${mediaQuery.minWidth.xs} {
    font-size: ${(props) => props.theme.fontSizes[6]};
    margin: ${(props) => props.theme.spacing[8]};
  }

  ${mediaQuery.minWidth.sm} {
    font-size: ${(props) => props.theme.fontSizes[10]};
  }
`;

const ContentContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[8]};
  flex: 1 0 auto;
`;
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
  height: 100vh;
  min-height: 100vh;
  z-index: -300;
`;

const Art: FC<PageProps<Queries.ArtQuery>> = ({ data, location }) => {
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
      keywords={["art", "drawing", "fabrizio duroni", "tattoo"]}
    >
      <ArtDescriptionContainer>
        <ArtDescription>
          {`...My love for everything that is related to visual 👨‍🎨 art/science 👨‍🔬 (tattoo, computer graphics etc.) took me to create this page.`}
        </ArtDescription>
        <ArtDescription>
          {` A
          collection of all the draws I created while I'm learning to draw. Keep it in your bookmark to see my drawing skills evolution 🎨 (or follow me on instagram ❤️)...`}
        </ArtDescription>
      </ArtDescriptionContainer>
      <ContentContainer>
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
      sort: { name: DESC }
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
