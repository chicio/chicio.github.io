import React, { useState } from "react";
import { GatsbyImage, getSrc, IGatsbyImageData } from "gatsby-plugin-image";
import { artDescriptions } from "../../../logic/art";
import { ModalWithImage } from "./modal-with-image";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { Paragraph } from "../atoms/paragraph";
import { File, ImageSharp, Maybe } from "../../../../graphql-types";

const GalleryContainer = styled(ContainerFluid)`
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spacing[7]};
  display: grid;
  align-items: center;
  justify-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media (min-width: 992px) {
    grid-column-gap: 20px;
    grid-row-gap: 40px;
  }
`;

const GalleryImageFrame = styled.figure`
  padding: ${(props) => props.theme.spacing[2]};
  margin: 0;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};

  @media (prefers-color-scheme: dark) {
    background: ${(props) => props.theme.dark.generalBackgroundLight};
  }
`;

const GalleryImageDescription = styled(Paragraph)`
  width: 250px;
  height: 55px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GalleryImage = styled(GatsbyImage)`
  height: auto;
  width: 250px;
  object-fit: cover;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

interface GalleryProps {
  images: Array<{
    node: Pick<File, "name"> & {
      childImageSharp?: Maybe<Pick<ImageSharp, "gatsbyImageData">>;
    };
  }>;
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<IGatsbyImageData | null>(
    null
  );

  return (
    <>
      <GalleryContainer>
        {images.map((image) => (
          <GalleryImageFrame key={image.node.name}>
            <GalleryImage
              alt={image.node.name}
              image={image.node.childImageSharp!.gatsbyImageData!}
              onClick={() =>
                setCurrentImage(image.node.childImageSharp!.gatsbyImageData!)
              }
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
          onClick={() => setCurrentImage(null)}
        />
      )}
    </>
  );
};

// [{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-30.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-30.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-30.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-30"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-29.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-29.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-29.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-29"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-28.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-28.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-28.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-28"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-27.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-27.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-27.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-27"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-26.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-26.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-26.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-26"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-25.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-25.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-25.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-25"}},{"node":{"childImageSharp":{"gatsbyImageData":{"layout":"fullWidth","backgroundColor":"#b8a888","images":{"fallback":{"src":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-24.jpg","srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/e3115/2021-03-24.jpg 640w","sizes":"100vw"},"sources":[{"srcSet":"/static/d3746394c1a8e0a5067cd1f090a5a9b8/8ffad/2021-03-24.webp 640w","type":"image/webp","sizes":"100vw"}]},"width":1,"height":1.25}},"name":"2021-03-24"}}]
