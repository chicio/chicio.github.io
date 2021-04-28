import React from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../../logic/tracking";
import { PostsGroupByTagsQuery } from "../../../graphql-types";
import { BlogPage } from "../../components/design-system/templates/blog-page";
import { Tag } from "../../components/design-system/molecules/tag";
import { ContainerFluid } from "../../components/design-system/atoms/container-fluid";
import styled from "styled-components";
import { PageTitle } from "../../components/design-system/molecules/page-title";
import { generateTagLink } from "../../logic/tag";
import { OgPageType } from "../../logic/seo";
import { getCurrentLocationFrom } from "../../logic/url";

const TagsContainer = styled(ContainerFluid)`
  padding: 0;
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const TagsPage: React.FC<PageProps<PostsGroupByTagsQuery>> = ({
  data,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPage
      location={getCurrentLocationFrom(location)}
      author={author}
      ogPageType={OgPageType.website}
      ogImage={`/${featuredImage}`}
      trackingCategory={tracking.category.blog_tags}
    >
      <TagsContainer>
        <PageTitle>Tags</PageTitle>
        {data.allMarkdownRemark.group.map((tag) => (
          <Tag
            big={true}
            link={generateTagLink(tag.fieldValue!)}
            tag={`${tag.fieldValue} (${tag.totalCount})`}
            key={tag.fieldValue}
          />
        ))}
      </TagsContainer>
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
