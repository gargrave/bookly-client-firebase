// @flow
import React from 'react';
import { array, shape, string } from 'prop-types';

import type { BookBucket } from '../../../../../globals/flowtypes/';

import { buildClasses } from '../../../../../utils/cssHelpers';

type Props = {
  bucket: BookBucket,
};

const BookBucketHeader = ({
  bucket,
}: Props) => {
  return (
    <div className={buildClasses(['book-bucket__header'])}>
      <p>{bucket.author}</p>
    </div>
  );
};

BookBucketHeader.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
};

export default BookBucketHeader;
