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
          style={{ position: "absolute", top: 0, left: 0 }}
          options={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 6,
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
                value: 5,
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
