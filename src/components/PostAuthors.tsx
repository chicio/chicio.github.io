import React from "react";
import { track, tracking } from "../utils/tracking";
import { BlogAuthor, blogAuthors } from "../utils/blog-authors";
import { AuthorsImagesQuery, Maybe } from "../../graphql-types";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

interface PostAuthorsProps {
  authors: Maybe<string>[];
  trackingCategory: string;
  trackingLabel: string;
  enableUrl: boolean;
}

export const PostAuthors: React.FC<PostAuthorsProps> = ({
  authors,
  trackingCategory,
  trackingLabel,
  enableUrl,
}) => {
  const blogAuthorsImages = useStaticQuery<AuthorsImagesQuery>(graphql`
    query AuthorsImages {
      allFile(
        filter: {
          relativeDirectory: { eq: "authors" }
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            name
          }
        }
      }
    }
  `);

  return (
    <div className="blog-post-authors d-inline-flex flex-column">
      {authors.map((author) => {
        const blogAuthor: BlogAuthor = blogAuthors[author!];
        const blogAuthorImage = blogAuthorsImages.allFile.edges.find(
          (blogAuthorImage) =>
            blogAuthorImage.node.name === author!.replace("_", "-")
        )!.node!.childImageSharp!.gatsbyImageData!;

        return (
          <div
            className="blog-post-author d-inline-flex flex-row align-items-center"
            key={`${author}${Math.floor(Math.random() * 100)}`}
          >
            <GatsbyImage
              alt={blogAuthor.name}
              image={blogAuthorImage}
              style={{ width: 30, height: 30, marginRight: "5px" }}
              imgClassName={"rounded-circle"}
            />
            <span>
              {enableUrl && (
                <a
                  onClick={() =>
                    track(
                      tracking.action.open_blog_author,
                      trackingCategory,
                      trackingLabel
                    )
                  }
                  href={blogAuthor.url}
                >
                  {blogAuthor.name}
                </a>
              )}
              {!enableUrl && blogAuthor.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
