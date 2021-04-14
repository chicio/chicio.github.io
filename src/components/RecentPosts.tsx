import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { RecentPostsQuery } from "../../graphql-types";
import { track, tracking } from "../utils/tracking";
import { GatsbyImage } from "gatsby-plugin-image";

interface RecentPostsProps {
  currentSlug: string;
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ currentSlug }) => {
  const data = useStaticQuery<RecentPostsQuery>(
    graphql`
      query RecentPosts {
        allMarkdownRemark(
          limit: 4
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                image {
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH)
                  }
                }
                title
                description
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  return (
    <div className="recent-posts">
      <h3>Recent posts</h3>
      <div className="cards">
        {data.allMarkdownRemark.edges
          .filter((post) => post.node!.fields!.slug !== currentSlug)
          .slice(0, 3)
          .map((post) => (
            <div className="col-lg-4" key={post.node.fields!.slug!}>
              <div className="card">
                <GatsbyImage
                  className={"img-container"}
                  alt={post.node.frontmatter!.title!}
                  image={
                    post.node.frontmatter!.image!.childImageSharp!
                      .gatsbyImageData!
                  }
                />
                <h4>{post.node.frontmatter!.title}</h4>
                <p>{post.node.frontmatter?.description}</p>
                <Link
                  key={`${post.node.fields!.slug!}link`}
                  to={post.node.fields!.slug!}
                  onClick={() =>
                    track(
                      tracking.action.open_blog_post,
                      tracking.category.blog_post,
                      tracking.label.body
                    )
                  }
                  className="card-button"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
