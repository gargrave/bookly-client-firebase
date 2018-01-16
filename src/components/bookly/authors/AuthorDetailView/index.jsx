// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Author } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Alert from '../../../common/Alert';
import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';

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
      <Card
        classes={['card--top-margin-med', 'detail-card', 'author-detail-card']}
        hoverable={false}
        title={`${author.firstName} ${author.lastName}`}
      >

        <hr/>
        <p className={buildClasses('card-text')}>
          <strong>Added:</strong> {format(author.created, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>
        <p className={buildClasses('card-text')}>
          <strong>Updated:</strong> {format(author.updated, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>

        <hr/>

        <ButtonRow>
          <Button
            onClick={onEditClick}
            position="left"
            text="Edit"
            type="info"
          />
          <Button
            onClick={onDeleteClick}
            text="Delete"
            type="danger"
          />
          <Button
            onClick={onBackClick}
            position="right"
            text="Back"
            type="light"
          />
        </ButtonRow>
      </Card>
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
