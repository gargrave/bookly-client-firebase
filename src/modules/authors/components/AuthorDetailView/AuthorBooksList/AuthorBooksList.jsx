// @flow
import React from 'react'
import { array, func, object } from 'prop-types'

import type { Book } from '../../../../books/flowtypes'
import type { Author } from '../../../flowtypes'

import BookList from '../../../../books/components/BookList/BookList'
import Button from '../../../../common/components/Button'

import styles from './AuthorBooksList.css'

type Props = {
  author: Author,
  books: Book[],
  onBookAddClick: Function,
  onBookClick: Function,
}

const AuthorBooksList = ({
  author,
  books,
  onBookAddClick,
  onBookClick,
}: Props) => {
  const authorName = `${author.firstName} ${author.lastName}`

  return (
    <div className={styles.authorBooksList}>
      <h5 className={styles.header}>
        Books by {authorName}
        <Button
          onClick={onBookAddClick.bind(null, author)}
          text="Add"
          type="success"
        />
      </h5>
      <BookList books={books} onBookClick={onBookClick} />
    </div>
  )
}

AuthorBooksList.propTypes = {
  author: object.isRequired,
  books: array.isRequired,
  onBookAddClick: func.isRequired,
  onBookClick: func.isRequired,
}

export default AuthorBooksList
