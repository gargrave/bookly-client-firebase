// @flow
import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import type { BookBucket } from '../../../../constants/flowtypes/';

import { buildClasses } from '../../../../utils/cssHelpers';

import BookBucketBookList from './BookBucketBookList/';
import BookBucketHeader from './BookBucketHeader/';

import './styles.css';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
};

function BookListBucket({
  bucket,
  onBookClick,
}: Props) {
  return (
    <div className={buildClasses(['book-bucket'])}>
      <BookBucketHeader
        bucket={bucket}
      />
      <BookBucketBookList
        bucket={bucket}
        onBookClick={onBookClick}
      />
    </div>
  );
}

BookListBucket.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
};

export default BookListBucket;
