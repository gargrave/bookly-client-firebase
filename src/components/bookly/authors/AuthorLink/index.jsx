// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes/';

import { localUrls } from '../../../../constants/urls';
import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  author: Author,
  history?: Object,
};

function AuthorLink({
  author,
}: Props) {
  return (
    <p className={buildClasses(['author-link'])}>
      by&nbsp;
      <Link to={`${localUrls.authorsList}/${author.id}`}>
        {author.firstName} {author.lastName}
      </Link>
    </p>
  );
}

AuthorLink.propTypes = {
  author: object.isRequired,
  history: object,
};

export default AuthorLink;
