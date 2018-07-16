// @flow
export type Author = {
  id?: string,
  bookCount?: number,
  created?: Date | string,
  firstName: string,
  lastName: string,
  updated?: Date | string,
};

export type AuthorErrors = {
  firstName: string,
  lastName: string,
};
