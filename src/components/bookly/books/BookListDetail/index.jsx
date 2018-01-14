// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import type { Book } from '../../../../constants/flowtypes';

import Card from '../../../common/Card';

type Props = {
  book: Book,
  onClick: Function,
  showAuthor?: boolean,
};

function BookListDetail({
  book,
  onClick,
  showAuthor,
}: Props) {
  const {
    author,
    title,
  } = book;
  const authorName = showAuthor ? `${author.firstName} ${author.lastName}` : '';

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
  showAuthor: bool,
};

export default BookListDetail;
