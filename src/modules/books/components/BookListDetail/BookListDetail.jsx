// @flow
import React from 'react'
import { bool, func, object } from 'prop-types'

import type { Book } from '../../flowtypes'

import Card from '../../../common/components/Card/Card'

type Props = {
  book: Book,
  onClick: Function,
  showAuthor?: boolean,
}

const sortByTextStyles = {
  color: '#999',
  fontSize: '.8rem',
}

const BookListDetail = ({ book, onClick, showAuthor = false }: Props) => {
  const { author, sortBy, title } = book
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <Card hoverable={true} onClick={onClick}>
      <Card.TextLine bold={true} text={title} />
      {showAuthor && <Card.TextLine text={authorName} />}
      {sortBy && (
        <Card.TextLine style={sortByTextStyles} text={`Sort by: ${sortBy}`} />
      )}
    </Card>
  )
}

BookListDetail.propTypes = {
  book: object.isRequired,
  onClick: func.isRequired,
  showAuthor: bool,
}

export default BookListDetail
