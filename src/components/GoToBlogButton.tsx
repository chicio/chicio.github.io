import { track, tracking } from "../utils/tracking";
import * as React from "react";
import { Link } from "gatsby";

export const GoToBlogButton: React.FC = () => (
  <div
    id="center-content-buttons"
    className="center-content center-content-buttons"
  >
    <Link
      className="profile-icon"
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
    </Link>
  </div>
);
