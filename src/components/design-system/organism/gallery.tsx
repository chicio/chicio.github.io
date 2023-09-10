import { FC, useState } from "react";
import { GatsbyImage, getSrc, IGatsbyImageData } from "gatsby-plugin-image";
import { artDescriptions } from "../../../logic/art";
import { ModalWithImage } from "./modal-with-image";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { Paragraph } from "../atoms/paragraph";
import { mediaQuery } from "../utils-css/media-query";

const GalleryContainer = styled(ContainerFluid)`
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spacing[7]};
  display: grid;
  align-items: center;
  justify-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const GalleryImageFrame = styled.figure`
  padding: ${(props) => props.theme.spacing[1]};
  margin: 0;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  box-shadow: 0 3px 10px 0 ${(props) => props.theme.light.boxShadowLight};

  ${mediaQuery.minWidth.md} {
    ${mediaQuery.inputDevice.mouse} {
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.025);
      }
    }
  }

  ${mediaQuery.dark} {
    background: ${(props) => props.theme.dark.generalBackgroundLight};
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.dark.boxShadowLight};
  }
`;

const GalleryImageDescription = styled(Paragraph)`
  width: 280px;
  height: 55px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0;
  margin-right: 0;
`;

const GalleryImage = styled(GatsbyImage)`
  width: 280px;
  height: 280px;
  object-fit: cover;

  ${mediaQuery.minWidth.md} {
    ${mediaQuery.inputDevice.mouse} {
      transition: opacity 0.25s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export interface GalleryProps {
  images: ReadonlyArray<{
    readonly node: {
      readonly name: string;
      readonly childImageSharp: {
        readonly gatsbyImageData: IGatsbyImageData;
      } | null;
    };
  }>;
}

export const Gallery: FC<GalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<IGatsbyImageData | null>(
    null,
  );

  return (
    <>
      <GalleryContainer>
        {images.map((image) => (
          <GalleryImageFrame
            key={image.node.name}
            onClick={() =>
              setCurrentImage(image.node.childImageSharp!.gatsbyImageData!)
            }
          >
            <GalleryImage
              alt={image.node.name}
              image={image.node.childImageSharp!.gatsbyImageData!}
            />
            <GalleryImageDescription>
              {artDescriptions[image.node.name]}
            </GalleryImageDescription>
          </GalleryImageFrame>
        ))}
      </GalleryContainer>
      {currentImage && (
        <ModalWithImage
          imageUrl={getSrc(currentImage)!}
          imageAlt={"Modal Image"}
          onClick={() => setCurrentImage(null)}
        />
      )}
    </>
  );
};
