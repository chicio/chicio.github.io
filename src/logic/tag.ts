export const generateTagLink = (tag: string) =>
  `/blog/tags/${tag!.split(" ").join("-")}/`;
