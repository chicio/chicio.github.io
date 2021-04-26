import { StaticImage } from "gatsby-plugin-image";
import { Paragraph } from "../atoms/paragraph";
import { StandardExternalLink } from "../atoms/standard-external-link";
import { List } from "../atoms/list";
import { tracking } from "../../../logic/tracking";
import { Project } from "../molecules/project";
import React from "react";

const SpectralClaraLuxTracer: React.FC = () => (
  <Project
    reverse={false}
    name={"Spectral Clara Lux Tracer"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/spectral-clara-lux-tracer.jpg"}
        alt={"spectral clara lux tracer"}
      />
    }
    description={
      <>
        <Paragraph>
          Physically based ray tracer with multiple shading models support and
          Color Rendering Index (CRI) evaluation. Project developed for my
          master degree thesis at{" "}
          <StandardExternalLink
            href="https://www.disco.unimib.it"
            className="project-info-link"
          >
            University Milano-Bicocca
          </StandardExternalLink>{" "}
          -
          <StandardExternalLink
            href="http://www.ivl.disco.unimib.it"
            className="project-info-link"
          >
            Imaging and Vision Laboratory
          </StandardExternalLink>
          .
        </Paragraph>
        <List className="project-features">
          <li>Computer graphics</li>
          <li>Ray-tracing</li>
          <li>Physically based rendering</li>
          <li>Color calculation using spectral data</li>
          <li>Color Rendering index calculation</li>
          <li>iOS, macOS, Windows</li>
          <li>Objective-C, C++</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_sclt_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/Spectral-Clara-Lux-Tracer",
      },
      {
        label: "Thesis",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_sclt_thesis,
        trackingLabel: tracking.label.body,
        link:
          "https://drive.google.com/file/d/0BxeVnHLvT8-7dkxQRjV6M29TeUk/view",
      },
    ]}
  />
);

const SpectralBRDFExplorer: React.FC = () => (
  <Project
    reverse={true}
    name={"Spectral BRDF Explorer"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/spectral-brdf-explorer.png"}
        alt={"Spectral BRDF Explorer"}
      />
    }
    description={
      <>
        <Paragraph>
          OpenGL ES application inspired by
          <StandardExternalLink href="https://github.com/wdas/brdf">
            Walt Animation Disney Studios BRDF Viewer
          </StandardExternalLink>
          . A simple application that shows some of the most famous lighting
          model used in computer graphics and that supports color calculation
          using RGB and spectral data of lights and object surfaces.
        </Paragraph>
        <List>
          <li>Computer graphics</li>
          <li>OpenGL ES</li>
          <li>Color calculation using spectral data</li>
          <li>iOS, Android</li>
          <li>Objective-C, Java, C++</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_spectral_brdf_explorer_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/Spectral-BRDF-Explorer",
      },
    ]}
  />
);

const ID3TagEditor: React.FC = () => (
  <Project
    reverse={false}
    name={"ID3TagEditor"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/id3tageditor.jpg"}
        alt={"ID3TagEditor"}
      />
    }
    description={
      <>
        <Paragraph>
          A Swift library to read and modify ID3 Tag of any mp3 file. Supported
          ID3 tag version: 2.2. and 2.3. Listed in the implementations section
          of the{" "}
          <StandardExternalLink
            className="project-info-link"
            href="http://id3.org/Implementations"
          >
            official ID3 standard website id3.org
          </StandardExternalLink>
          . It supports the following platforms:
        </Paragraph>
        <List className="project-features">
          <li>iOS</li>
          <li>macOS</li>
          <li>tvOS</li>
          <li>watchOS</li>
          <li>Linux</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_id3tageditor_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/ID3TagEditor",
      },
    ]}
  />
);

const TabBarUIAction: React.FC = () => (
  <Project
    reverse={true}
    name={"TabBarUIAction"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/tabbaruiaction.png"}
        alt={"TabBarUIAction"}
      />
    }
    description={
      <>
        <Paragraph>
          A SwiftUI custom TabBar view with action button for modal content
          display. Fully compatible with Mac Catalyst. Available as a standalone
          framework, a SwiftPM package and as a Cocoapods pod. Its main feature
          are:
        </Paragraph>
        <List>
          <li>customizable tab item</li>
          <li>custom central tab item action to show modal screens</li>
          <li>supported platform: iOS, iPadOS and macOS</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_tabbaruiaction_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/TabBarUIAction",
      },
      {
        label: "Docs",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_tabbaruiaction_doc,
        trackingLabel: tracking.label.body,
        link: "https://tabbaruiaction.fabrizioduroni.it",
      },
    ]}
  />
);

const Mp3Id3Tagger: React.FC = () => (
  <Project
    reverse={false}
    name={"Mp3ID3Tagger"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/mp3id3tagger.jpg"}
        alt={"ID3TagEditor"}
      />
    }
    description={
      <>
        <Paragraph>
          A macOS application to edit the ID3 tag of your mp3 files.
          Mp3ID3Tagger supports the following ID3 tag versions: 2.2. and 2.3. It
          will let you modify the following information inside the ID3 tag of
          you mp3 files:
        </Paragraph>
        <List className="project-features">
          <li>version of the tag</li>
          <li>title</li>
          <li>artist</li>
          <li>album</li>
          <li>year</li>
          <li>track position</li>
          <li>genre</li>
          <li>attached picture set as Front cover</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_mp3id3tagger_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/Mp3ID3Tagger",
      },
      {
        label: "Download",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_mp3id3tagger_github,
        trackingLabel: tracking.label.body,
        link:
          "https://github.com/chicio/Mp3ID3Tagger/raw/master/Release/Mp3ID3Tagger.dmg",
      },
    ]}
  />
);

const RangeUISlider: React.FC = () => (
  <Project
    reverse={true}
    name={"RangeUISlider"}
    image={
      <StaticImage
        width={500}
        height={500}
        src={"../../../images/projects/range-ui-slider.png"}
        alt={"RangeUISlider"}
      />
    }
    description={
      <>
        <Paragraph>
          A highly customizable iOS range selection slider, developed using
          autolayout and completely customizable using IBDesignabled and
          IBInspectable. Distributed as a custom framework and with{" "}
          <StandardExternalLink href="https://cocoapods.org/pods/RangeUISlider">
            cocoapods
          </StandardExternalLink>
          .
        </Paragraph>
        <List>
          <li>Cocoa Touch</li>
          <li>Custom UI Component</li>
          <li>Autolayout</li>
          <li>IBDesignable</li>
          <li>IBInspectable</li>
          <li>iOS</li>
          <li>Swift</li>
        </List>
      </>
    }
    callToActions={[
      {
        label: "Github",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_rangeuislider_github,
        trackingLabel: tracking.label.body,
        link: "https://github.com/chicio/RangeUISlider",
      },
      {
        label: "Docs",
        trackingCategory: tracking.category.home,
        trackingAction: tracking.action.open_rangeuislider_doc,
        trackingLabel: tracking.label.body,
        link: "https://rangeuislider.fabrizioduroni.it",
      },
    ]}
  />
);

export const Projects: React.FC = () => (
  <>
    <SpectralClaraLuxTracer />
    <SpectralBRDFExplorer />
    <ID3TagEditor />
    <TabBarUIAction />
    <Mp3Id3Tagger />
    <RangeUISlider />
  </>
);
