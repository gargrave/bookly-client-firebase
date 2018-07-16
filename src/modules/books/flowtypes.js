// @flow
import type { Author } from '../authors/flowtypes';

export type Book = {
  id?: string,
  author: Author,
  authorId?: string,
  created?: Date | string,
  title: string,
  updated?: Date | string,
};

export type BookErrors = {
  found?: boolean,
  author: string,
  title: string,
};

export type BookBucket = {
  author: string,
  books: Book[],
}
