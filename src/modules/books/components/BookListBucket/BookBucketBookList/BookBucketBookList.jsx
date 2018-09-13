// @flow
import React from 'react'
import { array, func, shape, string } from 'prop-types'

import type { Book, BookBucket } from '../../../flowtypes'

import BookListDetail from '../../BookListDetail/BookListDetail'

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
}

const booksFromBucket = (bucket: BookBucket, onBookClick: Function) =>
  bucket.books.map((book: Book) => (
    <BookListDetail
      book={book}
      key={book.id}
      onClick={() => onBookClick(book.id)}
      showAuthor={false}
    />
  ))

const BookBucketBookList = ({ bucket, onBookClick }: Props) => (
  <div>{booksFromBucket(bucket, onBookClick)}</div>
)

BookBucketBookList.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
}

export default BookBucketBookList
