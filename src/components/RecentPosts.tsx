import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { RecentPostsQuery } from "../../graphql-types";
import { track, tracking } from "../utils/tracking";
import { GatsbyImage } from "gatsby-plugin-image";
import { Heading4 } from "./design-system/atoms/heading4";
import { InternalCallToAction } from "./design-system/atoms/internal-call-to-action";
import { Paragraph } from "./design-system/atoms/paragraph";
import styled from "styled-components";
import { Heading6 } from "./design-system/atoms/heading6";

interface RecentPostsProps {
  currentSlug: string;
}

const CardButton = styled(InternalCallToAction)`
  margin-top: auto;
  display: block;
`;

const CardDescriptionContainer = styled.div`
  margin: ${(props) => props.theme.spacing[3]};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardHeading = styled(Heading6)`
  margin-bottom: ${(props) => props.theme.spacing[3]};
  margin-right: 0;
  margin-left: 0;
`;

interface CardContainerProps {
  margin: boolean;
}

const CardContainer = styled.div<CardContainerProps>`
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  box-shadow: ${(props) => props.theme.light.boxShadowLight} 0 3px 10px 0;
  width: 100%;
  border-radius: 4px;
  border: none;
  margin: ${(props) => props.theme.spacing[2]} 0 0 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    margin: 0 ${(props) => (props.margin ? props.theme.spacing[2] : "")};
    transition: all 0.2s;
    &:hover {
      transform: scale(1.025);
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    box-shadow: ${(props) => props.theme.dark.boxShadowLight} 0 3px 10px 0;
  }
`;

const RecentTitle = styled(Heading4)`
  margin: ${(props) => props.theme.spacing[2]} 0;
`;

export const RecentPosts: React.FC<RecentPostsProps> = ({ currentSlug }) => {
  const data = useStaticQuery<RecentPostsQuery>(
    graphql`
      query RecentPosts {
        allMarkdownRemark(
          limit: 4
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                image {
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH)
                  }
                }
                title
                description
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  return (
    <div className="recent-posts">
      <RecentTitle>Recent posts</RecentTitle>
      <div className="cards">
        {data.allMarkdownRemark.edges
          .filter((post) => post.node!.fields!.slug !== currentSlug)
          .slice(0, 3)
          .map((post, index) => (
            <CardContainer
              key={post.node.fields!.slug!}
              margin={index == 1 ? true : false}
            >
              <GatsbyImage
                className={"img-container"}
                style={{ overflow: "hidden", height: "200px" }}
                imgStyle={{
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt={post.node.frontmatter!.title!}
                image={
                  post.node.frontmatter!.image!.childImageSharp!
                    .gatsbyImageData!
                }
              />
              <CardDescriptionContainer>
                <CardHeading>{post.node.frontmatter!.title}</CardHeading>
                <Paragraph>
                  {post.node.frontmatter!.description!.length! > 150
                    ? `${post.node.frontmatter?.description?.substr(0, 150)}...`
                    : post.node.frontmatter?.description}
                </Paragraph>
                <CardButton
                  key={`${post.node.fields!.slug!}link`}
                  to={post.node.fields!.slug!}
                  onClick={() =>
                    track(
                      tracking.action.open_blog_post,
                      tracking.category.blog_post,
                      tracking.label.body
                    )
                  }
                >
                  Read More
                </CardButton>
              </CardDescriptionContainer>
            </CardContainer>
          ))}
      </div>
    </div>
  );
};
