import React from "react";
import { track, tracking } from "../../../utils/tracking";
import { SocialContacts } from "../../SocialContacts";
import styled from "styled-components";
import { MenuItem } from "../molecules/menu-item";

const FooterContainer = styled.footer`
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
    <div className="d-flex justify-content-center social-links">
      <SocialContacts
        trackingCategory={trackingCategory}
        trackingLabel={tracking.label.footer}
        iconClass={"footer-icon"}
      />
    </div>
    <div className="d-flex justify-content-center copyright">
      <div>
        Made with{" "}
        <span id="heart" className="heart">
          💝
        </span>
        {`by ${author} 'Chicio'`}
      </div>
    </div>
  </FooterContainer>
);
