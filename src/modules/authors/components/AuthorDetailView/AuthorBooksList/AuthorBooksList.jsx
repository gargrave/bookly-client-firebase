// @flow
import React from 'react'
import { array, func, object } from 'prop-types'
import styled from 'react-emotion'

import type { Book } from '../../../../books/flowtypes'
import type { Author } from '../../../flowtypes'

import { alignment, colors, spacing } from '../../../../../styles'

import BookList from '../../../../books/components/BookList/BookList'
import Button from '../../../../common/components/Button'

type Props = {
  author: Author,
  books: Book[],
  onBookAddClick: Function,
  onBookClick: Function,
}

const StyledWrapper = styled('div')`
  margin-top: ${spacing.xlarge};
`

const StyledH5 = styled('h5')`
  ${alignment.centerAlignedHeader}
  color: ${colors.textLight};
  margin-bottom: ${spacing.med};
`

const AuthorBooksList = ({
  author,
  books,
  onBookAddClick,
  onBookClick,
}: Props) => {
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <StyledWrapper>
      <StyledH5>
        Books by {authorName}
        <Button
          onClick={onBookAddClick.bind(null, author)}
          text="Add"
          type="success"
        />
      </StyledH5>
      <BookList books={books} onBookClick={onBookClick} />
    </StyledWrapper>
  )
}

AuthorBooksList.propTypes = {
  author: object.isRequired,
  books: array.isRequired,
  onBookAddClick: func.isRequired,
  onBookClick: func.isRequired,
}

export default AuthorBooksList
