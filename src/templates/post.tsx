import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.blog.post.scss";
import { graphql, Link, PageProps } from "gatsby";
import { Menu } from "../components/design-system/organism/menu";
import { tracking } from "../utils/tracking";
import { PullToRefresh } from "../components/PullToRefresh";
import { BlogHeader } from "../components/BlogHeader";
import { Footer } from "../components/Footer";
import { Comments } from "../components/Comments";
import { PostMeta } from "../components/PostMeta";
import { PostQuery } from "../../graphql-types";
import { PostAuthors } from "../components/PostAuthors";
import { RecentPosts } from "../components/RecentPosts";
import { Head } from "../components/Head";
import { getSrc } from "gatsby-plugin-image";
import { Page } from "../components/design-system/templates/page";

const Post: React.FC<PageProps<PostQuery>> = ({ data, location }) => {
  const post = data.markdownRemark!;

  if (post.frontmatter?.math === true) {
    require("katex/dist/katex.min.css");
  }

  return (
    <Page>
      <Head
        url={location.href}
        pageType={"article"}
        imageUrl={`${getSrc(
          post.frontmatter!.image!.childImageSharp?.gatsbyImageData
        )!}`}
        customTitle={post.frontmatter!.title!}
        date={post.frontmatter!.date}
        description={post.frontmatter!.description!}
      />
      <Menu
        trackingCategory={tracking.category.blog_home}
        pathname={location.pathname}
      />
      <PullToRefresh />
      <div className="container blog-posts start-pull pullable-content">
        <BlogHeader trackingCategory={tracking.category.blog_post} />
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
            <div className="blog-tags">
              {post.frontmatter!.tags!.map((tag) => (
                <Link to={`/blog/tags/${tag!.split(" ").join("-")}/`} key={tag}>
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <RecentPosts currentSlug={location.pathname} />
        {post.frontmatter?.comments && (
          <Comments url={location.href} title={post.frontmatter!.title!} />
        )}
      </div>
      <Footer
        author={data.site!.siteMetadata!.author!}
        trackingCategory={tracking.category.blog_post}
        trackingLabel={tracking.label.footer}
      />
    </Page>
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
