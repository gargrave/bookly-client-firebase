// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Alert from '../../../common/Alert';
import AuthorDetailCard from './AuthorDetailCard';

type Props = {
  author: Author,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  topLevelError?: string,
};

function AuthorDetailView({
  author,
  onBackClick,
  onDeleteClick,
  onEditClick,
  topLevelError,
}: Props) {
  return (
    <div className={buildClasses('author-detail-view')}>
      {topLevelError &&
        <Alert
          message={topLevelError}
          type="danger"
        />
      }
      <AuthorDetailCard
        author={author}
        onBackClick={onBackClick}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </div>
  );
}

AuthorDetailView.propTypes = {
  author: shape({
    id: string,
    created: oneOfType([
      instanceOf(Date),
      string,
    ]),
    updated: oneOfType([
      instanceOf(Date),
      string,
    ]),
    firstName: string,
    lastName: string,
  }),
  onBackClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
  topLevelError: string,
};

export default AuthorDetailView;
