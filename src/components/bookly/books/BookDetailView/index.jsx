// @flow
import React from 'react';
import { func, object } from 'prop-types';
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
  return (
    <div className={buildClasses('book-detail-view')}>
      <Card
        classes={['card--top-margin-med', 'detail-card', 'book-detail-card']}
        hoverable={false}
        text={`by ${book.author.name}`}
        title={book.title}
      >

        <hr/>
        <p className={buildClasses('card-text')}>
          <strong>Added:</strong> {format(book.createdAt, 'MMM. DD, YYYY, HH:mm:ss')}
        </p>
        <p className={buildClasses('card-text')}>
          <strong>Updated:</strong> {format(book.updatedAt, 'MMM. DD, YYYY, HH:mm:ss')}
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
  book: object,
  onBackClick: func.isRequired,
  onEditClick: func.isRequired,
};

export default BookDetailView;
