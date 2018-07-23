// @flow
import React from 'react';
import { array, func, object } from 'prop-types';

import type { Book } from '../../../../books/flowtypes';
import type { Author } from '../../../flowtypes';

import { buildClasses } from '../../../../../utils/cssHelpers';

import BookList from '../../../../books/components/BookList/BookList';
import Button from '../../../../common/components/Button/Button';

import './AuthorBooksList.css';

type Props = {
  author: Author,
  books: Book[],
  onBookAddClick: Function,
  onBookClick: Function,
};

const prefixClass = (cls = '') => `author-books-list${cls}`;

const AuthorBooksList = ({
  author,
  books,
  onBookAddClick,
  onBookClick,
}: Props) => {
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <div className={buildClasses(prefixClass())}>
      <h5 className={buildClasses(prefixClass('__header'))}>
        Books by {authorName}
        <Button
          onClick={onBookAddClick.bind(null, author)}
          text="Add"
          type="success"
        />
      </h5>
      <BookList
        books={books}
        onBookClick={onBookClick}
      />
    </div>
  );
};

AuthorBooksList.propTypes = {
  author: object.isRequired,
  books: array.isRequired,
  onBookAddClick: func.isRequired,
  onBookClick: func.isRequired,
};

export default AuthorBooksList;
