import { Tag } from "./tag";
import { generateTagUrl } from "../../../logic/url";
import React from "react";
import styled from "styled-components";
import { Maybe } from "../../../../graphql-types";

export interface PostTagsProps {
  tags: Maybe<string>[];
}

const PostTagsContainer = styled.div`
  margin: ${(props) => props.theme.spacing[4]} 0;
`;

export const PostTags: React.FC<PostTagsProps> = ({ tags }) => (
  <PostTagsContainer>
    {tags!.map((tag) => (
      <Tag tag={tag!} link={generateTagUrl(tag!)} big={false} key={tag} />
    ))}
  </PostTagsContainer>
);
