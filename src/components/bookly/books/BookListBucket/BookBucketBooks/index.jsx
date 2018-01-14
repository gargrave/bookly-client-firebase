// @flow
import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import type { Book,BookBucket } from '../../../../../constants/flowtypes/';

import { buildClasses } from '../../../../../utils/cssHelpers';

import BookListDetail from '../../BookListDetail/';

type Props = {
  bucket: BookBucket,
  onBookClick: Function,
  showAuthors?: boolean,
};

function booksFromBucket(
  bucket: BookBucket,
  onBookClick: Function,
  showAuthors?: boolean,
) {
  return bucket.books.map((book: Book) => {
    return (
      <BookListDetail
        book={book}
        key={book.id}
        onClick={onBookClick.bind(null, book.id)}
        showAuthor={showAuthors}
      />
    );
  });
};

function BookBucketBookList({
  bucket,
  onBookClick,
  showAuthors,
}: Props) {
  return (
    <div className={buildClasses(['book-bucket__book-list'])}>
      {booksFromBucket(bucket, onBookClick, showAuthors)}
    </div>
  );
}

BookBucketBookList.propTypes = {
  bucket: shape({
    author: string,
    books: array,
  }).isRequired,
  onBookClick: func.isRequired,
  showAuthors: bool,
};

export default BookBucketBookList;
