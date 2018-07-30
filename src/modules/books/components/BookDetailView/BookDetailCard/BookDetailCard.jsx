// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Book } from '../../../flowtypes';

import AuthorLink from '../../../../authors/components/AuthorLink/AuthorLink';
import Button from '../../../../common/components/Button/Button';
import ButtonRow from '../../../../common/components/ButtonRow/ButtonRow';
import Card from '../../../../common/components/Card/Card';

type Props = {
  book: Book,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
};

const bookDatesTextList = (book: Book) => {
  const {
    created,
    updated,
  } = book;

  return [
    { title: 'Added', value: format(created, 'MMM. DD, YYYY, HH:mm:ss') },
    { title: 'Updated', value: format(updated, 'MMM. DD, YYYY, HH:mm:ss') },
  ];
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
      header={title}>
      <AuthorLink
        author={book.author} />

      <Card.TextList textList={bookDatesTextList(book)} />
      <Card.Spacer size='large' />

      <ButtonRow>
        <Button
          onClick={onEditClick}
          position="left"
          text="Edit"
          type="info" />
        <Button
          onClick={onDeleteClick}
          text="Delete"
          type="danger" />
        <Button
          onClick={onBackClick}
          position="right"
          text="Back"
          type="light" />
      </ButtonRow>
    </Card>
  );
};

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
