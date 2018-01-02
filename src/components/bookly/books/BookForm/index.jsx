// @flow
import React from 'react';
import { array, bool, func, object, shape, string } from 'prop-types';

import type { Author, Book } from '../../../../constants/flowtypes';

import AuthorSelect from '../../authors/AuthorSelect';
import Form from '../../../common/Form';
import InputField from '../../../common/InputField';

type Props = {
  authors: Author[],
  book: Book,
  disabled?: boolean,
  errors: any,
  onAuthorChange: Function,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
  topLevelError?: string,
};

function BookForm({
  authors,
  book,
  disabled = false,
  errors,
  onAuthorChange,
  onCancel,
  onInputChange,
  onSubmit,
  topLevelError,
}: Props) {
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
        author={author}
        authors={authors}
        disabled={disabled || false}
        error={errors.author}
        onChange={onAuthorChange}
      />
    </Form>
  );
}

BookForm.propTypes = {
  authors: array.isRequired,
  book: shape({
    title: string.isRequired,
    author: object.isRequired,
  }).isRequired,
  disabled: bool,
  onAuthorChange: func.isRequired,
  onCancel: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  topLevelError: string,
};

export default BookForm;
