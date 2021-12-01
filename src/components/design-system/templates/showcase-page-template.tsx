import { graphql, useStaticQuery } from "gatsby";
import { ShowcasePageQuery } from "../../../../graphql-types";
import { Head } from "../../head";
import { OgPageType } from "../../../logic/seo";
import { ContainerFullscreen } from "../atoms/container-fullscreen";
import { DownArrow } from "../molecules/down-arrow";
import * as React from "react";
import { CurrentLocation } from "../../../logic/current-location";
import loadable from "@loadable/component";
import { ThemePage } from "./theme-page";
import { DefaultTheme } from "styled-components";

const Footer = loadable(() => import(`..//organism/footer`));

interface ShowcasePageProps {
  location: CurrentLocation;
  theme: DefaultTheme;
  fullScreenComponent: React.ReactElement;
  trackingCategory: string;
  ogPageType: OgPageType;
  title?: string;
  featuredImage: string;
  cookieConsentColor: string;
}

export const ShowcasePageTemplate: React.FC<ShowcasePageProps> = ({
  children,
  location,
  theme,
  fullScreenComponent,
  trackingCategory,
  ogPageType,
  title,
  featuredImage,
  cookieConsentColor,
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
    <ThemePage theme={theme}>
      <Head
        url={location.url}
        pageType={ogPageType}
        imageUrl={featuredImage}
        customTitle={title}
        cookieConsentColor={cookieConsentColor}
      />
      <ContainerFullscreen>
        {fullScreenComponent}
        <DownArrow />
      </ContainerFullscreen>
      {children}
      <Footer author={author} trackingCategory={trackingCategory} />
    </ThemePage>
  );
};