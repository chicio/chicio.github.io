import { StaticImage } from "gatsby-plugin-image";
import { SocialContacts } from "./SocialContacts";
import { tracking } from "../utils/tracking";
import { GoToBlogButton } from "./GoToBlogButton";
import * as React from "react";

interface ProfilePresentationProps {
  author: string;
}

export const ProfilePresentation: React.FC<ProfilePresentationProps> = ({
  author,
}) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <div id="center-content" className="center-content">
      <StaticImage
        placeholder={"none"}
        imgClassName="avatar-container"
        src={"../images/authors/fabrizio-duroni.jpg"}
        alt={author}
      />
      <h1 id="profile-name">{author}</h1>
      <h2 id="profile-job" className="profile-job">
        Software Developer
      </h2>
      <SocialContacts
        trackingCategory={tracking.category.home}
        trackingLabel={tracking.label.body}
        iconClass={"profile-icon"}
      />
      <br className="break" />
    </div>
    <GoToBlogButton />
  </div>
);
