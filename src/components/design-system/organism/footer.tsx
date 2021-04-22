import React from "react";
import { track, tracking } from "../../../utils/tracking";
import { SocialContacts } from "./social-contacts";
import styled from "styled-components";
import { MenuItem } from "../molecules/menu-item";
import { Paragraph } from "../atoms/paragraph";

const FooterContainer = styled.footer`
  flex-shrink: 0;
  width: 100%;
  background-color: ${(props) => props.theme.light.primaryColor};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;

const FooterMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spacing[2]};
`;

const FooterMenuItem = styled(MenuItem)`
  margin: ${(props) => props.theme.spacing[0]};
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

const FooterContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[0]};
  text-align: center;
  flex-wrap: wrap;
`;

const FooterAuthorDescription = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.light.primaryColorDark};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const MadeWithLoveParagraph = styled(Paragraph)`
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

interface FooterProps {
  author: string;
  trackingCategory: string;
}

export const Footer: React.FC<FooterProps> = ({ author, trackingCategory }) => (
  <FooterContainer>
    <FooterMenu>
      <FooterMenuItem
        to="/"
        onClick={() => {
          track(
            tracking.action.open_home,
            trackingCategory,
            tracking.label.footer
          );
        }}
      >
        Home
      </FooterMenuItem>
      <FooterMenuItem
        to="/blog/"
        onClick={() => {
          track(
            tracking.action.open_blog,
            trackingCategory,
            tracking.label.footer
          );
        }}
        className="nav-item-footer"
      >
        Blog
      </FooterMenuItem>
      <FooterMenuItem
        to="/2017/05/10/about-me/"
        onClick={() => {
          track(
            tracking.action.open_about_me,
            trackingCategory,
            tracking.label.footer
          );
        }}
        className="nav-item-footer"
      >
        About Me
      </FooterMenuItem>
      <FooterMenuItem
        to="/blog/archive/"
        onClick={() => {
          track(
            tracking.action.open_blog_archive,
            trackingCategory,
            tracking.label.footer
          );
        }}
        className="nav-item-footer"
      >
        Archive
      </FooterMenuItem>
      <FooterMenuItem
        to="/blog/tags/"
        onClick={() => {
          track(
            tracking.action.open_blog_tags,
            trackingCategory,
            tracking.label.footer
          );
        }}
        className="nav-item-footer last"
      >
        Tags
      </FooterMenuItem>
    </FooterMenu>
    <FooterAuthorDescription>
      <FooterContentContainer>
        <SocialContacts
          trackingCategory={trackingCategory}
          trackingLabel={tracking.label.footer}
        />
      </FooterContentContainer>
      <FooterContentContainer>
        <MadeWithLoveParagraph>{`Made with 💝 by ${author} 'Chicio'`}</MadeWithLoveParagraph>
      </FooterContentContainer>
    </FooterAuthorDescription>
  </FooterContainer>
);
