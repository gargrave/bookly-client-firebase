// @flow
import React, { Fragment } from 'react';
import { array, bool, func, string } from 'prop-types';

import type { Book } from '../../../../constants/flowtypes';

import { filterAndBucket } from '../helpers';

import Alert from '../../../common/Alert/';
import BookListBucket from '../BookListBucket/';

type Props = {
  books: Book[],
  filterBy?: string,
  onBookClick: Function,
  showAuthors?: boolean,
};

function bookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
  showAuthors?: boolean,
) {
  return (
    <Fragment>
      {
        filterAndBucket(books, filterBy)
        .map((bucket: any) => {
          return (
            <BookListBucket
              bucket={bucket}
              key={bucket.author}
              onBookClick={onBookClick}
              showAuthors={showAuthors}
            />
          );
        })
      }
    </Fragment>
  );
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
  showAuthors,
}: Props) {
  return (
    books.length
      ? bookList(books, onBookClick, filterBy, showAuthors)
      : noBooksMessage()
  );
}

BookList.propTypes = {
  books: array.isRequired,
  filterBy: string,
  onBookClick: func.isRequired,
  showAuthors: bool,
};

export default BookList;
