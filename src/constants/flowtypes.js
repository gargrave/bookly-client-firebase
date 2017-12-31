// @flow
export type FirebaseDoc = {
  id: string,
  data: Function,
}

export type Author = {
  id?: string,
  firstName: string,
  lastName: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
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
