export const sortByDate = (a, b) => {
  return (
    Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date))
  );
};
