import { StandardInternalLink } from "../atoms/standard-internal-link";
import styled, { css } from "styled-components";
import React from "react";

interface TagContentProps {
  big: boolean;
}

const TagLink = styled(StandardInternalLink)<TagContentProps>`
  display: inline-block;
  height: 46px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  ${(props) =>
    props.big === true &&
    css`
      margin-bottom: ${(props) => props.theme.spacing[4]};
    `}
`;

const TagText = styled.span<TagContentProps>`
  background-color: ${(props) => props.theme.light.primaryColor};
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  margin-right: ${(props) => props.theme.spacing[0]};
  margin-bottom: ${(props) => props.theme.spacing[0]};
  border-radius: 3px;
  font-size: ${(props) =>
    props.big ? props.theme.fontSizes[5] : props.theme.fontSizes[1]};
  padding: 0.5px 5px;

  ${(props) =>
    props.big &&
    css`
      display: block;
      margin-right: ${(props) => props.theme.spacing[4]};
      margin-bottom: ${(props) => props.theme.spacing[4]};
    `};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

type TagProps = TagContentProps & {
  link: string;
  tag: string;
};

export const Tag: React.FC<TagProps> = ({ tag, link, big }) => (
  <TagLink to={link} big={big}>
    <TagText big={big}>{tag}</TagText>
  </TagLink>
);
