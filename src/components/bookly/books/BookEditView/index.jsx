// @flow
import React from 'react';
import { array, bool, func, object, string } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../../constants/flowtypes';

import BookForm from '../BookForm';
import Card from '../../../common/Card';

type Props = {
  authors: Author[],
  book: Book,
  disabled: boolean,
  errors: BookErrors,
  onAuthorChange: Function,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  submitDisabled?: boolean,
  topLevelError?: string,
};

function BookEditView({
  authors,
  book,
  disabled,
  errors,
  onAuthorChange,
  onCancel,
  onInputChange,
  onSubmit,
  submitDisabled = false,
  topLevelError,
}: Props) {
  return (
    <div className="book-edit-view">
      <Card
        classes={['card--top-margin-med']}
        header={'Update Book'}
        hoverable={false}
      >
        <BookForm
          authors={authors}
          book={book}
          disabled={disabled}
          errors={errors}
          onAuthorChange={onAuthorChange}
          onCancel={onCancel}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </div>
  );
}

BookEditView.propTypes = {
  authors: array.isRequired,
  book: object.isRequired,
  disabled: bool,
  onAuthorChange: func.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default BookEditView;
