import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { RecentPostsQuery } from "../../../../graphql-types";
import { tracking } from "../../../utils/tracking";
import { Heading4 } from "../atoms/heading4";
import styled from "styled-components";
import { RecentPostCard } from "../molecules/recent-post-card";

const RecentTitle = styled(Heading4)`
  margin: ${(props) => props.theme.spacing[2]} 0;
`;

const CardsContainer = styled.div`
  display: block;
  width: 100%;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: row;
  }
`;

const RecentPostsContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

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
    <RecentPostsContainer>
      <RecentTitle>Recent posts</RecentTitle>
      <CardsContainer>
        {data.allMarkdownRemark.edges
          .filter((post) => post.node!.fields!.slug !== currentSlug)
          .slice(0, 3)
          .map((post, index) => (
            <RecentPostCard
              key={post.node.fields!.slug!}
              position={index}
              slug={post.node.fields!.slug!}
              title={post.node.frontmatter!.title!}
              image={
                post.node.frontmatter!.image!.childImageSharp!.gatsbyImageData!
              }
              description={post.node.frontmatter!.description!}
              trackingCategory={tracking.category.blog_post}
              trackingLabel={tracking.label.body}
            />
          ))}
      </CardsContainer>
    </RecentPostsContainer>
  );
};
