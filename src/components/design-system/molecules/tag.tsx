import styled, { css, TransientProps } from "styled-components";
import { FC } from "react";
import { StandardInternalLinkWithTracking } from "../../tracking/standard-internal-link-with-tracking";
import { tracking } from "../../../logic/tracking";
import { mediaQuery } from "../utils-css/media-query";

interface TagContentProps {
  big: boolean;
}

const TagLink = styled(StandardInternalLinkWithTracking)<
  TransientProps<TagContentProps>
>`
  display: inline-block;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  ${(props) =>
    props.$big === true &&
    css`
      margin-bottom: ${(props) => props.theme.spacing[4]};
    `}
`;

const TagText = styled.span<TransientProps<TagContentProps>>`
  background-color: ${(props) => props.theme.light.primaryColor};
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  margin-right: ${(props) => props.theme.spacing[0]};
  margin-bottom: ${(props) => props.theme.spacing[0]};
  border-radius: 3px;
  font-size: ${(props) =>
    props.$big ? props.theme.fontSizes[5] : props.theme.fontSizes[1]};
  padding: 0.5px 5px;

  ${(props) =>
    props.$big &&
    css`
      display: block;
      margin-right: ${(props) => props.theme.spacing[4]};
      margin-bottom: ${(props) => props.theme.spacing[4]};
    `};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColor};
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

export type TagProps = TagContentProps & {
  link: string;
  tag: string;
  trackingCategory: string;
  trackingLabel: string;
};

export const Tag: FC<TagProps> = ({
  tag,
  link,
  big,
  trackingCategory,
  trackingLabel,
}) => (
  <TagLink
    trackingData={{
      action: tracking.action.open_blog_tag,
      category: trackingCategory,
      label: trackingLabel,
    }}
    to={link}
    $big={big}
  >
    <TagText $big={big}>{tag}</TagText>
  </TagLink>
);
