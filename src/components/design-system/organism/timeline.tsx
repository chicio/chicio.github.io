import { StaticImage } from "gatsby-plugin-image";
import { Heading5 } from "../atoms/heading5";
import { Paragraph } from "../atoms/paragraph";
import { List } from "../atoms/list";
import React from "react";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { Heading6 } from "../atoms/heading6";
import { Briefcase } from "styled-icons/boxicons-regular";
import { GraduationCap } from "styled-icons/fa-solid";
import { mediaQuery } from "../utils-css/media-query";

const TimelineContentContainer = styled(Container)`
  padding: 0;
  margin-top: ${(props) => props.theme.spacing[4]};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const TimelineContainer = styled.ul`
  list-style: none;
  padding: ${(props) => props.theme.spacing[4]} 0
    ${(props) => props.theme.spacing[4]};
  position: relative;
  text-align: justify;
  margin: 0;
  background-color: ${(props) => props.theme.light.generalBackground};

  ${mediaQuery.minWidth.md} {
    text-align: left;

    &:before {
      top: 0;
      bottom: 0;
      position: absolute;
      content: " ";
      width: 3px;
      left: 50%;
      margin-left: -1.5px;
      background-color: ${(props) => props.theme.light.dividerColor};
    }
  }

  ${mediaQuery.maxWidth.md} {
    &:before {
      left: 40px;
    }
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackground};

    &:before {
      background-color: ${(props) => props.theme.dark.dividerColor};
    }
  }
`;

const TimelineElementContainer = styled.li`
  padding-bottom: ${(props) => props.theme.spacing[4]};
  position: relative;

  &:before,
  &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }
`;

interface TimelinePanelProps {
  inverted: boolean;
}

const TimelinePanel = styled.div<TimelinePanelProps>`
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  border: ${(props) => props.theme.light.dividerColor} 1px solid;
  box-shadow: ${(props) => props.theme.light.boxShadowLight} 0 1px 6px;
  width: 46%;
  float: left;
  border-radius: 3px;
  position: relative;

  &:before {
    position: absolute;
    top: 26px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: ${(props) => props.theme.light.dividerColor} 14px solid;
    border-right: ${(props) => props.theme.light.dividerColor} 0px solid;
    border-bottom: 15px solid transparent;
    content: " ";
  }

  &:after {
    position: absolute;
    top: 27px;
    right: -14px;
    display: inline-block;
    border-left: ${(props) => props.theme.light.generalBackgroundLight} 14px
      solid;
    border-right: ${(props) => props.theme.light.generalBackgroundLight} 0px
      solid;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    content: " ";
  }

  ${mediaQuery.maxWidth.md} {
    width: 100%;
  }

  ${(props) =>
    props.inverted &&
    css`
      float: right;

      &:before {
        border-left-width: 0;
        border-right-width: 14px;
        left: -14px;
        right: auto;
      }

      &:after {
        border-left-width: 0;
        border-right-width: 14px;
        left: -13px;
        right: auto;
      }
    `};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    border: ${(props) => props.theme.dark.dividerColor} 1px solid;
    box-shadow: ${(props) => props.theme.dark.boxShadowLight} 0 1px 6px;

    &:before {
      border-left: ${(props) => props.theme.dark.dividerColor} 14px solid;
      border-right: ${(props) => props.theme.dark.dividerColor} 0px solid;
    }

    &:after {
      border-left: ${(props) => props.theme.dark.generalBackgroundLight} 14px
        solid;
      border-right: ${(props) => props.theme.dark.generalBackgroundLight} 0px
        solid;
    }

    ${(props) =>
      props.inverted &&
      css`
        float: right;

        &:before {
          border-left-width: 0;
          border-right-width: 14px;
          left: -14px;
          right: auto;
        }

        &:after {
          border-left-width: 0;
          border-right-width: 14px;
          left: -13px;
          right: auto;
        }
      `};
  }
`;

const TimelineBadge = styled.div`
  visibility: hidden;

  ${mediaQuery.minWidth.md} {
    visibility: visible;
    background-color: ${(props) => props.theme.light.primaryColor};
    color: ${(props) => props.theme.light.textAbovePrimaryColor};
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 1.4em;
    text-align: center;
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -20px;
    z-index: 100;
    border-radius: 50%;
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColor};
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

const TimelineTitle: React.FC = ({ children }) => (
  <Heading5>{children}</Heading5>
);

const TimelineSubtitle: React.FC = ({ children }) => (
  <Heading6>{children}</Heading6>
);

const TimelinePanelContentContainer = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
`;

const imgSize = 80;

const TimelineImageContainer = styled.div`
  border: 1px solid gray;
  margin-left: ${(props) => props.theme.spacing[0]};
  margin-right: auto;
  margin-bottom: 15px;
  display: block;
  background-color: #fff;
  width: ${imgSize}px;
  height: ${imgSize}px;
