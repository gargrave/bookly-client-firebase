// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';

import type { Author } from '../../flowtypes';

import { localUrls } from '../../../../globals/urls';
import { buildClasses } from '../../../../utils/cssHelpers';

import './AuthorLink.css';

type Props = {
  author: Author,
  history?: Object,
};

const AuthorLink = ({
  author,
}: Props) => {
  const authorId = author.id || '';
  return (
    <p className={buildClasses(['author-link'])}>
      by&nbsp;
      <Link to={`${localUrls.authorsList}/${authorId}`}>
        {author.firstName} {author.lastName}
      </Link>
    </p>
  );
};

AuthorLink.propTypes = {
  author: object.isRequired,
  history: object,
};

export default AuthorLink;
