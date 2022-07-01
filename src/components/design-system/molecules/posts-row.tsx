import { FC } from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";
import { PostCard } from "./post-card";
import { tracking } from "../../../logic/tracking";
import { IGatsbyImageData } from "gatsby-plugin-image";

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
      readonly fields: {
        readonly slug: string | null;
        readonly readingTime: { readonly text: string | null } | null;
      } | null;
      readonly frontmatter: {
        readonly title: string | null;
        readonly description: string | null;
        readonly authors: ReadonlyArray<string | null> | null;
        readonly tags: ReadonlyArray<string | null> | null;
        readonly date: string | null;
        readonly image: {
          readonly childImageSharp: {
            readonly gatsbyImageData: IGatsbyImageData;
          } | null;
        } | null;
      } | null;
    };
  }[];
}

export const PostsRow: FC<PostsRowProps> = ({ postsGroup }) => (
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
      tags={postsGroup[0].node.frontmatter!.tags!}
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
        tags={postsGroup[1].node.frontmatter!.tags!}
      />
    )}
  </PostsRowContainer>
);
