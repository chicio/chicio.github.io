import { FC } from "react";
import { DiscussionEmbed } from "disqus-react";
import styled from "styled-components";

interface CommentsProps {
  url: string;
  title: string;
}

const CommentsContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[7]};

  #thread__container {
    font-family: "Open Sans", Arial, sans-serif;
  }
`;

export const Comments: FC<CommentsProps> = ({ url, title }) => (
  <CommentsContainer>
    <DiscussionEmbed
      shortname={"fabrizio-duroni"}
      config={{ identifier: url, url, title }}
    />
  </CommentsContainer>
);
