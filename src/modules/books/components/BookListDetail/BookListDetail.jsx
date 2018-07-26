// @flow
import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import type { Book } from '../../flowtypes';

import Card from '../../../common/components/Card/Card';

type Props = {
  book: Book,
  onClick: Function,
  showAuthor?: boolean,
};

const BookListDetail = ({
  book,
  onClick,
  showAuthor,
}: Props) => {
  const { author, title } = book;
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <Card
      classes={[
        'list-detail-card',
        'book-list-detail-card',
      ]}
      onClick={onClick}
    >
      <Card.TextLine bold text={title} />
      {showAuthor && <Card.TextLine text={authorName} />}
    </Card>
  );
};

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
