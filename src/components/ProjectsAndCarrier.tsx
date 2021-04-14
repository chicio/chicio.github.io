import React, { useState } from "react";
import { track, tracking } from "../utils/tracking";
import { StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

enum Tab {
  projects = "projects",
  carrier = "carrier",
}

export const ProjectsAndCarrier: React.FC = () => {
  const [currentTab, setTab] = useState<Tab>(Tab.projects);

  return (
    <div className="profile-container container-fluid">
      <ul className="nav nav-tabs" role="tablist" id="profile-tabs">
        <li
          id="projects"
          role="presentation"
          className={`${currentTab === Tab.projects ? "active" : ""}`}
        >
          <a
            href="#personal-projects"
            onClick={(event) => {
              event.preventDefault();
              track(
                tracking.action.open_personal_projects_tab,
                tracking.category.home,
                tracking.label.body
              );
              setTab(Tab.projects);
            }}
            className="nav-link text-center"
            aria-controls="personal-projects"
            role="tab"
            data-toggle="tab"
          >
            Projects
          </a>
        </li>
        <li
          id="education-and-experience"
          role="presentation"
          className={`${currentTab === Tab.carrier ? "active" : ""}`}
        >
          <a
            href="#experience"
            onClick={(event) => {
              event.preventDefault();
              track(
                tracking.action.open_education_and_experiences_tab,
                tracking.category.home,
                tracking.label.body
              );
              setTab(Tab.carrier);
            }}
            className="nav-link text-center"
            aria-controls="experience"
            role="tab"
            data-toggle="tab"
          >
            Experience
          </a>
        </li>
      </ul>
      <div className="tab-content responsive">
        {currentTab === Tab.projects && (
          <div
            role="tabpanel"
            className="tab-pane active projects"
            id="personal-projects"
          >
            <div className="row project">
              <div className="project-image-container col-12 col-lg-6 order-0">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/spectral-clara-lux-tracer.jpg"}
                  alt={"spectral clara lux tracer"}
                />
              </div>
              <div
                id="spectral-clara-lux-tracer-info"
                className="project-info col-12 col-lg-6 order-1"
              >
                <h1>Spectral Clara Lux Tracer</h1>
                <p>
                  Physically based ray tracer with multiple shading models
                  support and Color Rendering Index (CRI) evaluation. Project
                  developed for my master degree thesis at
                  <a
                    href="https://www.disco.unimib.it"
                    className="project-info-link"
                  >
                    University Milano-Bicocca
                  </a>{" "}
                  -
                  <a
                    href="http://www.ivl.disco.unimib.it"
                    className="project-info-link"
                  >
                    Imaging and Vision Laboratory
                  </a>
                  .
                </p>
                <ul className="project-features">
                  <li>Computer graphics</li>
                  <li>Ray-tracing</li>
                  <li>Physically based rendering</li>
                  <li>Color calculation using spectral data</li>
                  <li>Color Rendering index calculation</li>
                  <li>iOS, macOS, Windows</li>
                  <li>Objective-C, C++</li>
                </ul>
                <a
                  className="btn btn-default mr-1"
                  href="https://github.com/chicio/Spectral-Clara-Lux-Tracer"
                  onClick={() => {
                    track(
                      tracking.action.open_sclt_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
                <a
                  className="btn btn-default"
                  onClick={() => {
                    track(
                      tracking.action.open_sclt_thesis,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  href="https://drive.google.com/file/d/0BxeVnHLvT8-7dkxQRjV6M29TeUk/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Thesis
                </a>
              </div>
            </div>
            <div className="row project">
              <div
                id="spectral-brdf-explorer-info"
                className="project-info col-12 col-lg-6 order-1 order-lg-0"
              >
                <h1>Spectral BRDF Explorer</h1>
                <p>
                  OpenGL ES application inspired by
                  <a
                    href="https://github.com/wdas/brdf"
                    className="project-info-link"
                  >
                    Walt Animation Disney Studios BRDF Viewer
                  </a>
                  . A simple application that shows some of the most famous
                  lighting model used in computer graphics and that supports
                  color calculation using RGB and spectral data of lights and
                  object surfaces.
                </p>
                <ul className="project-features">
                  <li>Computer graphics</li>
                  <li>OpenGL ES</li>
                  <li>Color calculation using spectral data</li>
                  <li>iOS, Android</li>
                  <li>Objective-C, Java, C++</li>
                </ul>
                <a
                  className="btn btn-default"
                  onClick={() => {
                    track(
                      tracking.action.open_spectral_brdf_explorer_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  href="https://github.com/chicio/Spectral-BRDF-Explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
              </div>
              <div className="project-image-container col-12 col-lg-6 order-0 order-lg-1">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/spectral-brdf-explorer.png"}
                  alt={"Spectral BRDF Explorer"}
                />
              </div>
            </div>
            <div className="row project">
              <div className="project-image-container col-12 col-lg-6 order-0">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/id3tageditor.jpg"}
                  alt={"id3tageditor"}
                />
              </div>
              <div
                id="id3tageditor-info"
                className="project-info col-12 col-lg-6 order-1"
              >
                <h1>ID3TagEditor</h1>
                <p>
                  A Swift library to read and modify ID3 Tag of any mp3 file.
                  Supported ID3 tag version: 2.2. and 2.3. Listed in the
                  implementations section of the{" "}
                  <a
                    className="project-info-link"
                    href="http://id3.org/Implementations"
                  >
                    official ID3 standard website id3.org
                  </a>
                  . It supports the following platforms:
                </p>
                <ul className="project-features">
                  <li>iOS</li>
                  <li>macOS</li>
                  <li>tvOS</li>
                  <li>watchOS</li>
                  <li>Linux</li>
                </ul>
                <a
                  className="btn btn-default mr-1"
                  href="https://github.com/chicio/ID3TagEditor"
                  onClick={() => {
                    track(
                      tracking.action.open_id3tageditor_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
                <a
                  className="btn btn-default"
                  href="{{ site.url }}/ID3TagEditor"
                  onClick={() => {
                    track(
                      tracking.action.open_id3tageditor_doc,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener"
                >
                  Documentation
                </a>
              </div>
            </div>
            <div className="row project">
              <div
                id="mp3id3tagger-info"
                className="project-info col-12 col-lg-6 order-1 order-lg-0"
              >
                <h1>Mp3ID3Tagger</h1>
                <p>
                  A macOS application to edit the ID3 tag of your mp3 files.
                  Mp3ID3Tagger supports the following ID3 tag versions: 2.2. and
                  2.3. It will let you modify the following information inside
                  the ID3 tag of you mp3 files:
                </p>
                <ul className="project-features">
                  <li>version of the tag</li>
                  <li>title</li>
                  <li>artist</li>
                  <li>album</li>
                  <li>year</li>
                  <li>track position</li>
                  <li>genre</li>
                  <li>attached picture set as Front cover</li>
                </ul>
                <a
                  className="btn btn-default mr-1"
                  href="https://github.com/chicio/Mp3ID3Tagger"
                  onClick={() => {
                    track(
                      tracking.action.open_mp3id3tagger_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
                <a
                  className="btn btn-default"
                  href="https://github.com/chicio/Mp3ID3Tagger/raw/master/Release/Mp3ID3Tagger.dmg"
                  onClick={() => {
                    track(
                      tracking.action.open_mp3id3tagger_dmg,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-proofer-ignore="true"
                >
                  Download the app
                </a>
              </div>
              <div className="project-image-container col-12 col-lg-6 order-0 order-lg-1">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/mp3id3tagger.jpg"}
                  alt={"mp3id3tagger"}
                />
              </div>
            </div>
            <div className="row project">
              <div className="project-image-container col-12 col-lg-6 order-0">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/ray-tracing.jpg"}
                  alt={"Ray tracing"}
                />
              </div>
              <div
                id="ray-tracing-info"
                className="project-info col-12 col-lg-6 order-1"
              >
                <h1>Ray-tracing</h1>
                <p>
                  Ray tracer for iPad developed as final project for my computer
                  graphics course at
                  <a
                    href="https://www.disco.unimib.it"
                    className="project-info-link"
                  >
                    University Milano-Bicocca
                  </a>
                  . It supports the some common ray tracing/computer graphics
                  techniques and some interesting addition like perlin noise.
                </p>
                <ul className="project-features">
                  <li>Computer graphics</li>
                  <li>Ray-tracing</li>
                  <li>Lighting models</li>
                  <li>Soft shadow</li>
                  <li>Cube mapping</li>
                  <li>Procedural texture with Perlin noise</li>
                  <li>Bump mapping</li>
                  <li>iOS</li>
                  <li>Objective-C</li>
                </ul>
                <a
                  className="btn btn-default"
                  href="https://github.com/chicio/Ray-tracing"
                  onClick={() => {
                    track(
                      tracking.action.open_ray_tracing_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
              </div>
            </div>
            <div className="row project">
              <div
                id="rangeuislider-info"
                className="project-info col-12 col-lg-6 order-1 order-lg-0"
              >
                <h1>RangeUISlider</h1>
                <p>
                  A highly customizable iOS range selection slider, developed
                  using autolayout and completely customizable using
                  IBDesignabled and IBInspectable. Distributed as a custom
                  framework and with{" "}
                  <a
                    href="https://cocoapods.org/pods/RangeUISlider"
                    className="project-info-link"
                  >
                    cocoapods
                  </a>
                  .
                </p>
                <ul className="project-features">
                  <li>Cocoa Touch</li>
                  <li>Custom UI Component</li>
                  <li>Autolayout</li>
                  <li>IBDesignable</li>
                  <li>IBInspectable</li>
                  <li>iOS</li>
                  <li>Swift</li>
                </ul>
                <a
                  className="btn btn-default mr-1"
                  href="https://github.com/chicio/RangeUISlider"
                  onClick={() => {
                    track(
                      tracking.action.open_rangeuislider_github,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github repo
                </a>
                <a
                  className="btn btn-default"
                  href="https://rangeuislider.fabrizioduroni.it"
                  onClick={() => {
                    track(
                      tracking.action.open_rangeuislider_doc,
                      tracking.category.home,
                      tracking.label.body
                    );
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </div>
              <div className="project-image-container col-12 col-lg-6 order-0 order-lg-1">
                <StaticImage
                  width={500}
                  height={500}
                  src={"../images/projects/range-ui-slider.png"}
                  alt={"RangeUISlider"}
                />
              </div>
            </div>
          </div>
        )}
        {currentTab === Tab.carrier && (
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
                    <FontAwesomeIcon icon={faBriefcase} />
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
                    <FontAwesomeIcon icon={faGraduationCap} />
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
                    <FontAwesomeIcon icon={faBriefcase} />
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
                    <FontAwesomeIcon icon={faBriefcase} />
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
                    <FontAwesomeIcon icon={faBriefcase} />
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
                    <FontAwesomeIcon icon={faBriefcase} />
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
                    <FontAwesomeIcon icon={faGraduationCap} />
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
                    <FontAwesomeIcon icon={faGraduationCap} />
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
    </div>
  );
};
