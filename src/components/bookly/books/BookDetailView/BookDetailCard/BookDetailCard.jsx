// @flow
import React, { Fragment } from 'react';
import { func, object } from 'prop-types';

import type { Book } from '../../../../../globals/flowtypes';

import AuthorLink from '../../../authors/AuthorLink';
import Button from '../../../../common/Button';
import ButtonRow from '../../../../common/ButtonRow';
import Card from '../../../../common/Card/Card';
import CardSpacer from '../../../../common/Card/CardSpacer/CardSpacer';
import CardTextList from '../../../../common/Card/CardTextList/CardTextList';

import {
  bookBasicDates,
  bookOptionalDates,
  hasOptionalDates,
} from './helpers';

type Props = {
  book: Book,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
};

const BookDetailCard = ({
  book,
  onBackClick,
  onDeleteClick,
  onEditClick,
}: Props) => {
  const {
    title,
  } = book;

  return (
    <Card
      classes={['detail-card', 'book-detail-card']}
      header={title}
      hoverable={false}
    >
      <AuthorLink author={book.author} />

      {hasOptionalDates(book) &&
        <Fragment>
          <CardTextList textList={bookOptionalDates(book)} />
          <CardSpacer />
        </Fragment>
      }
      <CardTextList textList={bookBasicDates(book)} />
      <CardSpacer size='large' />

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
};

BookDetailCard.propTypes = {
  book: object.isRequired,
  onBackClick: func.isRequired,
  onDeleteClick: func.isRequired,
  onEditClick: func.isRequired,
};

export default BookDetailCard;
