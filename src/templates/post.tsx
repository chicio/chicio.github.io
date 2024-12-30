import { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { PostMeta } from "../components/design-system/molecules/post-meta";
import { PostAuthors } from "../components/design-system/molecules/post-authors";
import { getSrc } from "gatsby-plugin-image";
import { BlogPageTemplate } from "../components/design-system/templates/blog-page-template";
import { Heading2 } from "../components/design-system/atoms/heading2";
import { PostContent } from "../components/design-system/post-content";
import styled from "styled-components";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";
import { RecentPosts } from "../components/design-system/organism/read-next";
import { PostTags } from "../components/design-system/molecules/post-tags";
import { Comments } from "../components/design-system/molecules/comments";

const PostTitle = styled(Heading2)`
  margin: 0;
  word-wrap: break-word;
`;

const PostContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing[5]};
`;

const Post: FC<PageProps<Queries.PostQuery>> = ({ data, location }) => {
  const post = data.markdownRemark!;
  const title = post.frontmatter!.title!;
  const currentLocation = getCurrentLocationFrom(location);

  if (post.frontmatter?.math === true) {
    require("katex/dist/katex.min.css");
  }

  return (
    <BlogPageTemplate
      location={currentLocation}
      author={data.site!.siteMetadata!.author!}
      ogPageType={OgPageType.BlogPosting}
      ogImage={`${getSrc(
        post.frontmatter!.image!.childImageSharp!.gatsbyImageData!,
      )!}`}
      trackingCategory={tracking.category.blog_post}
      customTitle={title}
      description={post.frontmatter!.description!}
      date={post.frontmatter!.date!}
      keywords={post.frontmatter!.tags!}
    >
      <PostContainer>
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
      </PostContainer>
      <>
        <RecentPosts currentSlug={location.pathname} />
        {post.frontmatter?.comments && (
          <Comments url={location.href} title={title} />
        )}
      </>
    </BlogPageTemplate>
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
