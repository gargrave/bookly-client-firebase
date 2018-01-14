// @flow
import React, { Fragment } from 'react';
import { array, bool, func, string } from 'prop-types';

import type { Book } from '../../../../constants/flowtypes';

import Alert from '../../../common/Alert/';
import BookListBucket from '../BookListBucket/';

type Props = {
  books: Book[],
  filterBy?: string,
  onBookClick: Function,
  showAuthors?: boolean,
};

function filterBook(book: Book, filterBy?: string = ''): boolean {
  if (!filterBy) {
    return true;
  }
  const title = `${book.title}`.toLowerCase();
  const author = `${book.author.firstName} ${book.author.lastName}`.toLowerCase();
  return title.includes(filterBy) || author.includes(filterBy);
}

function bucketByAuthor(books: Book[]): any[] {
  const buckets = {};
  books.forEach((book: Book) => {
    const author = `${book.author.firstName} ${book.author.lastName}`;
    if (!(author in buckets)) {
      buckets[author] = [];
    }
    buckets[author].push(book);
  });

  return Object.keys(buckets).map((key) => {
    return {
      author: key,
      books: buckets[key],
    };
  });
}

function bookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
  showAuthors?: boolean,
) {
  return (
    <Fragment>
      {
        bucketByAuthor(books.filter((b: Book) => filterBook(b, filterBy)))
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
