// @flow
import React from 'react';
import { func, number, shape, string } from 'prop-types';

import type { Author } from '../../../../globals/flowtypes';

import Card from '../../../common/Card/Card';
import CardTextLine from '../../../common/Card/CardTextLine/CardTextLine';

type Props = {
  author: Author,
  onClick: Function,
};

const bookCountString = (count: number): string => {
  const pluralizer = count === 1 ? '' : 's';
  return `${count} book${pluralizer}`;
};

const AuthorListDetail = ({
  author,
  onClick,
}: Props) => {
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <Card
      classes={[
        'list-detail-card',
        'author-list-detail-card',
      ]}
      onClick={onClick}
    >
      <CardTextLine bold text={authorName} />
      <CardTextLine condensed text={bookCountString(author.bookCount)} />
    </Card>
  );
};

AuthorListDetail.propTypes = {
  author: shape({
    bookCount: number.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
  }),
  onClick: func.isRequired,
};

export default AuthorListDetail;
