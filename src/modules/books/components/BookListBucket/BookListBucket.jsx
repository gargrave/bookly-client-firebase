// @flow
import React from 'react'
import { array, func, shape, string } from 'prop-types'
import styled from 'react-emotion'

import type { BookBucket } from '../../flowtypes'

import BookBucketBookList from './BookBucketBookList/BookBucketBookList'
import BookBucketHeader from './BookBucketHeader/BookBucketHeader'

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
}

const Styled = styled('div')`
  & + & {
    margin-top: 25px;
  }

  @media only screen and (max-width: 639px) {
    & + & {
      margin-top: 35px;
    }
  }
`

const BookListBucket = ({ bucket, onBookClick }: Props) => {
  return (
    <Styled>
      <BookBucketHeader bucket={bucket} />
      <BookBucketBookList bucket={bucket} onBookClick={onBookClick} />
    </Styled>
  )
}

BookListBucket.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
}

export default BookListBucket
