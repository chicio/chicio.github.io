import React from "react";
import { tracking } from "../../../logic/tracking";
import { BlogAuthor, blogAuthors } from "../../../logic/blog-authors";
import { AuthorsImagesQuery } from "../../../../graphql-types";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { GatsbyImage } from "gatsby-plugin-image";
import { Paragraph } from "../atoms/paragraph";
import { StandardExternalLinkWithTracking } from "../../standard-external-link-with-tracking";
import { mediaQuery } from "../utils-css/media-query";
import { gatsbyImagePlaceholderSelector } from "../utils-css/gatsby-image-selector";

const PostAuthorsContainer = styled(ContainerFluid)`
  padding: 0;
  margin: ${(props) => props.theme.spacing[2]} 0;
  display: flex;
  flex-direction: column;
`;

const PostAuthorContainer = styled(ContainerFluid)`
  padding: 0;
  margin-top: ${(props) => props.theme.spacing[0]};
  display: flex;
  align-items: center;
`;

const PostAuthorImage = styled(GatsbyImage)`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;

  ${gatsbyImagePlaceholderSelector} {
    border-radius: 50%;
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.dividerColor};
  }
`;

export interface PostAuthorsProps {
  authors: Array<string | null | undefined>;
  trackingCategory: string;
  trackingLabel: string;
  enableUrl: boolean;
}

export const PostAuthors: React.FC<PostAuthorsProps> = ({
  authors,
  trackingCategory,
  trackingLabel,
  enableUrl,
}) => {
  const blogAuthorsImages = useStaticQuery<AuthorsImagesQuery>(graphql`
    query AuthorsImages {
      allFile(
        filter: {
          relativeDirectory: { eq: "authors" }
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
            name
          }
        }
      }
    }
  `);

  return (
    <PostAuthorsContainer>
      {authors.map((author) => {
        const blogAuthor: BlogAuthor = blogAuthors[author!];
        const blogAuthorImage = blogAuthorsImages.allFile.edges.find(
          (blogAuthorImage) =>
            blogAuthorImage.node.name === author!.replace("_", "-")
        )!.node!.childImageSharp!.gatsbyImageData!;

        return (
          <PostAuthorContainer
            key={`${author}${Math.floor(Math.random() * 100)}`}
          >
            <PostAuthorImage
              alt={blogAuthor.name}
              image={blogAuthorImage}
              style={{
                width: 30,
                height: 30,
                marginRight: "5px",
                borderRadius: "50%",
              }}
              imgStyle={{ borderRadius: "50%" }}
            />
            <Paragraph>
              {enableUrl && (
                <StandardExternalLinkWithTracking
                  trackingData={{
                    action: tracking.action.open_blog_author,
                    category: trackingCategory,
                    label: trackingLabel,
                  }}
                  href={blogAuthor.url}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  {blogAuthor.name}
                </StandardExternalLinkWithTracking>
              )}
              {!enableUrl && blogAuthor.name}
            </Paragraph>
          </PostAuthorContainer>
        );
      })}
    </PostAuthorsContainer>
  );
};
