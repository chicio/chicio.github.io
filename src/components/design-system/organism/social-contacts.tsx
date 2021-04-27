import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { tracking } from "../../../logic/tracking";
import { SocialContact } from "../molecules/social-contact";
import {
  Dev,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Medium,
  Twitter,
} from "@styled-icons/fa-brands";
import { Envelope, Mobile } from "@styled-icons/fa-solid";
import { SocialContactsQuery } from "../../../../graphql-types";
import styled from "styled-components";

const SocialContactsContainers = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[0]};
  text-align: center;
  flex-wrap: wrap;
`;

export interface SocialContactsProps {
  trackingCategory: string;
  trackingLabel: string;
}

export const SocialContacts: React.FC<SocialContactsProps> = ({
  trackingCategory,
  trackingLabel,
}) => {
  const data = useStaticQuery<SocialContactsQuery>(
    graphql`
      query SocialContacts {
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

  const links = data.site!.siteMetadata!.contacts!.links!;

  return (
    <SocialContactsContainers>
      <SocialContact
        link={links.github!}
        trackingAction={tracking.action.open_github}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Github size={30} title={"Github"} />}
      />
      <SocialContact
        link={links.linkedin!}
        trackingAction={tracking.action.open_linkedin}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Linkedin size={30} title={"Linkedin"} />}
      />
      <SocialContact
        link={`mailto:${data.site!.siteMetadata!.contacts!.email!}`}
        trackingAction={tracking.action.send_mail}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Envelope size={30} title={"mail"} />}
      />
      <SocialContact
        link={links.medium!}
        trackingAction={tracking.action.open_medium}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Medium size={30} title={"Medium"} />}
      />
      <SocialContact
        link={links.devto!}
        trackingAction={tracking.action.open_devto}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Dev size={30} title={"Devto"} />}
      />
      <SocialContact
        link={links.twitter!}
        trackingAction={tracking.action.open_twitter}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Twitter size={30} title={"Twitter"} />}
      />
      <SocialContact
        link={links.facebook!}
        trackingAction={tracking.action.open_facebook}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Facebook size={30} title={"Facebook"} />}
      />
      <SocialContact
        link={links.instagram!}
        trackingAction={tracking.action.open_instagram}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Instagram size={30} title={"Instagram"} />}
      />
      <SocialContact
        link={`tel: ${data.site!.siteMetadata!.contacts!.phone!}`}
        trackingAction={tracking.action.call_phone}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
        icon={<Mobile size={30} title={"phone"} />}
      />
    </SocialContactsContainers>
  );
};
