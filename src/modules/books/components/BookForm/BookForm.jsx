// @flow
import React from 'react'
import { array, bool, func, object, shape, string } from 'prop-types'

import type { Author } from '../../../authors/flowtypes'
import type { Book, BookErrors } from '../../flowtypes'

import AuthorSelect from '../../../authors/components/AuthorSelect'
import Form from '../../../common/components/Form/Form'
import InputField from '../../../common/components/InputField/InputField'

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
}

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
  const { author, sortBy, title } = book

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

      <InputField
        boundValue={sortBy}
        disabled={disabled || false}
        error={errors.sortBy}
        label="Sort By"
        name="sortBy"
        onInputChange={onInputChange}
        placeholder={title}
      />

      <AuthorSelect
        author={preselectedAuthor || author}
        authors={authors}
        disabled={disabled || false}
        error={errors.author}
        onChange={onAuthorChange}
      />
    </Form>
  )
}

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
}

export default BookForm
