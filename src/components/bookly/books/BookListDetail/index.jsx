// @flow
import React from 'react';
import { func, object } from 'prop-types';

import type { Book } from '../../../../constants/flowtypes';

import Card from '../../../common/Card';

type Props = {
  book: Book,
  onClick: Function,
};

function BookListDetail({
  book,
  onClick,
}: Props) {
  return (
    <Card
      classes={['book-card']}
      onClick={onClick}
      text={`${book.author.firstName} ${book.author.lastName}`}
      title={book.title}
    />
  );
}

BookListDetail.propTypes = {
  book: object,
  onClick: func.isRequired,
};

export default BookListDetail;
