import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { ArtQuery } from "../../graphql-types";
import { PageWithContent } from "../components/design-system/templates/page-with-content";
import { getCurrentLocationFrom } from "../logic/current-location";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import styled from "styled-components";
import { PageTitle } from "../components/design-system/molecules/page-title";
import { ContainerFluid } from "../components/design-system/atoms/container-fluid";
import { GatsbyImage, getSrc, IGatsbyImageData } from "gatsby-plugin-image";
import { useState } from "react";

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
  background-color: #333;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
  width: 600px;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
`;

const Art: React.FC<PageProps<ArtQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;
  const [currentImage, setCurrentImage] = useState<IGatsbyImageData | null>(
    null
  );

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
      <PageTitle>My drawings</PageTitle>
      <GalleryContainer>
        {data.allFile.edges.map((image) => (
          <GalleryImageFrame key={image.node.name}>
            <GalleryImage
              alt={image.node.name}
              image={image.node.childImageSharp!.gatsbyImageData!}
              onClick={() =>
                setCurrentImage(image.node.childImageSharp!.gatsbyImageData!)
              }
            />
          </GalleryImageFrame>
        ))}
      </GalleryContainer>
      {currentImage && (
        <>
          <ModalOverlay onClick={() => setCurrentImage(null)} />
          <Modal>
            <img
              style={{ width: "100%", height: "auto" }}
              src={getSrc(currentImage)}
            />
          </Modal>
        </>
      )}
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
