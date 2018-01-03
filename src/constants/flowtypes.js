// @flow
export type FbDoc = {
  id: string,
  data: Function,
}

export type FbDocRef = {
  get: Function,
  update: Function,
};

export type FbCollection = {
  docs: FbDoc[],
};

export type Author = {
  id?: string,
  created?: Date | string,
  updated?: Date | string,
  firstName: string,
  lastName: string,
};

export type Book = {
  id?: string,
  created?: Date | string,
  updated?: Date | string,
  title: string,
  author: Author,
  authorId?: string,
};

export type BookErrors = {
  found?: boolean,
  title: string,
  author: string,
};

export type User = {
  id?: string,
  registered?: Date | string,
  lastLogin?: Date | string,
  email: string,
  password?: string,
};
