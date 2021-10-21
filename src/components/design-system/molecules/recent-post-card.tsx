import styled from "styled-components";
import { Heading6 } from "../atoms/heading6";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { Paragraph } from "../atoms/paragraph";
import { tracking } from "../../../logic/tracking";
import { CallToActionInternalWithTracking } from "../../call-to-action-internal-with-tracking";
import { mediaQuery } from "../utils-css/media-query";

const CardButton = styled(CallToActionInternalWithTracking)`
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

  ${mediaQuery.minWidth.md} {
    ${mediaQuery.inputDevice.mouse} {
      margin: 0 ${(props) => (props.margin ? props.theme.spacing[2] : "")};
      transition: all 0.2s;

      &:hover {
        transform: scale(1.025);
      }
    }
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    box-shadow: ${(props) => props.theme.dark.boxShadowLight} 0 3px 10px 0;
  }
`;

export interface RecentPostCardProps {
  position: number;
  slug: string;
  title: string;
  image: IGatsbyImageData;
  description: string;
  trackingCategory: string;
  trackingLabel: string;
}

export const RecentPostCard: React.FC<RecentPostCardProps> = ({
  position,
  slug,
  title,
  image,
  description,
  trackingCategory,
  trackingLabel,
}) => (
  <CardContainer margin={position === 1}>
    <GatsbyImage
      style={{ overflow: "hidden", height: "200px" }}
      imgStyle={{
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      alt={title}
      image={image}
    />
    <CardDescriptionContainer>
      <CardHeading>{title}</CardHeading>
      <Paragraph>
        {description.length! > 150
          ? `${description?.substr(0, 150)}...`
          : description}
      </Paragraph>
      <CardButton
        key={`${slug}link`}
        to={slug}
        trackingData={{
          action: tracking.action.open_blog_post,
          category: trackingCategory,
          label: trackingLabel,
        }}
      >
        Read More
      </CardButton>
    </CardDescriptionContainer>
  </CardContainer>
);
