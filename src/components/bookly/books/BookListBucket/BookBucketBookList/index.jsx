// @flow
import React from 'react';
import { array, func, shape, string } from 'prop-types';

import type { Book, BookBucket } from '../../../../../globals/flowtypes/';

import { buildClasses } from '../../../../../utils/cssHelpers';

import BookListDetail from '../../BookListDetail/';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
};

const booksFromBucket = (
  bucket: BookBucket,
  onBookClick: Function,
) => {
  return bucket.books.map((book: Book) => {
    return (
      <BookListDetail
        book={book}
        key={book.id}
        onClick={onBookClick.bind(null, book.id)}
        showAuthor={false}
      />
    );
  });
};

const BookBucketBookList = ({
  bucket,
  onBookClick,
}: Props) => {
  return (
    <div className={buildClasses(['book-bucket__book-list'])}>
      {booksFromBucket(bucket, onBookClick)}
    </div>
  );
};

BookBucketBookList.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
};

export default BookBucketBookList;
