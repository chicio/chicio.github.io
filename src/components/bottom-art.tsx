import { Gallery } from "./design-system/organism/gallery";
import styled from "styled-components";
import { mediaQuery } from "./design-system/utils-css/media-query";
import { Container } from "./design-system/atoms/container";
import { File, ImageSharp, Maybe } from "../../graphql-types";
import { ContainerFullscreen } from "./design-system/atoms/container-fullscreen";
import { Paragraph } from "./design-system/atoms/paragraph";
import { FC } from "react";

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

interface BottomArtProps {
  images: Array<{
    node: Pick<File, "name"> & {
      childImageSharp?: Maybe<Pick<ImageSharp, "gatsbyImageData">>;
    };
  }>;
}

const BottomArt: FC<BottomArtProps> = ({ images }) => (
  <>
    <>
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
        <Gallery images={images} />
      </ContentContainer>
    </>
  </>
);

export default BottomArt;
