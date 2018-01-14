// @flow
import React from 'react';
import { array, func, shape, string } from 'prop-types';

import type { Book,BookBucket } from '../../../../../constants/flowtypes/';

import { buildClasses } from '../../../../../utils/cssHelpers';

import BookListDetail from '../../BookListDetail/';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
};

function booksFromBucket(
  bucket: BookBucket,
  onBookClick: Function,
) {
  return bucket.books.map((book: Book) => {
    return (
      <BookListDetail
        book={book}
        key={book.id}
        onClick={onBookClick.bind(null, book.id)}
      />
    );
  });
};

function BookBucketBookList({
  bucket,
  onBookClick,
}: Props) {
  return (
    <div className={buildClasses(['book-bucket__book-list'])}>
      {booksFromBucket(bucket, onBookClick)}
    </div>
  );
}

BookBucketBookList.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
};

export default BookBucketBookList;
