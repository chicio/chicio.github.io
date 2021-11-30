import { Tag } from "./tag";
import React from "react";
import styled from "styled-components";
import { generateTagSlug } from "../../../logic/slug";

export interface PostTagsProps {
  tags: Array<string | null | undefined>;
  trackingCategory: string;
  trackingLabel: string;
}

const PostTagsContainer = styled.div`
  margin: ${(props) => props.theme.spacing[2]} 0;
`;

export const PostTags: React.FC<PostTagsProps> = ({
  tags,
  trackingCategory,
  trackingLabel,
}) => (
  <PostTagsContainer>
    {tags!.map((tag) => (
      <Tag
        tag={tag!}
        link={generateTagSlug(tag!)}
        big={false}
        key={tag}
        trackingCategory={trackingCategory}
        trackingLabel={trackingLabel}
      />
    ))}
  </PostTagsContainer>
);

export default PostTags;
