export const sortByLastName = (authors) =>
  authors.sort((a, b) => {
    return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1;
  });
