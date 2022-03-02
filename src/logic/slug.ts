export const slugs = {
  blog: "/blog/",
  tags: "/blog/tags/",
  archive: "/blog/archive/",
  aboutMe: "/2017/05/10/about-me/",
  art: "/art/",
};

export const generateTagSlug = (tag: string) =>
  `${slugs.tags}${tag.split(" ").join("-")}/`;

export const generatePostSlug = (filename: string) => {
  const [year, month, day, ...title] = filename.substring(1).split("-");
  return `/${year}/${month}/${day}/${title.join("-")}`;
};
