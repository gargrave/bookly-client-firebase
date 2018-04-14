// @flow
import React from 'react';
import { func, instanceOf, oneOfType, shape, string } from 'prop-types';
import { format } from 'date-fns';

import type { Author } from '../../../../../globals/flowtypes';

import Button from '../../../../common/Button';
import ButtonRow from '../../../../common/ButtonRow';
import Card from '../../../../common/Card';
import CardSpacer from '../../../../common/Card/CardSpacer';
import CardTextList from '../../../../common/Card/CardTextList';

type Props = {
  author: Author,
  onBackClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
};

const authorDatesTextList = (author: Author) => {
  const {
    created,
    updated,
  } = author;

  return [
    { title: 'Added', value: format(created, 'MMM. DD, YYYY, HH:mm:ss') },
    { title: 'Updated', value: format(updated, 'MMM. DD, YYYY, HH:mm:ss') },
  ];
};

const AuthorDetailCard = ({
  author,
  onBackClick,
  onDeleteClick,
  onEditClick,
}: Props) => {
  return (
    <Card
      classes={['detail-card', 'author-detail-card']}
      header={`${author.firstName} ${author.lastName}`}
      hoverable={false}
    >
      <CardSpacer />
      <CardTextList textList={authorDatesTextList(author)} />
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

AuthorDetailCard.propTypes = {
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
};

export default AuthorDetailCard;
