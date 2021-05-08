import React from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { PostMeta } from "../components/design-system/molecules/post-meta";
import { PostQuery } from "../../graphql-types";
import { PostAuthors } from "../components/design-system/molecules/post-authors";
import { getSrc } from "gatsby-plugin-image";
import { BlogPage } from "../components/design-system/templates/blog-page";
import { Heading2 } from "../components/design-system/atoms/heading2";
import { PostContent } from "../components/post-content";
import styled from "styled-components";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";
import loadable from "@loadable/component";

const PostTitle = styled(Heading2)`
  margin: 0;
`;

const RecentPosts = loadable(
  () => import(`../components/design-system/organism/recent-posts`)
);

const PostTags = loadable(
  () => import(`../components/design-system/molecules/post-tags`)
);

const Comments = loadable(
  () => import(`../components/design-system/molecules/comments`)
);

const Post: React.FC<PageProps<PostQuery>> = ({ data, location }) => {
  const post = data.markdownRemark!;
  const title = post.frontmatter!.title!;

  if (post.frontmatter?.math === true) {
    require("katex/dist/katex.min.css");
  }

  return (
    <BlogPage
      location={getCurrentLocationFrom(location)}
      author={data.site!.siteMetadata!.author!}
      ogPageType={OgPageType.BlogPosting}
      ogImage={`${getSrc(
        post.frontmatter!.image!.childImageSharp?.gatsbyImageData
      )!}`}
      trackingCategory={tracking.category.blog_post}
      customTitle={title}
      description={post.frontmatter!.description!}
      date={post.frontmatter!.date!}
    >
      <div>
        <PostTitle className="blog-post-title">
          {post.frontmatter!.title}
        </PostTitle>
        <PostAuthors
          authors={post.frontmatter!.authors!}
          trackingCategory={tracking.category.blog_post}
          trackingLabel={tracking.label.body}
          enableUrl={true}
        />
        <PostMeta
          date={post.frontmatter!.date!}
          readingTime={post.fields!.readingTime!.text!}
        />
        <PostContent html={post.html!} />
        <PostTags
          tags={post.frontmatter!.tags!}
          trackingCategory={tracking.category.blog_post}
          trackingLabel={tracking.label.body}
        />
      </div>
      <RecentPosts currentSlug={location.pathname} />
      {post.frontmatter?.comments && (
        <Comments url={location.href} title={title} />
      )}
    </BlogPage>
  );
};

export default Post;

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        comments
        authors
        tags
        date(formatString: "DD MMM YYYY")
        description
        math
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;
