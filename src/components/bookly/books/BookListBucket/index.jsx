// @flow
import React from 'react';
import { array, func, shape, string } from 'prop-types';

import type { BookBucket } from '../../../../constants/flowtypes/';

import { buildClasses } from '../../../../utils/cssHelpers';

import BookBucketBooks from './BookBucketBooks/';
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
      <BookBucketHeader bucket={bucket} />
      <BookBucketBooks
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
