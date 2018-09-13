// @flow
import React from 'react'
import { array, shape, string } from 'prop-types'

import type { BookBucket } from '../../../flowtypes'

import styles from './BookBucketHeader.css'

type Props = {
  bucket: BookBucket,
}

const BookBucketHeader = ({ bucket }: Props) => {
  return <div className={styles.bookBucketHeader}>{bucket.author}</div>
}

BookBucketHeader.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
}

export default BookBucketHeader
