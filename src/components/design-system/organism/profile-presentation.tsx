import { StaticImage } from "gatsby-plugin-image";
import { Heading5 } from "../atoms/heading5";
import { SocialContacts } from "./social-contacts";
import { tracking } from "../../../logic/tracking";
import styled from "styled-components";
import { Heading2 } from "../atoms/heading2";
import { slugs } from "../../../logic/slug";
import { CallToActionInternalWithTracking } from "../../call-to-action-internal-with-tracking";
import { opacity } from "../utils-css/opacity-keyframes";
import { mediaQuery } from "../utils-css/media-query";
import { FC } from "react";

const Author = styled(Heading2)`
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

const Job = styled(Heading5)`
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

const HomeCallToAction = styled(CallToActionInternalWithTracking)`
  width: 150px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  animation: ${opacity} 1s linear 0.5s;
  animation-fill-mode: forwards;
`;

const ProfileImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
  }
`;

export interface ProfilePresentationProps {
  author: string;
}

export const ProfilePresentation: FC<ProfilePresentationProps> = ({
  author,
}) => (
  <ProfileContainer>
    <ProfileImageContainer>
      <StaticImage
        placeholder={"none"}
        loading={"eager"}
        imgStyle={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          margin: "auto",
        }}
        src={"../../../images/authors/fabrizio-duroni.jpg"}
        alt={author}
      />
    </ProfileImageContainer>
    <Author>{author}</Author>
    <Job>Software Developer</Job>
    <SocialContacts
      trackingCategory={tracking.category.home}
      trackingLabel={tracking.label.body}
    />
    <HomeCallToAction
      trackingData={{
        action: tracking.action.open_blog,
        category: tracking.category.home,
        label: tracking.label.body,
      }}
      to={slugs.blog}
    >
      Blog
    </HomeCallToAction>
    <HomeCallToAction
      trackingData={{
        action: tracking.action.open_art,
        category: tracking.category.home,
        label: tracking.label.body,
      }}
      to={slugs.art}
    >
      Art
    </HomeCallToAction>
  </ProfileContainer>
);
