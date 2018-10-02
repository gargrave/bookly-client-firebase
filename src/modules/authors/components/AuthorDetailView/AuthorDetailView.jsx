// @flow
import React from 'react'
import { array, func, instanceOf, oneOfType, shape, string } from 'prop-types'
import styled from 'react-emotion'

import type { Author } from '../../flowtypes'
import type { Book } from '../../../books/flowtypes'

import { views } from '../../../../styles'

import Alert from '../../../common/components/Alert/Alert'
import AuthorBooksList from './AuthorBooksList/AuthorBooksList'
import AuthorDetailCard from './AuthorDetailCard/AuthorDetailCard'

type Props = {
  author: Author,
  booksForAuthor: Book[],
  onBackClick: Function,
  onBookClick: Function,
  onBookAddClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError?: string,
}

const Styled = styled('div')`
  ${views.viewWrapper};
`

const AuthorDetailView = ({
  author,
  booksForAuthor,
  onBackClick,
  onBookAddClick,
  onBookClick,
  onDeleteClick,
  onEditClick,
  topLevelError,
}: Props) => (
  <Styled>
    {topLevelError && <Alert message={topLevelError} type="danger" />}

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
  </Styled>
)

AuthorDetailView.propTypes = {
  author: shape({
    id: string,
    created: oneOfType([instanceOf(Date), string]),
    updated: oneOfType([instanceOf(Date), string]),
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
}

export default AuthorDetailView
