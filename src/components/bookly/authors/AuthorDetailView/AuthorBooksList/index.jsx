// @flow
import React from 'react';
import { array, func, string } from 'prop-types';

import type { Book } from '../../../../../constants/flowtypes';

import { buildClasses } from '../../../../../utils/cssHelpers';

import BookList from '../../../books/BookList';

import './styles.css';

type Props = {
  authorName: string,
  books: Book[],
  onBookClick: Function,
};

const prefixClass = (cls = '') => `author-books-list${cls}`;

const AuthorBooksList = ({
  authorName,
  books,
  onBookClick,
}: Props) => {
  return (
    <div className={buildClasses(prefixClass())}>
      <h5 className={buildClasses(prefixClass('__header'))}>Books by {authorName}</h5>
      <BookList
        books={books}
        onBookClick={onBookClick}
      />
    </div>
  );
};

AuthorBooksList.propTypes = {
  authorName: string.isRequired,
  books: array.isRequired,
  onBookClick: func.isRequired,
};

export default AuthorBooksList;
