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
  created?: Date,
  updated?: Date,
  firstName: string,
  lastName: string,
};

export type Book = {
  id?: string,
  created?: Date,
  updated?: Date,
  title: string,
  author: Author,
  authorId?: string,
};

export type User = {
  id?: string,
  registered?: string,
  lastLogin?: string,
  email: string,
  password?: string,
};
