// @flow
import React, { Fragment } from 'react';
import { array, func, string } from 'prop-types';

import type { Book } from '../../../../../globals/flowtypes';

import Alert from '../../../../common/Alert/Alert';
import BookList from '../../../../bookly/books/BookList';
import InputField from '../../../../common/InputField';

type Props = {
  books: Book[],
  onBookClick: Function,
  onInputChange: Function,
  searchValue: string,
};

const BooksListVerified = ({
  books,
  onBookClick,
  onInputChange,
  searchValue,
}: Props) => {
  return (
    <Fragment>
      <InputField
        boundValue={searchValue}
        name="searchValue"
        onInputChange={onInputChange}
        placeholder={'Filter by title...'}
        type="search"
      />
      {searchValue &&
        <Alert
          message={`Showing results matching "${searchValue}"`}
          type="info"
        />
      }
      <BookList
        books={books}
        filterBy={searchValue}
        onBookClick={onBookClick}
        groupBooksByAuthor={true}
      />
    </Fragment>
  );
};

BooksListVerified.propTypes = {
  books: array,
  onBookClick: func.isRequired,
  onInputChange: func.isRequired,
  searchValue: string,
};

export default BooksListVerified;
