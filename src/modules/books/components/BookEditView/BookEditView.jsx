// @flow
import React from 'react'
import { array, bool, func, object, string } from 'prop-types'

import type { Author } from '../../../authors/flowtypes'
import type { Book, BookErrors } from '../../flowtypes'

import BookForm from '../BookForm/BookForm'
import Card from '../../../common/components/Card/Card'

import * as S from './BookEditView.styles'

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
}

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
    <S.BookEditView>
      <Card>
        <Card.Header text="Update Book" />
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
    </S.BookEditView>
  )
}

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
}

export default BookEditView
