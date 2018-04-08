// @flow
import React from 'react';
import { array, shape, string } from 'prop-types';

import type { BookBucket } from '../../../../../constants/flowtypes/';

import { buildClasses } from '../../../../../utils/cssHelpers';

type Props = {
  bucket: BookBucket,
};

function BookBucketHeader({
  bucket,
}: Props) {
  return (
    <div className={buildClasses(['book-bucket__header'])}>
      <p>{bucket.author}</p>
    </div>
  );
}

BookBucketHeader.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
};

export default BookBucketHeader;
