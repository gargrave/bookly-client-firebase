// @flow
import React from 'react';
import { func, number, shape, string } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

import Card from '../../../common/Card';

type Props = {
  author: Author,
  onClick: Function,
};

function bookCountString(count: number): string {
  const pluralizer = count === 1 ? '' : 's';
  return `${count} book${pluralizer}`;
}

function AuthorListDetail({
  author,
  onClick,
}: Props) {
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <Card
      classes={['author-card']}
      onClick={onClick}
      title={authorName}
      text={bookCountString(author.bookCount)}
    />
  );
}

AuthorListDetail.propTypes = {
  author: shape({
    bookCount: number.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
  }),
  onClick: func.isRequired,
};

export default AuthorListDetail;
