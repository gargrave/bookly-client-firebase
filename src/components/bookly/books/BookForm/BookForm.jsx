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
  onInputChange: Function,
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
  onInputChange,
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
        startDate={new Date()}
        onChange={() => console.log('%cdatepicker change', 'color: pink;font-size: 12px;background:#454;padding:2px 4px;')}
      />
    </Form>
  );
};


BookForm.propTypes = {
  authors: array.isRequired,
  book: shape({
    title: string.isRequired,
    author: object.isRequired,
  }).isRequired,
  disabled: bool,
  errors: shape({
    title: string.isRequired,
    author: string.isRequired,
  }).isRequired,
  onAuthorChange: func.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  preselectedAuthor: object,
  submitDisabled: bool,
  topLevelError: string,
};

export default BookForm;