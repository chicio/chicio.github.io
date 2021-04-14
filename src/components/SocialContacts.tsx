import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { tracking } from "../utils/tracking";
import {
  faDev,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { SocialContact } from "./SocialContact";
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";

interface SocialContactsProps {
  trackingCategory: string;
  trackingLabel: string;
  iconClass: string;
}

export const SocialContacts: React.FC<SocialContactsProps> = ({
  trackingCategory,
  trackingLabel,
  iconClass,
}) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contacts {
              email
              phone
              links {
                twitter
                facebook
                linkedin
                github
                medium
                devto
                instagram
              }
            }
          }
        }
      }
    `
  );

  return (
    <>
      <SocialContact
        link={data.site.siteMetadata.contacts.links.github}
        trackingAction={tracking.action.open_github}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faGithub}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.linkedin}
        trackingAction={tracking.action.open_linkedin}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faLinkedin}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.email}
        trackingAction={tracking.action.send_mail}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faEnvelope}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.medium}
        trackingAction={tracking.action.open_medium}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faMedium}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.devto}
        trackingAction={tracking.action.open_devto}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faDev}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.twitter}
        trackingAction={tracking.action.open_twitter}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faTwitter}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.facebook}
        trackingAction={tracking.action.open_facebook}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faFacebook}
        iconClass={iconClass}
      />
      <SocialContact
        link={data.site.siteMetadata.contacts.links.instagram}
        trackingAction={tracking.action.open_instagram}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faInstagram}
        iconClass={iconClass}
      />
      <SocialContact
        link={`tel: ${data.site.siteMetadata.contacts.phone}`}
        trackingAction={tracking.action.call_phone}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={faMobile}
        iconClass={`${iconClass} icon-mobile-phone phone-number`}
      />
    </>
  );
};
