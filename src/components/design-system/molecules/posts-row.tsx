import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";
import { PostCard } from "./post-card";
import { tracking } from "../../../logic/tracking";

const PostsRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaQuery.minWidth.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

interface PostsRowProps {
  postsGroup: {
    node: {
      fields?:
        | {
            slug?: string | null | undefined;
            readingTime?:
              | { text?: string | null | undefined }
              | null
              | undefined;
          }
        | null
        | undefined;
      frontmatter?:
        | {
            title?: string | null | undefined;
            description?: string | null | undefined;
            authors?: Array<string | null | undefined> | null | undefined;
            tags?: Array<string | null | undefined> | null | undefined;
            date?: any;
            image?:
              | {
                  childImageSharp?: { gatsbyImageData: any } | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined;
    };
  }[];
}

export const PostsRow: React.FC<PostsRowProps> = ({ postsGroup }) => (
  <PostsRowContainer>
    <PostCard
      big={false}
      key={postsGroup[0].node.fields!.slug!}
      slug={postsGroup[0].node.fields!.slug!}
      title={postsGroup[0].node.frontmatter!.title!}
      image={
        postsGroup[0].node.frontmatter!.image!.childImageSharp!.gatsbyImageData
      }
      authors={postsGroup[0].node.frontmatter!.authors!}
      date={postsGroup[0].node.frontmatter!.date!}
      readingTime={postsGroup[0].node.fields!.readingTime!.text!}
      description={postsGroup[0].node.frontmatter!.description!}
      trackingCategory={tracking.category.blog_home}
      tags={postsGroup[0].node.frontmatter!.tags}
    />
    {postsGroup[1] && (
      <PostCard
        big={false}
        key={postsGroup[1].node.fields!.slug!}
        slug={postsGroup[1].node.fields!.slug!}
        title={postsGroup[1].node.frontmatter!.title!}
        image={
          postsGroup[1].node.frontmatter!.image!.childImageSharp!
            .gatsbyImageData
        }
        authors={postsGroup[1].node.frontmatter!.authors!}
        date={postsGroup[1].node.frontmatter!.date!}
        readingTime={postsGroup[1].node.fields!.readingTime!.text!}
        description={postsGroup[1].node.frontmatter!.description!}
        trackingCategory={tracking.category.blog_home}
        tags={postsGroup[1].node.frontmatter!.tags}
      />
    )}
  </PostsRowContainer>
);
