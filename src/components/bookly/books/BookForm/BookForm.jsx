// @flow
import React from 'react';
import { array, bool, func, object, shape, string } from 'prop-types';

import type { Author, Book, BookErrors } from '../../../../globals/flowtypes';

import AuthorSelect from '../../authors/AuthorSelect';
import Datepicker from '../../../common/Datepicker/Datepicker';
import Form from '../../../common/Form';
import InputField from '../../../common/InputField/InputField';

type Props = {
  authors: Author[],
  book: Book,
  disabled?: boolean,
  errors: BookErrors,
  onAuthorChange: Function,
  onCancel: Function,
  onFinishedOnDateChange: Function,
  onInputChange: Function,
  onStartedOnDateChange: Function,
  onSubmit: Function,
  preselectedAuthor?: Author,
  submitDisabled?: boolean,
  topLevelError?: string,
};

const BookForm = ({
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
  preselectedAuthor,
  submitDisabled = false,
  topLevelError,
}: Props) => {
  const {
    author,
    title,
  } = book;

  return (
    <Form
      classes={['book-form']}
      disabled={disabled}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      topLevelError={topLevelError}
    >
      <InputField
        boundValue={title}
        disabled={disabled || false}
        error={errors.title}
        label="Title"
        name="title"
        onInputChange={onInputChange}
      />

      <AuthorSelect
        author={preselectedAuthor || author}
        authors={authors}
        disabled={disabled || false}
        error={errors.author}
        onChange={onAuthorChange}
      />

      <Datepicker
        date={book.startedOn}
        onChange={onStartedOnDateChange}
      />

      <Datepicker
        date={book.finishedOn}
        onChange={onFinishedOnDateChange}
      />
    </Form>
  );
};


BookForm.propTypes = {
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
  preselectedAuthor: object,
  submitDisabled: bool,
  topLevelError: string,
};

export default BookForm;
