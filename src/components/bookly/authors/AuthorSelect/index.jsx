// @flow
import React from 'react';
import { array, bool, func, object } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

type Props = {
  author: Author,
  authors: Author[],
  disabled: boolean,
  onChange: Function,
};

function options(authors: Author[]) {
  return authors.map((a: Author) => (
    <option key={a.id} value={a.id}>
      {a.firstName} {a.lastName}
    </option>
  ));
}

function AuthorSelect({
  author,
  authors,
  disabled,
  onChange,
}: Props) {
  return (
    <div className="input-field">
      <select
        className="author-select"
        disabled={disabled || false}
        onChange={onChange}
        value={author.id}
      >
        <option value="-1">Select Author...</option>
        {options(authors)}
      </select>
    </div>
  );
}

AuthorSelect.propTypes = {
  author: object.isRequired,
  authors: array.isRequired,
  disabled: bool,
  onChange: func.isRequired,
};

export default AuthorSelect;
