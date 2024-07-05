import { graphql, useStaticQuery } from "gatsby";
import { Head } from "../../head";
import { OgPageType } from "../../../logic/seo";
import { ContainerFullscreen } from "../atoms/container-fullscreen";
import { DownArrow } from "../molecules/down-arrow";
import { CurrentLocation } from "../../../logic/current-location";
import loadable from "@loadable/component";
import { ThemePage } from "./theme-page";
import { DefaultTheme } from "styled-components";
import { FC, ReactNode } from "react";

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
  keywords?: ReadonlyArray<string | null>;
  children?: ReactNode;
}

export const ShowcasePageTemplate: FC<ShowcasePageProps> = ({
  children,
  location,
  theme,
  fullScreenComponent,
  trackingCategory,
  ogPageType,
  title,
  featuredImage,
  cookieConsentColor,
  keywords,
}) => {
  const data = useStaticQuery<Queries.ShowcasePageQuery>(graphql`
    query ShowcasePage {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

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
        keywords={keywords}
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
