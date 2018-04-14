export const sortByAuthorLastName = (books) =>
  books
  .sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  })
  .sort((a, b) => {
    return a.author.lastName.toLowerCase() > b.author.lastName.toLowerCase() ? 1 : -1;
  });
