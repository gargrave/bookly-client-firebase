// @flow
import type { Author } from './authorFlowtypes';

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

export type BookBucket = {
  author: string,
  books: Book[],
}
