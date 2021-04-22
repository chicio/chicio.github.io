import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Heading5 } from "../atoms/heading5";
import { SocialContacts } from "./social-contacts";
import { track, tracking } from "../../../utils/tracking";
import styled from "styled-components";
import { CallToActionInternal } from "../atoms/internal-call-to-action";
import { Heading2 } from "../atoms/heading2";

const SocialContactsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[0]};
  text-align: center;
  flex-wrap: wrap;
`;

const BlogCallToAction = styled(CallToActionInternal)`
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
  animation: show-profile-introduction 1s linear 0.5s;
  animation-fill-mode: forwards;

  @keyframes show-profile-introduction {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface ProfilePresentationProps {
  author: string;
}

export const ProfilePresentation: React.FC<ProfilePresentationProps> = ({
  author,
}) => (
  <ProfileContainer>
    <StaticImage
      placeholder={"none"}
      imgStyle={{
        width: "130px",
        height: "130px",
        borderRadius: "50%",
        margin: "auto",
      }}
      src={"../../../images/authors/fabrizio-duroni.jpg"}
      alt={author}
    />
    <Heading2>{author}</Heading2>
    <Heading5>Software Developer</Heading5>
    <SocialContactsContainer>
      <SocialContacts
        trackingCategory={tracking.category.home}
        trackingLabel={tracking.label.body}
      />
    </SocialContactsContainer>
    <BlogCallToAction
      onClick={() =>
        track(
          tracking.action.open_blog,
          tracking.category.home,
          tracking.label.body
        )
      }
      to="/blog/"
    >
      Blog
    </BlogCallToAction>
  </ProfileContainer>
);
