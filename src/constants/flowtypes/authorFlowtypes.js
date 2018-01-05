// @flow
export type Author = {
  id?: string,
  created?: Date | string,
  updated?: Date | string,
  firstName: string,
  lastName: string,
};

export type AuthorErrors = {
  firstName: string,
  lastName: string,
};
