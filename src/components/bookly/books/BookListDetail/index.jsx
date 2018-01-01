// @flow
import React from 'react';
import { func, shape, string } from 'prop-types';

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
  const {
    author,
    title,
  } = book;
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <Card
      classes={['book-card']}
      onClick={onClick}
      text={authorName}
      title={title}
    />
  );
}

BookListDetail.propTypes = {
  book: shape({
    author: shape({
      firstName: string.isRequired,
      lastName: string.isRequired,
    }),
    title: string.isRequired,
  }).isRequired,
  onClick: func.isRequired,
};

export default BookListDetail;
