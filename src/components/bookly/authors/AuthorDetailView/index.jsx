// @flow
import React from 'react';
import { array, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { Author, Book } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Alert from '../../../common/Alert';
import AuthorDetailCard from './AuthorDetailCard';
import BookList from '../../books/BookList';

type Props = {
  author: Author,
  booksForAuthor: Book[],
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError?: string,
};

function AuthorDetailView({
  author,
  booksForAuthor,
  onBackClick,
  onDeleteClick,
  onEditClick,
  topLevelError,
}: Props) {
  return (
    <div className={buildClasses('author-detail-view')}>
      {topLevelError &&
        <Alert
          message={topLevelError}
          type="danger"
        />
      }
      <AuthorDetailCard
        author={author}
        onBackClick={onBackClick}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />

      <hr/>
      <BookList
        books={booksForAuthor}
        onBookClick={() => console.warn('TODO: implement onBookClick()')}
      />
    </div>
  );
}

AuthorDetailView.propTypes = {
  author: shape({
    id: string,
    created: oneOfType([
      instanceOf(Date),
      string,
    ]),
    updated: oneOfType([
      instanceOf(Date),
      string,
    ]),
    firstName: string,
    lastName: string,
  }),
  booksForAuthor: array.isRequired,
  onBackClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
  topLevelError: string,
};

export default AuthorDetailView;
