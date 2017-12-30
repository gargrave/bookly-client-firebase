// @flow
import React from 'react';
import { array, func, string } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

import Alert from '../../../common/Alert/';
import AuthorListDetail from '../AuthorListDetail';

type Props = {
  authors: Author[],
  filterBy?: string,
  onAuthorClick: Function,
};

function filterAuthor(author: Author, filterBy?: string = '') {
  if (!filterBy) {
    return true;
  }
  const name = `${author.firstName} ${author.lastName}`.toLowerCase();
  return name.includes(filterBy);
}

function authorList(
  authors: Author[],
  onAuthorClick: Function,
  filterBy?: string,
) {
  return (
    <div>
      {authors
        .filter((a: Author) => filterAuthor(a, filterBy))
        .map((author) =>
          <AuthorListDetail
            author={author}
            key={author.id}
            onClick={onAuthorClick.bind(null, author.id)}
          />
        )
      }
    </div>
  );
}

function noAuthorsMessage() {
  return (
    <Alert
      message={'No Authors created yet!'}
      type={'info'}
    />
  );
}

function AuthorList({
  authors,
  filterBy,
  onAuthorClick,
}: Props) {
  return (
    authors.length
      ? authorList(authors, onAuthorClick, filterBy)
      : noAuthorsMessage()
  );
}

AuthorList.propTypes = {
  authors: array.isRequired,
  filterBy: string,
  onAuthorClick: func.isRequired,
};

export default AuthorList;
