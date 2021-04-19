import React from "react";
import "../styles/post-content.css";
import "../styles/syntax.css";

interface PostContentProps {
  html: string;
}

export const PostContent: React.FC<PostContentProps> = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);
