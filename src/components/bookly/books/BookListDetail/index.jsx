// @flow
import React from 'react';
import { func, number, object, shape, string } from 'prop-types';

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
      text={book.author.name}
      title={book.title}
    />
  );
}

BookListDetail.propTypes = {
  book: shape({
    id: number.isRequired,
    title: string.isRequired,
    author: object.isRequired,
  }),
  onClick: func.isRequired,
};

export default BookListDetail;
