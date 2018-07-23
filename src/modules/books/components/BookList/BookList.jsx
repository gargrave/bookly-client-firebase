// @flow
import React from 'react';
import { array, bool, func, string } from 'prop-types';

import type { Book } from '../../flowtypes';

import { bucketedBookList, flatBookList } from './helpers';

import Alert from '../../../common/components/Alert/Alert';

type Props = {
  books: Book[],
  filterBy?: string,
  onBookClick: Function,
  groupBooksByAuthor?: boolean,
};

const renderBookList = (
  books: Book[],
  onBookClick: Function,
  filterBy?: string,
  groupBooksByAuthor?: boolean,
) => {
  return groupBooksByAuthor
    ? bucketedBookList(books, onBookClick, filterBy)
    : flatBookList(books, onBookClick, filterBy);
};

const noBooksMessage = () => {
  return (
    <Alert
      message={'No Books created yet!'}
      type={'info'}
    />
  );
};

const BookList = ({
  books,
  filterBy,
  onBookClick,
  groupBooksByAuthor,
}: Props) => (
  books.length
    ? renderBookList(books, onBookClick, filterBy, groupBooksByAuthor)
    : noBooksMessage()
);

BookList.propTypes = {
  books: array.isRequired,
  filterBy: string,
  onBookClick: func.isRequired,
  groupBooksByAuthor: bool,
};

export default BookList;
