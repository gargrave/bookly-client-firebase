// @flow
import React, { Fragment } from 'react';
import { array, bool, func, string } from 'prop-types';

import type { Book, BookBucket } from '../../../../constants/flowtypes';

import { filterAndBucket, filterBooksByTitle } from '../helpers';

import Alert from '../../../common/Alert/';
import BookListBucket from '../BookListBucket/';
import BookListDetail from '../BookListDetail/';

type Props = {
  books: Book[],
  filterBy?: string,
  onBookClick: Function,
  groupBooksByAuthor?: boolean,
};

function bucketedBookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
) {
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
              showAuthors={false}
            />
          );
        })
      }
    </Fragment>
  );
}

function flatBookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
) {
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
}

function renderBookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
  groupBooksByAuthor?: boolean,
) {
  return groupBooksByAuthor
    ? bucketedBookList(books, onBookClick, filterBy)
    : flatBookList(books, onBookClick, filterBy);
}

function noBooksMessage() {
  return (
    <Alert
      message={'No Books created yet!'}
      type={'info'}
    />
  );
}

function BookList({
  books,
  filterBy,
  onBookClick,
  groupBooksByAuthor,
}: Props) {
  return (
    books.length
      ? renderBookList(books, onBookClick, filterBy, groupBooksByAuthor)
      : noBooksMessage()
  );
}

BookList.propTypes = {
  books: array.isRequired,
  filterBy: string,
  onBookClick: func.isRequired,
  groupBooksByAuthor: bool,
};

export default BookList;
