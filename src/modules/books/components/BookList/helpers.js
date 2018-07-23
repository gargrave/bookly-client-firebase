// @flow
import React, { Fragment } from 'react';

import type { Book, BookBucket } from '../../flowtypes';

import { filterAndBucket, filterBooksByTitle } from '../helpers';

import BookListBucket from '../BookListBucket/BookListBucket';
import BookListDetail from '../BookListDetail/BookListDetail';

export const bucketedBookList = (
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
) => {
  return (
    <Fragment>
      {
        filterAndBucket(books, filterBy)
          .map((bucket: BookBucket) => {
            return (
              <BookListBucket
                bucket={bucket}
                key={bucket.author}
                onBookClick={onBookClick}
              />
            );
          })
      }
    </Fragment>
  );
};

export const flatBookList = (
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
) => {
  return (
    <Fragment>
      {
        filterBooksByTitle(books, filterBy)
          .map((book: Book) => {
            return (
              <BookListDetail
                book={book}
                key={book.id}
                onClick={onBookClick.bind(null, book.id)}
                showAuthor={true}
              />
            );
          })
      }
    </Fragment>
  );
};
