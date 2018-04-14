// @flow
import React from 'react';
import { array, func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { Author, Book } from '../../../../globals/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import Alert from '../../../common/Alert';
import AuthorBooksList from './AuthorBooksList';
import AuthorDetailCard from './AuthorDetailCard';

type Props = {
  author: Author,
  booksForAuthor: Book[],
  onBackClick: Function,
  onBookClick: Function,
  onBookAddClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError?: string,
};

const AuthorDetailView = ({
  author,
  booksForAuthor,
  onBackClick,
  onBookAddClick,
  onBookClick,
  onDeleteClick,
  onEditClick,
  topLevelError,
}: Props) => {
  return (
    <div className={buildClasses(['detail-view', 'author-detail-view'])}>
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

      <AuthorBooksList
        author={author}
        books={booksForAuthor}
        onBookAddClick={onBookAddClick}
        onBookClick={onBookClick}
      />
    </div>
  );
};

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
  onBookClick: func.isRequired,
  onBookAddClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
  topLevelError: string,
};

export default AuthorDetailView;
