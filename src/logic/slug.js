const allSlugs = {
  blog: "/blog/",
  tags: "/blog/tags/",
  archive: "/blog/archive/",
  aboutMe: "/2017/05/10/about-me/",
  art: "/art/",
};

exports.slugs = allSlugs;

exports.generateTagSlug = (tag) =>
  `${allSlugs.tags}${tag.split(" ").join("-")}/`;

exports.generatePostSlug = (filename) => {
  const [year, month, day, ...title] = filename.substring(1).split("-");
  return `/${year}/${month}/${day}/${title.join("-")}`;
};
