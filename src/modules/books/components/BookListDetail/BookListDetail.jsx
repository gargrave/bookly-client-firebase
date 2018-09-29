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

const BookListDetail = ({ book, onClick, showAuthor = false }: Props) => {
  const { author, sortBy, title } = book
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <Card hoverable={true} onClick={onClick}>
      <Card.TextLine text={title} type="title" />
      {showAuthor && <Card.TextLine text={authorName} />}
      {sortBy && <Card.TextLine text={`Sort by: ${sortBy}`} type="subtext" />}
    </Card>
  )
}

BookListDetail.propTypes = {
  book: object.isRequired,
  onClick: func.isRequired,
  showAuthor: bool,
}

export default BookListDetail
