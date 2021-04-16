import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/style.blog.tags.scss";
import { graphql, Link, PageProps } from "gatsby";
import { tracking } from "../../utils/tracking";
import { PostsGroupByTagsQuery } from "../../../graphql-types";
import { BlogPage } from "../../components/design-system/templates/blog-page";

const TagsPage: React.FC<PageProps<PostsGroupByTagsQuery>> = ({
  data,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPage
      location={location}
      author={author}
      ogPageType={"website"}
      ogImage={`/${featuredImage}`}
      trackingCategory={tracking.category.blog_tags}
    >
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
    </BlogPage>
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
