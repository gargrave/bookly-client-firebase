// @flow
import React from 'react';
import { array, bool, func, object, string } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../../globals/flowtypes';

import { buildClasses } from '../../../../globals/utils/cssHelpers';

import BookForm from '../BookForm/BookForm';
import Card from '../../../common/Card/Card';

type Props = {
  authors: Author[],
  book: Book,
  disabled: boolean,
  errors: BookErrors,
  onAuthorChange: Function,
  onCancel: Function,
  onFinishedOnDateChange: Function,
  onInputChange: Function,
  onStartedOnDateChange: Function,
  onSubmit: Function,
  submitDisabled?: boolean,
  topLevelError?: string,
};

const BookEditView = ({
  authors,
  book,
  disabled,
  errors,
  onAuthorChange,
  onCancel,
  onFinishedOnDateChange,
  onInputChange,
  onStartedOnDateChange,
  onSubmit,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  return (
    <div className={buildClasses(['edit-view', 'book-edit-view'])}>
      <Card
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
          onFinishedOnDateChange={onFinishedOnDateChange}
          onInputChange={onInputChange}
          onStartedOnDateChange={onStartedOnDateChange}
          onSubmit={onSubmit}
          submitDisabled={submitDisabled}
          topLevelError={topLevelError}
        />
      </Card>
    </div>
  );
};

BookEditView.propTypes = {
  authors: array.isRequired,
  book: object.isRequired,
  disabled: bool,
  errors: object.isRequired,
  onAuthorChange: func.isRequired,
  onCancel: func.isRequired,
  onFinishedOnDateChange: func.isRequired,
  onInputChange: func.isRequired,
  onStartedOnDateChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default BookEditView;
