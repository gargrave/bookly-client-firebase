// @flow
import React from 'react';
import { array, bool, func, shape, string } from 'prop-types';

import type { Author } from '../../../../constants/flowtypes';

import { buildClasses } from '../../../../utils/cssHelpers';

type Props = {
  author: Author,
  authors: Author[],
  disabled: boolean,
  error?: string,
  onChange: Function,
};

const options = (authors: Author[]) => {
  return authors.map((a: Author) => (
    <option key={a.id} value={a.id}>
      {a.firstName} {a.lastName}
    </option>
  ));
};

const AuthorSelect = ({
  author,
  authors,
  disabled,
  error,
  onChange,
}: Props) => {
  return (
    <div className={buildClasses(['input-field'], ['input-field'])}>
      <select
        className="author-select"
        disabled={disabled || false}
        onChange={onChange}
        value={author.id}
      >
        <option value="-1">Select Author...</option>
        {options(authors)}
      </select>

      {error &&
        <p className={buildClasses(['input-field__error'])}>
          {error}
        </p>
      }
    </div>
  );
};

AuthorSelect.propTypes = {
  author: shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  authors: array.isRequired,
  disabled: bool,
  onChange: func.isRequired,
};

export default AuthorSelect;
