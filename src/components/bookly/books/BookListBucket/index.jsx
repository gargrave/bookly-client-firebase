// @flow
import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import type { BookBucket } from '../../../../constants/flowtypes/';

import { buildClasses } from '../../../../utils/cssHelpers';

import BookBucketBooks from './BookBucketBooks/';
import BookBucketHeader from './BookBucketHeader/';

import './styles.css';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
  showAuthors?: boolean,
};

function BookListBucket({
  bucket,
  onBookClick,
  showAuthors,
}: Props) {
  return (
    <div className={buildClasses(['book-bucket'])}>
      <BookBucketHeader
        bucket={bucket}
      />
      <BookBucketBooks
        bucket={bucket}
        onBookClick={onBookClick}
        showAuthors={showAuthors}
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
  showAuthors: bool,
};

export default BookListBucket;
