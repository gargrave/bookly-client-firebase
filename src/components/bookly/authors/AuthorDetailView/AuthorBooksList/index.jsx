// @flow
import React from 'react';
import { array, func, object } from 'prop-types';

import type { Author } from '../../../../../modules/authors/flowtypes';
import type { Book } from '../../../../../modules/books/flowtypes';

import { buildClasses } from '../../../../../globals/utils/cssHelpers';

import BookList from '../../../books/BookList';
import Button from '../../../../../modules/common/components/Button/Button';

import './styles.css';

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
          onClick={onBookAddClick.bind(this, author)}
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
