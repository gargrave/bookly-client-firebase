// @flow
import React from 'react'
import { func, instanceOf, oneOfType, shape, string } from 'prop-types'

import type { Book } from '../../flowtypes'

import Alert from '../../../common/components/Alert/Alert'
import BookDetailCard from './BookDetailCard/BookDetailCard'

import styles from './BookDetailView.css'

type Props = {
  book: Book,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError?: string,
}

const BookDetailView = ({
  book,
  onBackClick,
  onDeleteClick,
  onEditClick,
  topLevelError,
}: Props) => {
  return (
    <div className={styles.bookDetailView}>
      {topLevelError && <Alert message={topLevelError} type="danger" />}
      <BookDetailCard
        book={book}
        onBackClick={onBackClick}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </div>
  )
}

BookDetailView.propTypes = {
  book: shape({
    created: oneOfType([instanceOf(Date), string]),
    updated: oneOfType([instanceOf(Date), string]),
    author: shape({
      firstName: string,
      lastName: string,
    }),
    title: string,
  }).isRequired,
  onBackClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
  topLevelError: string,
}

export default BookDetailView
