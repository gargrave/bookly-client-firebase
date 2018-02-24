// @flow
import React, { Fragment } from 'react';
import { array, func, string } from 'prop-types';

import type { Book } from '../../../../../constants/flowtypes';

import BookList from '../../../books/BookList';

type Props = {
  authorName: string,
  books: Book[],
  onBookClick: Function,
};

const AuthorBooksList = ({
  authorName,
  books,
  onBookClick,
}: Props) => {
  return (
    <Fragment>
      <h4>Books by <em>{authorName}</em></h4>
      <BookList
        books={books}
        onBookClick={onBookClick}
      />
    </Fragment>
  );
};

AuthorBooksList.propTypes = {
  authorName: string.isRequired,
  books: array.isRequired,
  onBookClick: func.isRequired,
};

export default AuthorBooksList;
