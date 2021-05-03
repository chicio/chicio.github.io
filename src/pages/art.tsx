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

// https://www.imarketinx.de/artikel/responsive-image-gallery-with-css-grid.html

const GalleryContainer = styled(ContainerFluid)`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-gap: 20px;
  justify-items: center;
`;

const GalleryImageFrame = styled.figure`
  padding: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  background-color: #333;
  color: #d9d9d9;
`;

const GalleryImage = styled.img`
  height: auto;
  object-fit: cover;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
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
      <PageTitle>Fabrizio Duroni Art</PageTitle>
      <GalleryContainer>
        <GalleryImageFrame>
          <GalleryImage
            className="gallery-img"
            src="https://picsum.photos/230/300?random=1"
            alt="Image form https://picsum.photos"
            title="Image form https://picsum.photos"
          />
          <figcaption>Image Title</figcaption>
        </GalleryImageFrame>
        <GalleryImageFrame>
          <GalleryImage
            className="gallery-img"
            src="https://picsum.photos/230/300?random=1"
            alt="Image form https://picsum.photos"
            title="Image form https://picsum.photos"
          />
          <figcaption>Image Title</figcaption>
        </GalleryImageFrame>
        <GalleryImageFrame>
          <GalleryImage
            className="gallery-img"
            src="https://picsum.photos/230/300?random=1"
            alt="Image form https://picsum.photos"
            title="Image form https://picsum.photos"
          />
          <figcaption>Image Title</figcaption>
        </GalleryImageFrame>
        <GalleryImageFrame>
          <GalleryImage
            className="gallery-img"
            src="https://picsum.photos/230/300?random=1"
            alt="Image form https://picsum.photos"
            title="Image form https://picsum.photos"
          />
          <figcaption>Image Title</figcaption>
        </GalleryImageFrame>
        <GalleryImageFrame>
          <GalleryImage
            className="gallery-img"
            src="https://picsum.photos/230/300?random=1"
            alt="Image form https://picsum.photos"
            title="Image form https://picsum.photos"
          />
          <figcaption>Image Title</figcaption>
        </GalleryImageFrame>
      </GalleryContainer>
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
  }
`;
