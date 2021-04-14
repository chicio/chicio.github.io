import React from "react";
import { track, tracking } from "../utils/tracking";
import { Link } from "gatsby";

interface MastheadItemProps {
  trackingAction: string;
  trackingCategory: string;
  label: string;
  url: string;
  active: boolean;
}

export const MastheadItem: React.FC<MastheadItemProps> = ({
  trackingAction,
  trackingCategory,
  label,
  url,
  active,
}) => (
  <Link
    className={`blog-nav-item ${active ? "active" : ""}`}
    onClick={() => {
      track(trackingAction, trackingCategory, tracking.label.header);
    }}
    to={url}
  >
    {label}
  </Link>
);

interface MastheadProps {
  trackingCategory: string;
  pathname: string;
}

export const Masthead: React.FC<MastheadProps> = ({
  trackingCategory,
  pathname,
}) => (
  <div className="blog-masthead">
    <div className="container">
      <nav className="d-flex align-items-center blog-nav">
        <MastheadItem
          trackingAction={tracking.action.open_home}
          trackingCategory={trackingCategory}
          label={"Home"}
          url="/"
          active={pathname === "/"}
        />
        <MastheadItem
          trackingAction={tracking.action.open_blog}
          trackingCategory={trackingCategory}
          label={"Blog"}
          url="/blog/"
          active={pathname !== "/2017/05/10/about-me/"}
        />
        <MastheadItem
          trackingAction={tracking.action.open_about_me}
          trackingCategory={trackingCategory}
          label={"About me"}
          url="/2017/05/10/about-me/"
          active={pathname === "/2017/05/10/about-me/"}
        />
      </nav>
    </div>
  </div>
);
