// @flow
import React from 'react';
import { array, func, string } from 'prop-types';

import type { Book } from '../../../../constants/flowtypes';

import Alert from '../../../common/Alert/';
import BookListDetail from '../BookListDetail';

type Props = {
  books: Book[],
  filterBy?: string,
  onBookClick: Function,
};

function filterBook(book: Book, filterBy?: string = '') {
  if (!filterBy) {
    return true;
  }
  const title = `${book.title}`.toLowerCase();
  const author = `${book.author.name}`.toLowerCase();
  return title.includes(filterBy) || author.includes(filterBy);
}

function bookList(
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
) {
  return (
    <div>
      {books
        .filter((b: Book) => filterBook(b, filterBy))
        .map((book) =>
          <BookListDetail
            book={book}
            key={book.id}
            onClick={onBookClick.bind(null, book.id)}
          />
        )
      }
    </div>
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
}: Props) {
  return (
    books.length
      ? bookList(books, onBookClick, filterBy)
      : noBooksMessage()
  );
}

BookList.propTypes = {
  books: array.isRequired,
  filterBy: string,
  onBookClick: func.isRequired,
};

export default BookList;
