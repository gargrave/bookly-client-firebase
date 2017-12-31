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
  id?: string | number,
  title: string,
  author: Author,
  createdAt?: string,
  updatedAt?: string,
};

export type User = {
  id?: string | number,
  email: string,
  password?: string,
  createdAt?: string,
  updatedAt?: string,
};
