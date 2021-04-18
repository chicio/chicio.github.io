import React from "react";
import "../styles/style.blog.post.scss";
import "../styles/syntax.css";
import "../styles/youtube.css";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../utils/tracking";
import { Comments } from "../components/design-system/molecules/comments";
import { PostMeta } from "../components/design-system/molecules/post-meta";
import { PostQuery } from "../../graphql-types";
import { PostAuthors } from "../components/design-system/molecules/post-authors";
import { RecentPosts } from "../components/RecentPosts";
import { getSrc } from "gatsby-plugin-image";
import { BlogPage } from "../components/design-system/templates/blog-page";
import { PostTags } from "../components/design-system/molecules/post-tags";

const Post: React.FC<PageProps<PostQuery>> = ({ data, location }) => {
  const post = data.markdownRemark!;

  if (post.frontmatter?.math === true) {
    require("katex/dist/katex.min.css");
  }

  return (
    <BlogPage
      location={location}
      author={data.site!.siteMetadata!.author!}
      ogPageType={"article"}
      ogImage={`${getSrc(
        post.frontmatter!.image!.childImageSharp?.gatsbyImageData
      )!}`}
      trackingCategory={tracking.category.blog_post}
    >
      <div className="blog-main">
        <div className="blog-post" id="blog-post-math-content">
          <h2 className="blog-post-title">{post.frontmatter!.title}</h2>
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
          <div dangerouslySetInnerHTML={{ __html: post.html! }} />
          <PostTags tags={post.frontmatter!.tags!} />
        </div>
      </div>
      <RecentPosts currentSlug={location.pathname} />
      {post.frontmatter?.comments && (
        <Comments url={location.href} title={post.frontmatter!.title!} />
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
