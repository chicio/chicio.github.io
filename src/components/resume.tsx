import React, { useState } from "react";
import { tracking } from "../utils/tracking";
import { StaticImage } from "gatsby-plugin-image";
import { ContainerFluid } from "./design-system/atoms/container-fluid";
import styled from "styled-components";
import { Tabs } from "./design-system/molecules/tabs";
import { Projects } from "./design-system/organism/projects";
// import {
//   faBriefcase,
//   faGraduationCap,
// } from "@fortawesome/free-solid-svg-icons";

const ResumeContainer = styled(ContainerFluid)`
  padding-left: 0;
  padding-right: 0;
  background-color: ${(props) => props.theme.light.generalBackground};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackground};
  }
`;

enum TabContent {
  projects = "projects",
  carrier = "carrier",
}

export const Resume: React.FC = () => {
  const [currentTab, setTab] = useState<TabContent>(TabContent.projects);

  return (
    <ResumeContainer>
      <Tabs
        tab1={{
          active: currentTab === TabContent.projects,
          label: "Projects",
          link: "#personal-projects",
          trackingAction: tracking.action.open_personal_projects_tab,
          trackingCategory: tracking.category.home,
          trackingLabel: tracking.label.body,
          action: () => setTab(TabContent.projects),
        }}
        tab2={{
          active: currentTab === TabContent.carrier,
          label: "Experience",
          link: "#experience",
          trackingAction: tracking.action.open_education_and_experiences_tab,
          trackingCategory: tracking.category.home,
          trackingLabel: tracking.label.body,
          action: () => setTab(TabContent.carrier),
        }}
      />
      <div>
        {currentTab === TabContent.projects && <Projects />}
        {currentTab === TabContent.carrier && (
          <div
            role="tabpanel"
            className="tab-pane active experience"
            id="experience"
          >
            <div className="container">
              <ul id="timeline" className="timeline">
                <li
                  id="timeline-element-lastminute"
                  className="timeline-element"
                >
                  <div className="timeline-badge work">
                    {/*<FontAwesomeIcon icon={faBriefcase} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/lastminute-group.png"}
                        alt={"lastminute"}
                      />
                      <h4 className="timeline-title">Lastminute.com group</h4>
                      <h4 className="timeline-subtitle">
                        Mobile application developer
                      </h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          February 2017
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Designing and implementing iOS and Android apps for the
                        main brands of the company: Lastminute.com, Volagratis,
                        Bravofly, Rumbo.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-date d-none d-lg-block">
                    <span>February 2017</span>
                  </div>
                </li>
                <li
                  id="timeline-element-bicocca"
                  className="timeline-element timeline-inverted"
                >
                  <div className="timeline-badge">
                    {/*<FontAwesomeIcon icon={faGraduationCap} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/unimib.jpg"}
                        alt={"unimib"}
                      />
                      <h4 className="timeline-title">
                        Milano-Bicocca University
                      </h4>
                      <h4 className="timeline-subtitle">
                        {"Master's degree in Computer Science"}
                      </h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          July 2016
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Thesis: “Spectral Clara Lux Tracer: physically based ray
                        tracer with multiple shading models support”. You can
                        find more info about it in the project section.
                      </p>
                      <ul>
                        <li>Computer graphics</li>
                        <li>Software engineering</li>
                        <li>Algorithm and Theoretical CS</li>
                        <li>IT security</li>
                        <li>IT management</li>
                        <li>Design and user experience</li>
                      </ul>
                    </div>
                  </div>
                  <div className="timeline-date-inverted d-none d-lg-block">
                    <span>July 2016</span>
                  </div>
                </li>
                <li id="timeline-element-condenast">
                  <div className="timeline-badge work">
                    {/*<FontAwesomeIcon icon={faBriefcase} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        backgroundColor={"#fff"}
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/condenast.png"}
                        alt={"condenast"}
                      />
                      <h4 className="timeline-title">Condé Nast Italia</h4>
                      <h4 className="timeline-subtitle">
                        Mobile/Web application developer
                      </h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          June 2013
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Designing and implementing iOS and Android apps for the
                        main brands of the company: Vanity Fair, Glamour, Wired,
                        Vogue.
                      </p>
                      <p>
                        I also worked with the web team to develop the new
                        version of the official web sites for GQ Italia,
                        Glamour, CNLive! and Vogue Italia.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-date d-none d-lg-block">
                    <span>June 2013</span>
                  </div>
                </li>
                <li id="timeline-element-shi">
                  <div className="timeline-badge work">
                    {/*<FontAwesomeIcon icon={faBriefcase} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/shi.png"}
                        alt={"shi"}
                      />
                      <h4 className="timeline-title">SHI</h4>
                      <h4 className="timeline-subtitle">iOS/Web Developer</h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          October 2010
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Design and development of mobile application on iOS,
                        Android and Windows phone platform, for enterprise
                        distribution (ad-hoc distribution) or within the various
                        app store.
                      </p>
                      <p>
                        Design and development of Web application used as
                        backend for mobile app. Design and development of
                        Enterprise Web application.
                      </p>
                    </div>
                  </div>
                  <div className="timeline-date d-none d-lg-block">
                    <span>October 2010</span>
                  </div>
                </li>
                <li id="timeline-element-bottinelli-informatica">
                  <div className="timeline-badge work">
                    {/*<FontAwesomeIcon icon={faBriefcase} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        backgroundColor={"#fff"}
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/bottinelli-informatica.png"}
                        alt={"bottinelli informatica"}
                      />
                      <h4 className="timeline-title">Bottinelli informatica</h4>
                      <h4 className="timeline-subtitle">Developer</h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          September 2009
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>Software development for textile industry.</p>
                    </div>
                  </div>
                  <div className="timeline-date d-none d-lg-block">
                    <span>September 2009</span>
                  </div>
                </li>
                <li id="timeline-element-avanade">
                  <div className="timeline-badge work">
                    {/*<FontAwesomeIcon icon={faBriefcase} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        backgroundColor={"#fff"}
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/avanade.png"}
                        alt={"avanade"}
                      />
                      <h4 className="timeline-title">Avanade</h4>
                      <h4 className="timeline-subtitle">PMO Consultant</h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          October 2008
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Assigned on Eurosig integration BA-HVB/Unicredit
                        project, I worked with the Accenture Consultant team as
                        a PMO.
                      </p>
                      <ul>
                        <li>
                          Tracking creation and evolution of functional
                          specification to cover the gaps between ASC, CRE, PAY,
                          MDM and BSS sector of the IT systems of Unicredit and
                          HVB bank.
                        </li>
                        <li>
                          Publishing statistics to show the state of art of the
                          functional specification produced, the open change
                          request and the state of user test. Maintenance of
                          tools created with Microsoft Excel, Microsoft
                          Powerpoint and VBA used to generate the above
                          mentioned statistics.
                        </li>
                        <li>
                          Maintenance of tools used to manage WBS of the project
                          inside Accenture team.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="timeline-date d-none d-lg-block">
                    <span>October 2008</span>
                  </div>
                </li>
                <li
                  id="timeline-element-insubria"
                  className="timeline-inverted"
                >
                  <div className="timeline-badge">
                    {/*<FontAwesomeIcon icon={faGraduationCap} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <StaticImage
                        backgroundColor={"#fff"}
                        className="timeline-image"
                        width={80}
                        height={80}
                        src={"../images/carrier/insubria.png"}
                        alt={"insubria"}
                      />
                      <h4 className="timeline-title">Insubria University</h4>
                      <h4 className="timeline-subtitle">
                        {"Bachelor's degree in Computer Science"}
                      </h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          October 2008
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p>
                        Thesis: “Grandi Giardini: implementazione di un portale
                        web con funzionalità e-commerce”. A web e-commerce
                        developed for Grandi Giardini Italiani s.r.l., a company
                        dealing with the organization of events in some of the
                        most beautiful italian gardens (never deployed in
                        production).
                      </p>
                      <ul>
                        <li>Software engineering</li>
                        <li>Algorithm and Theoretical CS</li>
                        <li>IT security</li>
                        <li>IT management</li>
                        <li>Networking</li>
                        <li>Programming</li>
                      </ul>
                    </div>
                  </div>
                  <div className="timeline-date-inverted d-none d-lg-block">
                    <span>October 2008</span>
                  </div>
                </li>
                <li
                  id="timeline-element-romagnosi"
                  className="timeline-inverted"
                >
                  <div className="timeline-badge">
                    {/*<FontAwesomeIcon icon={faGraduationCap} />*/}
                  </div>
                  <div className="timeline-panel">
                    <div className="row timeline-heading">
                      <h4 className="timeline-title">ITCG Romagnosi</h4>
                      <h4 className="timeline-subtitle">
                        High school in Accountant
                      </h4>
                      <p>
                        <small className="text-muted d-md-block d-lg-none">
                          July 2005
                        </small>
                      </p>
                    </div>
                    <div className="timeline-body">
                      <p></p>
                    </div>
                  </div>
                  <div className="timeline-date-inverted d-none d-lg-block">
                    <span>July 2005</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </ResumeContainer>
  );
};
