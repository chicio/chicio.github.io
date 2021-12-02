import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { RecentPostsQuery } from "../../../../graphql-types";
import { Heading4 } from "../atoms/heading4";
import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";
import { useShuffleArray } from "../hooks/use-shuffle-array";
import { PostsRow } from "../molecules/posts-row";

const ReadNextTitle = styled(Heading4)`
  margin: ${(props) => props.theme.spacing[2]} 0;
`;

const CardsContainer = styled.div`
  display: block;
  width: 100%;

  ${mediaQuery.minWidth.md} {
    display: flex;
    flex-direction: row;
  }
`;

const ReadNextContainer = styled.div`
  margin: ${(props) => props.theme.spacing[4]} 0;
`;

export interface RecentPostsProps {
  currentSlug: string;
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ currentSlug }) => {
  const data = useStaticQuery<RecentPostsQuery>(
    graphql`
      query RecentPosts {
        allMarkdownRemark(
          limit: 15
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                description
                authors
                tags
                date(formatString: "DD MMM YYYY")
                image {
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const readNextPosts = useShuffleArray(
    data.allMarkdownRemark.edges.filter(
      (post) => post.node!.fields!.slug !== currentSlug
    )
  ).slice(0, 2);

  return (
    <ReadNextContainer>
      <ReadNextTitle>Read next</ReadNextTitle>
      <CardsContainer>
        <PostsRow postsGroup={readNextPosts} />
      </CardsContainer>
    </ReadNextContainer>
  );
};

export default RecentPosts;