`;

type TimelineElementProps = TimelinePanelProps & {
  icon: React.ReactElement;
};

const TimelineElement: React.FC<TimelineElementProps> = ({
  children,
  inverted,
  icon,
}) => (
  <TimelineElementContainer>
    <TimelineBadge>{icon}</TimelineBadge>
    <TimelinePanel inverted={inverted}>
      <TimelinePanelContentContainer>{children}</TimelinePanelContentContainer>
    </TimelinePanel>
  </TimelineElementContainer>
);

export const Timeline: React.FC = () => {
  const iconsSize = 20;
  const briefcase = <Briefcase size={iconsSize} />;
  const graduationCap = <GraduationCap size={iconsSize} />;

  return (
    <TimelineContentContainer>
      <TimelineContainer>
        <TimelineElement inverted={false} icon={briefcase}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/lastminute-group.png"}
              alt={"lastminute"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Lastminute.com group</TimelineTitle>
          <TimelineSubtitle>Mobile application developer</TimelineSubtitle>
          <Paragraph>February 2017</Paragraph>
          <Paragraph>
            Designing and implementing iOS and Android apps for the main brands
            of the company: Lastminute.com, Volagratis, Bravofly, Rumbo.
          </Paragraph>
        </TimelineElement>
        <TimelineElement inverted={true} icon={graduationCap}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/unimib.jpg"}
              alt={"unimib"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Milano-Bicocca University</TimelineTitle>
          <TimelineSubtitle>
            {"Master's degree in Computer Science"}
          </TimelineSubtitle>
          <Paragraph>July 2016</Paragraph>
          <Paragraph>
            Thesis: “Spectral Clara Lux Tracer: physically based ray tracer with
            multiple shading models support”. You can find more info about it in
            the project section.
          </Paragraph>
          <List>
            <li>Computer graphics</li>
            <li>Software engineering</li>
            <li>Algorithm and Theoretical CS</li>
            <li>IT security</li>
            <li>IT management</li>
            <li>Design and user experience</li>
          </List>
        </TimelineElement>
        <TimelineElement inverted={false} icon={briefcase}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/condenast.png"}
              alt={"condenast"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Condé Nast Italia</TimelineTitle>
          <TimelineSubtitle>Mobile/Web application developer</TimelineSubtitle>
          <Paragraph>June 2013</Paragraph>
          <Paragraph>
            Designing and implementing iOS and Android apps for the main brands
            of the company: Vanity Fair, Glamour, Wired, Vogue. I also worked
            with the web team to develop the new version of the official web
            sites for GQ Italia, Glamour, CNLive! and Vogue Italia.
          </Paragraph>
        </TimelineElement>
        <TimelineElement inverted={false} icon={briefcase}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/shi.png"}
              alt={"shi"}
            />
          </TimelineImageContainer>
          <TimelineTitle>SHI</TimelineTitle>
          <TimelineSubtitle>iOS/Web Developer</TimelineSubtitle>
          <Paragraph>October 2010</Paragraph>
          <Paragraph>
            Design and development of mobile application on iOS, Android and
            Windows phone platform, for enterprise distribution (ad-hoc
            distribution) or within the various app store. Design and
            development of Web application used as backend for mobile app.
            Design and development of Enterprise Web application.
          </Paragraph>
        </TimelineElement>
        <TimelineElement inverted={false} icon={briefcase}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/bottinelli-informatica.png"}
              alt={"bottinelli informatica"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Bottinelli informatica</TimelineTitle>
          <TimelineSubtitle>Developer</TimelineSubtitle>
          <Paragraph>September 2009</Paragraph>
          <Paragraph>Software development for textile industry.</Paragraph>
        </TimelineElement>
        <TimelineElement inverted={false} icon={briefcase}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/avanade.png"}
              alt={"avanade"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Avanade</TimelineTitle>
          <TimelineSubtitle>PMO Consultant</TimelineSubtitle>
          <Paragraph>October 2008</Paragraph>
          <Paragraph>
            {" "}
            Assigned on Eurosig integration BA-HVB/Unicredit project, I worked
            with the Accenture Consultant team as a PMO.
          </Paragraph>
          <List>
            <li>
              Tracking creation and evolution of functional specification to
              cover the gaps between ASC, CRE, PAY, MDM and BSS sector of the IT
              systems of Unicredit and HVB bank.
            </li>
            <li>
              Publishing statistics to show the state of art of the functional
              specification produced, the open change request and the state of
              user test. Maintenance of tools created with Microsoft Excel,
              Microsoft Powerpoint and VBA used to generate the above mentioned
              statistics.
            </li>
            <li>
              Maintenance of tools used to manage WBS of the project inside
              Accenture team.
            </li>
          </List>
        </TimelineElement>
        <TimelineElement inverted={true} icon={graduationCap}>
          <TimelineImageContainer>
            <StaticImage
              width={imgSize}
              height={imgSize}
              src={"../../../images/carrier/insubria.png"}
              alt={"insubria"}
            />
          </TimelineImageContainer>
          <TimelineTitle>Insubria University</TimelineTitle>
          <TimelineSubtitle>
            {"Bachelor's degree in Computer Science"}
          </TimelineSubtitle>
          <Paragraph>October 2008</Paragraph>
          <Paragraph>
            Thesis: “Grandi Giardini: implementazione di un portale web con
            funzionalità e-commerce”. A web e-commerce developed for Grandi
            Giardini Italiani s.r.l., a company dealing with the organization of
            events in some of the most beautiful italian gardens (never deployed
            in production).
          </Paragraph>
          <List>
            <li>Software engineering</li>
            <li>Algorithm and Theoretical CS</li>
            <li>IT security</li>
            <li>IT management</li>
            <li>Networking</li>
            <li>Programming</li>
          </List>
        </TimelineElement>
        <TimelineElement inverted={true} icon={graduationCap}>
          <TimelineTitle>ITCG Romagnosi</TimelineTitle>
          <TimelineSubtitle>High school in Accountant</TimelineSubtitle>
          <Paragraph>July 2005</Paragraph>
        </TimelineElement>
      </TimelineContainer>
    </TimelineContentContainer>
  );
};
