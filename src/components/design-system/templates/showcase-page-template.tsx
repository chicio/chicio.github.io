import { graphql, useStaticQuery } from "gatsby";
import { ShowcasePageQuery } from "../../../../graphql-types";
import { Page } from "./page";
import { Head } from "../../head";
import { OgPageType } from "../../../logic/seo";
import { ContainerFullscreen } from "../atoms/container-fullscreen";
import { DownArrow } from "../molecules/down-arrow";
import * as React from "react";
import { CurrentLocation } from "../../../logic/current-location";
import loadable from "@loadable/component";

const Footer = loadable(() => import(`..//organism/footer`));

interface ShowcasePageProps {
  location: CurrentLocation;
  fullScreenComponent: React.ReactElement;
  trackingCategory: string;
  ogPageType: OgPageType;
  title?: string;
  featuredImage: string;
}

export const ShowcasePageTemplate: React.FC<ShowcasePageProps> = ({
  children,
  location,
  fullScreenComponent,
  trackingCategory,
  ogPageType,
  title,
  featuredImage,
}) => {
  const data = useStaticQuery<ShowcasePageQuery>(
    graphql`
      query ShowcasePage {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );

  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;

  return (
    <Page>
      <Head
        url={location.url}
        pageType={ogPageType}
        imageUrl={featuredImage}
        customTitle={title}
      />
      <ContainerFullscreen>
        {fullScreenComponent}
        <DownArrow />
      </ContainerFullscreen>
      {children}
      <Footer author={author} trackingCategory={trackingCategory} />
    </Page>
  );
};
