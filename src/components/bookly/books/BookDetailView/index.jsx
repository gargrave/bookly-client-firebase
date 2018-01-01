// @flow
import React from 'react';
import { func, instanceOf, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Book } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

import Button from '../../../common/Button';
import ButtonRow from '../../../common/ButtonRow';
import Card from '../../../common/Card';

type Props = {
  book: Book,
  onBackClick: Function,
  onEditClick: Function,
};

function BookDetailView({
  book,
  onBackClick,
  onEditClick,
}: Props) {
  const {
    created,
    title,
    updated,
  } = book;
  const authorName = `${book.author.firstName} ${book.author.lastName}`;

  return (
    <div className={buildClasses('book-detail-view')}>
      <Card
        classes={['card--top-margin-med', 'detail-card', 'book-detail-card']}
        hoverable={false}
        text={`by ${authorName}`}
        title={title}
      >

        <hr/>
        <p className={buildClasses('card-text')}>
          <strong>Added:</strong> {format(created, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>
        <p className={buildClasses('card-text')}>
          <strong>Updated:</strong> {format(updated, 'MMM. DD, YYYY, HH:mm:ss')}
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

BookDetailView.propTypes = {
  book: shape({
    created: instanceOf(Date),
    updated: instanceOf(Date),
    author: shape({
      firstName: string,
      lastName: string,
    }),
    title: string.isRequired,
  }).isRequired,
  onBackClick: func.isRequired,
  onEditClick: func.isRequired,
};

export default BookDetailView;
