// @flow
import React from 'react';
import { array, date, func, object, shape, string } from 'prop-types';

import type { Author, Book } from '../../../../constants/flowtypes';

import BookForm from '../BookForm';
import Card from '../../../common/Card';

type Props = {
  authors: Author[],
  book: Book,
  onAuthorChange: Function,
  onCancel: Function,
  onInputChange: Function,
  onSubmit: Function,
};

function BookEditView({
  authors,
  book,
  onAuthorChange,
  onCancel,
  onInputChange,
  onSubmit,
}: Props) {
  return (
    <div className="book-edit-view">
      <Card
        classes={['card--top-margin-med']}
        header={"Update Book"}
        hoverable={false}
      >
        <BookForm
          authors={authors}
          book={book}
          onAuthorChange={onAuthorChange}
          onCancel={onCancel}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
        />
      </Card>
    </div>
  );
}

BookEditView.propTypes = {
  authors: array.isRequired,
  book: shape({
    id: string,
    title: string,
    author: object,
    created: date,
    updated: date,
  }),
  onAuthorChange: func.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
  onCancel: func.isRequired,
};

export default BookEditView;
