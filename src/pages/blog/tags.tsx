import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/style.blog.tags.scss";
import "@fontsource/open-sans";
import { Link, graphql, PageProps } from "gatsby";
import { Head } from "../../components/Head";
import { Masthead } from "../../components/Masthead";
import { tracking } from "../../utils/tracking";
import { PostsGroupByTagsQuery } from "../../../graphql-types";
import { Footer } from "../../components/Footer";
import { BlogHeader } from "../../components/BlogHeader";

const TagsPage: React.FC<PageProps<PostsGroupByTagsQuery>> = ({
  data,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <main>
      <Head
        url={location.href}
        pageType={"website"}
        imageUrl={`/${featuredImage}`}
      />
      <Masthead
        trackingCategory={tracking.category.blog_archive}
        pathname={location.pathname}
      />
      <div className="container blog-posts">
        <BlogHeader trackingCategory={tracking.category.blog_tags} />
        <div className="blog-tags-list">
          <div className="blog-main">
            <div className="blog-tags">
              {data.allMarkdownRemark.group.map((tag) => (
                <Link
                  to={`/blog/tags/${tag.fieldValue!.split(" ").join("-")}/`}
                  key={tag.fieldValue}
                >
                  <span className={"big"}>
                    {tag.fieldValue} ({tag.totalCount})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer
        author={author}
        trackingCategory={tracking.category.blog_tags}
        trackingLabel={tracking.label.footer}
      />
    </main>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query PostsGroupByTags {
    site {
      siteMetadata {
        title
        author
        featuredImage
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
