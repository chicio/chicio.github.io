import React from "react";

interface PostMetaProps {
  date: string;
  readingTime: string;
}

export const PostMeta: React.FC<PostMetaProps> = ({ date, readingTime }) => (
  <p className="blog-post-meta">
    {date} · {readingTime}
  </p>
);
