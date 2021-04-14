import React from "react";
import { track, tracking } from "../utils/tracking";
import { SocialContacts } from "./SocialContacts";
import { Link } from "gatsby";

interface FooterProps {
  author: string;
  trackingCategory: string;
  trackingLabel: string;
}

export const Footer: React.FC<FooterProps> = ({
  author,
  trackingCategory,
  trackingLabel,
}) => (
  <footer className="container-fluid footer-container">
    <div className="d-flex justify-content-center flex-wrap">
      <Link
        to="/"
        onClick={() => {
          track(tracking.action.open_home, trackingCategory, trackingLabel);
        }}
        className="nav-item-footer"
      >
        Home
      </Link>
      <Link
        to="/blog/"
        onClick={() => {
          track(tracking.action.open_blog, trackingCategory, trackingLabel);
        }}
        className="nav-item-footer"
      >
        Blog
      </Link>
      <Link
        to="/2017/05/10/about-me/"
        onClick={() => {
          track(tracking.action.open_about_me, trackingCategory, trackingLabel);
        }}
        className="nav-item-footer"
      >
        About Me
      </Link>
      <Link
        to="/blog/archive/"
        onClick={() => {
          track(
            tracking.action.open_blog_archive,
            trackingCategory,
            trackingLabel
          );
        }}
        className="nav-item-footer"
      >
        Archive
      </Link>
      <Link
        to="/blog/tags/"
        onClick={() => {
          track(
            tracking.action.open_blog_tags,
            trackingCategory,
            trackingLabel
          );
        }}
        className="nav-item-footer last"
      >
        Tags
      </Link>
    </div>
    <div className="d-flex justify-content-center social-links">
      <SocialContacts
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
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
  </footer>
);
