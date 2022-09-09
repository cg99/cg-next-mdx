export const sortByDate = (a, b) => {
  return (
    Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date))
  );
};

export const setThemeMode = (mode) => {
  if (mode === "system") {
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  } else {
    localStorage.theme = mode;
  }
};
