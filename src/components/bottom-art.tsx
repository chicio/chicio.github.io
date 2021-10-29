import { Gallery } from "./design-system/organism/gallery";
import * as React from "react";
import styled from "styled-components";
import { ContainerFluid } from "./design-system/atoms/container-fluid";
import { mediaQuery } from "./design-system/utils-css/media-query";
import { Paragraph } from "./design-system/atoms/paragraph";
import { Container } from "./design-system/atoms/container";
import { File, ImageSharp, Maybe } from "../../graphql-types";

const ArtDescriptionContainer = styled(ContainerFluid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing[10]};
  background-color: ${(props) => props.theme.light.primaryColorDark};

  ${mediaQuery.minWidth.sm} {
    padding: ${(props) => props.theme.spacing[14]};
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const ArtDescription = styled(Paragraph)`
  text-align: center;
`;

const ContentContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[4]};
  flex: 1 0 auto;
`;

interface BottomArtProps {
  author: string;
  images: Array<{
    node: Pick<File, "name"> & {
      childImageSharp?: Maybe<Pick<ImageSharp, "gatsbyImageData">>;
    };
  }>;
}

const BottomArt: React.FC<BottomArtProps> = ({ author, images }) => (
  <>
    <>
      <ArtDescriptionContainer>
        <ArtDescription>
          {`Hi, I'm ${author}!! During the last years I started learning to draw. This is a consequence of my love for everything that is related to visual art/science (tattoo, computer graphics etc.). This page is a
          collection of all the draws I created. You can consider it like an art
          gallery, where you can see my drawing skill growing more and more. I
          hope you will enjoy it and you will find something that you like.`}
        </ArtDescription>
      </ArtDescriptionContainer>
      <ContentContainer>
        <Gallery images={images} />
      </ContentContainer>
    </>
  </>
);

export default BottomArt;
