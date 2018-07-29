// @flow
import React from 'react';
import { array, bool, func, object, string } from 'prop-types';

import type { Author } from '../../../authors/flowtypes';
import type { Book, BookErrors } from '../../flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import BookForm from '../BookForm/BookForm';
import Card from '../../../common/components/Card/Card';

import styles from './BookEditView.css';

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

const BookEditView = ({
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
}: Props) => {
  return (
    <div className={styles.bookEditView}>
      <Card
        header={'Update Book'}
        hoverable={false}>
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
          topLevelError={topLevelError} />
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
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  submitDisabled: bool,
  topLevelError: string,
};

export default BookEditView;
