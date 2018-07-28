// @flow
import React from 'react';
import { array, func, shape, string } from 'prop-types';

import type { BookBucket } from '../../flowtypes';

import BookBucketBookList from './BookBucketBookList/BookBucketBookList';
import BookBucketHeader from './BookBucketHeader/BookBucketHeader';

import styles from './BookListBucket.css';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
};

const BookListBucket = ({
  bucket,
  onBookClick,
}: Props) => {
  return (
    <div className={styles.bookBucket}>
      <BookBucketHeader
        bucket={bucket} />
      <BookBucketBookList
        bucket={bucket}
        onBookClick={onBookClick} />
    </div>
  );
};

BookListBucket.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
};

export default BookListBucket;
