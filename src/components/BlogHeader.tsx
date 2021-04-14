import React from "react";
import { track, tracking } from "../utils/tracking";
import { StaticImage } from "gatsby-plugin-image";

interface BlogHeaderProps {
  trackingCategory: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ trackingCategory }) => (
  <div className="blog-header d-flex flex-row align-items-center">
    <StaticImage
      className={"mr-2"}
      imgClassName="img-responsive blog-logo"
      src={"../images/blog-logo.jpg"}
      alt={"blog logo"}
      width={80}
      height={80}
    />
    <div className="d-flex flex-column">
      <h1 className="blog-title">
        <a
          onClick={() => {
            track(
              tracking.action.open_blog,
              trackingCategory,
              tracking.label.header
            );
          }}
          href="/blog/"
        >
          CHICIO CODING
        </a>
      </h1>
      <h2 className="lead blog-description">
        Dirty clean code. Creative Stuff. Stuff.
      </h2>
    </div>
  </div>
);
