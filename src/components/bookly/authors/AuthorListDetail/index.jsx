// @flow
import React from 'react';
import { func, shape, string } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

import Card from '../../../common/Card';

type Props = {
  author: Author,
  onClick: Function,
};

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
    />
  );
}

AuthorListDetail.propTypes = {
  author: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
  }),
  onClick: func.isRequired,
};

export default AuthorListDetail;
