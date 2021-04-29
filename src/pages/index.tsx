import * as React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { DownArrow } from "../components/design-system/molecules/down-arrow";
import { ProfilePresentation } from "../components/design-system/organism/profile-presentation";
import { Technologies } from "../components/design-system/organism/technologies";
import { Resume } from "../components/design-system/organism/resume";
import { Head } from "../components/head";
import { HomePageQuery } from "../../graphql-types";
import { Page } from "../components/design-system/templates/page";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { Footer } from "../components/design-system/organism/footer";
import { tracking } from "../logic/tracking";
import { OgPageType } from "../logic/seo";
import Particles from "react-tsparticles";
import { textAbovePrimaryColor } from "../components/theme";

const HomePage: React.FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<HomePageQuery>(
    graphql`
      query HomePage {
        site {
          siteMetadata {
            author
            featuredImage
          }
        }
      }
    `
  );

  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <Page>
      <Head
        url={location.href}
        pageType={OgPageType.Person}
        imageUrl={`/${featuredImage}`}
      />
      <ContainerFullscreen>
        <Particles
          id="tsparticles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 300,
                  duration: 0.5,
                },
              },
            },
            particles: {
              color: {
                value: textAbovePrimaryColor,
              },
              links: {
                enable: true,
                color: textAbovePrimaryColor,
                blink: true,
                distance: 200,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
                mode: "bounce",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 3,
              },
            },
            detectRetina: true,
          }}
        />
        <ProfilePresentation author={author} />
        <DownArrow />
      </ContainerFullscreen>
      <Technologies author={author} />
      <Resume />
      <Footer author={author} trackingCategory={tracking.category.home} />
    </Page>
  );
};

export default HomePage;
