// @flow
import React from 'react';
import { func, instanceOf, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Author } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';

type Props = {
  author: Author,
  onBackClick: Function,
  onEditClick: Function,
};

function AuthorDetailView({
  author,
  onEditClick,
  onBackClick,
}: Props) {
  return (
    <div className={buildClasses('author-detail-view')}>
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
            onClick={onBackClick}
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
    created: instanceOf(Date),
    updated: instanceOf(Date),
    firstName: string,
    lastName: string,
  }),
  onBackClick: func.isRequired,
  onEditClick: func.isRequired,
};

export default AuthorDetailView;
