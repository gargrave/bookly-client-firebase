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
  firstName: string,
  lastName: string,
  createdAt?: Date,
  updatedAt?: Date,
  created?: Date,
  updated?: Date,
};

export type Book = {
  id: string,
  title: string,
  author: Author,
  authorId: string,
  createdAt: Date,
  updatedAt: Date,
  created: Date,
  updated: Date,
};

export type User = {
  id?: string | number,
  email: string,
  password?: string,
  createdAt?: string,
  updatedAt?: string,
};
