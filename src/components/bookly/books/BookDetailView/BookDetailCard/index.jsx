// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Book } from '../../../../../constants/flowtypes';

import { buildClasses } from '../../../../../utils/cssHelpers';

import AuthorLink from '../../../authors/AuthorLink';
import Button from '../../../../common/Button';
import ButtonRow from '../../../../common/ButtonRow';
import Card from '../../../../common/Card';

type Props = {
  book: Book,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
};

function BookDetailCard({
  book,
  onBackClick,
  onDeleteClick,
  onEditClick,
}: Props) {
  const {
    created,
    title,
    updated,
  } = book;

  return (
    <Card
      classes={['card--top-margin-med', 'detail-card', 'book-detail-card']}
      hoverable={false}
      title={title}
    >
      <AuthorLink
        author={book.author}
      />

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
  );
}

BookDetailCard.propTypes = {
  book: shape({
    created: oneOfType([
      instanceOf(Date),
      string,
    ]),
    updated: oneOfType([
      instanceOf(Date),
      string,
    ]),
    author: shape({
      firstName: string,
      lastName: string,
    }),
    title: string,
  }).isRequired,
  onBackClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
};

export default BookDetailCard;