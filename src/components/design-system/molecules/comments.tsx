import React from "react";
import { DiscussionEmbed } from "disqus-react";

interface CommentsProps {
  url: string;
  title: string;
}

export const Comments: React.FC<CommentsProps> = ({ url, title }) => {
  return (
    <DiscussionEmbed
      shortname={"fabrizio-duroni"}
      config={{ identifier: url, url, title }}
    />
  );
};
