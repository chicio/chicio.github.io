import { Briefcase, GraduationCap } from "@styled-icons/fa-solid";
import { StaticImage } from "gatsby-plugin-image";
import { Heading4 } from "../atoms/heading4";
import { Heading5 } from "../atoms/heading5";
import { Paragraph } from "../atoms/paragraph";
import { List } from "../atoms/list";
import React from "react";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";

const TimelineContentContainer = styled(Container)`
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

  &:before {
    top: 0;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    left: 50%;
    margin-left: -1.5px;
  }

  @media (min-width: 992px) {
    text-align: left;
  }

  @media (max-width: 992px) {
    &:before {
      left: 40px;
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackground};

    &:before {
      background-color: ${(props) => props.theme.dark.generalBackgroundLight};
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
  padding: 20px;
  position: relative;

  &:before {
    position: absolute;
    top: 26px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: ${(props) => props.theme.light.dividerColor} 14px solid;
    border-left: ${(props) => props.theme.light.dividerColor} 0px solid;
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
    border-left: ${(props) => props.theme.light.generalBackgroundLight} 0px
      solid;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    content: " ";
  }

  ${(props) =>
    props.inverted &&
    css`
      float: right;

      &:before {
        border-left-width: 0;
        border-right-width: 15px;
        left: -15px;
        right: auto;
      }

      &:after {
        border-left-width: 0;
        border-right-width: 14px;
        left: -14px;
        right: auto;
      }
    `};

  @media (max-width: 992px) {
    width: calc(100% - 90px);
    width: -moz-calc(100% - 90px);
    width: -webkit-calc(100% - 90px);
    float: right;

    &:before {
      border-left-width: 0;
      border-right-width: 15px;
      left: -15px;
      right: auto;
    }

    &:after {
      border-left-width: 0;
      border-right-width: 14px;
      left: -14px;
      right: auto;
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    border: ${(props) => props.theme.dark.dividerColor} 1px solid;
    box-shadow: ${(props) => props.theme.dark.boxShadowLight} 0 1px 6px;

    &:before {
      border-left: ${(props) => props.theme.dark.dividerColor} 14px solid;
      border-left: ${(props) => props.theme.dark.dividerColor} 0px solid;
    }

    &:after {
      border-left: ${(props) => props.theme.dark.generalBackgroundLight} 14px
        solid;
      border-left: ${(props) => props.theme.dark.generalBackgroundLight} 0px
        solid;
    }
  }
`;

const TimelineBadge = styled.div`
  background-color: ${(props) => props.theme.light.primaryColor};
  color: ${(props) => props.theme.light.primaryColorText};
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -25px;
  z-index: 100;
  border-radius: 50%;

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
    color: ${(props) => props.theme.dark.primaryColorText};
  }

  @media (max-width: 992px) {
    left: 15px;
    margin-left: 0;
    top: 16px;
  }
`;

export const Timeline: React.FC = () => (
  <TimelineContentContainer>
    <TimelineContainer>
      <TimelineElementContainer>
        <TimelineBadge className="timeline-badge work">
          <Briefcase size={25} />
        </TimelineBadge>
        <TimelinePanel inverted={false}>
          <StaticImage
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/lastminute-group.png"}
            alt={"lastminute"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <Heading4>Lastminute.com group</Heading4>
          <Heading5 className="timeline-subtitle">
            Mobile application developer
          </Heading5>
          <Paragraph>February 2017</Paragraph>
          <Paragraph>
            Designing and implementing iOS and Android apps for the main brands
            of the company: Lastminute.com, Volagratis, Bravofly, Rumbo.
          </Paragraph>
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <GraduationCap />
        </TimelineBadge>
        <TimelinePanel inverted={true}>
          <StaticImage
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/unimib.jpg"}
            alt={"unimib"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <Heading4 className="timeline-title">
            Milano-Bicocca University
          </Heading4>
          <Heading5 className="timeline-subtitle">
            {"Master's degree in Computer Science"}
          </Heading5>
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
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <Briefcase />
        </TimelineBadge>
        <TimelinePanel inverted={false}>
          <StaticImage
            backgroundColor={"#fff"}
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/condenast.png"}
            alt={"condenast"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <Heading4 className="timeline-title">Condé Nast Italia</Heading4>
          <Heading5 className="timeline-subtitle">
            Mobile/Web application developer
          </Heading5>
          <Paragraph>June 2013</Paragraph>
          <Paragraph>
            Designing and implementing iOS and Android apps for the main brands
            of the company: Vanity Fair, Glamour, Wired, Vogue. I also worked
            with the web team to develop the new version of the official web
            sites for GQ Italia, Glamour, CNLive! and Vogue Italia.
          </Paragraph>
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <Briefcase />
        </TimelineBadge>
        <TimelinePanel inverted={false}>
          <StaticImage
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/shi.png"}
            alt={"shi"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <Heading4 className="timeline-title">SHI</Heading4>
          <Heading5 className="timeline-subtitle">iOS/Web Developer</Heading5>
          <Paragraph>October 2010</Paragraph>
          <Paragraph>
            Design and development of mobile application on iOS, Android and
            Windows phone platform, for enterprise distribution (ad-hoc
            distribution) or within the various app store. Design and
            development of Web application used as backend for mobile app.
            Design and development of Enterprise Web application.
          </Paragraph>
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <Briefcase />
        </TimelineBadge>
        <TimelinePanel inverted={false}>
          <StaticImage
            backgroundColor={"#fff"}
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/bottinelli-informatica.png"}
            alt={"bottinelli informatica"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <h4 className="timeline-title">Bottinelli informatica</h4>
          <h4 className="timeline-subtitle">Developer</h4>
          <p>
            <small className="text-muted d-md-block d-lg-none">
              September 2009
            </small>
          </p>
          <p>Software development for textile industry.</p>
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <Briefcase />
        </TimelineBadge>
        <TimelinePanel inverted={false}>
          <StaticImage
            backgroundColor={"#fff"}
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/avanade.png"}
            alt={"avanade"}
            imgStyle={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "15px",
              display: "block",
            }}
          />
          <Heading4 className="timeline-title">Avanade</Heading4>
          <Heading5 className="timeline-subtitle">PMO Consultant</Heading5>
          <Paragraph>October 2008</Paragraph>
          <Paragraph>
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
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <GraduationCap />
        </TimelineBadge>
        <TimelinePanel inverted={true}>
          <StaticImage
            backgroundColor={"#fff"}
            className="timeline-image"
            width={80}
            height={80}
            src={"../../../images/carrier/insubria.png"}
            alt={"insubria"}
          />
          <Heading4 className="timeline-title">Insubria University</Heading4>
          <Heading5 className="timeline-subtitle">
            {"Bachelor's degree in Computer Science"}
          </Heading5>
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
        </TimelinePanel>
      </TimelineElementContainer>
      <TimelineElementContainer>
        <TimelineBadge>
          <GraduationCap />
        </TimelineBadge>
        <TimelinePanel inverted={true}>
          <Heading4 className="timeline-title">ITCG Romagnosi</Heading4>
          <Heading5 className="timeline-subtitle">
            High school in Accountant
          </Heading5>
          <Paragraph>July 2005</Paragraph>
        </TimelinePanel>
      </TimelineElementContainer>
    </TimelineContainer>
  </TimelineContentContainer>
);
