import { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../../logic/tracking";
import { BlogPageTemplate } from "../../components/design-system/templates/blog-page-template";
import { Tag } from "../../components/design-system/molecules/tag";
import { ContainerFluid } from "../../components/design-system/atoms/container-fluid";
import styled from "styled-components";
import { PageTitle } from "../../components/design-system/molecules/page-title";
import { OgPageType } from "../../logic/seo";
import { getCurrentLocationFrom } from "../../logic/current-location";
import { generateTagSlug } from "../../logic/slug";

const TagsContainer = styled(ContainerFluid)`
  padding: 0;
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const TagsPage: FC<PageProps<Queries.PostsGroupByTagsQuery>> = ({
  data,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPageTemplate
      location={getCurrentLocationFrom(location)}
      author={author}
      ogPageType={OgPageType.WebSite}
      ogImage={featuredImage}
      trackingCategory={tracking.category.blog_tags}
    >
      <TagsContainer>
        <PageTitle>Tags</PageTitle>
        {data.allMarkdownRemark.group.map((tag) => (
          <Tag
            big={true}
            link={generateTagSlug(tag!.fieldValue!)}
            tag={`${tag!.fieldValue} (${tag!.totalCount})`}
            key={tag!.fieldValue}
            trackingCategory={tracking.category.blog_tags}
            trackingLabel={tracking.label.body}
          />
        ))}
      </TagsContainer>
    </BlogPageTemplate>
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
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
