import React from "react";
import { track, tracking } from "../../../utils/tracking";
import { BlogAuthor, blogAuthors } from "../../../utils/blog-authors";
import { AuthorsImagesQuery, Maybe } from "../../../../graphql-types";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { GatsbyImage } from "gatsby-plugin-image";
import { Paragraph } from "../atoms/paragraph";
import { StandardInternalLink } from "../atoms/standard-internal-link";

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

interface PostAuthorsProps {
  authors: Maybe<string>[];
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
              gatsbyImageData(layout: FULL_WIDTH)
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
            <GatsbyImage
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
                <StandardInternalLink
                  onClick={() =>
                    track(
                      tracking.action.open_blog_author,
                      trackingCategory,
                      trackingLabel
                    )
                  }
                  to={blogAuthor.url}
                >
                  {blogAuthor.name}
                </StandardInternalLink>
              )}
              {!enableUrl && blogAuthor.name}
            </Paragraph>
          </PostAuthorContainer>
        );
      })}
    </PostAuthorsContainer>
  );
};
