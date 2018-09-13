// @flow
import React from 'react'
import { array, bool, func, shape, string } from 'prop-types'

import type { Author } from '../../flowtypes'

import styles from './AuthorSelect.css'

type Props = {
  author: Author,
  authors: Author[],
  disabled: boolean,
  error?: string,
  onChange: Function,
}

const options = (authors: Author[]) =>
  authors.map((a: Author) => (
    <option key={a.id} value={a.id}>
      {a.firstName} {a.lastName}
    </option>
  ))

const AuthorSelect = ({
  author,
  authors,
  disabled,
  error,
  onChange,
}: Props) => {
  return (
    <div className="input-field">
      <label htmlFor="">Author:</label>
      <select
        disabled={disabled || false}
        name="authorSelect"
        onChange={onChange}
        value={author.id}
      >
        <option value="-1">Select Author...</option>
        {options(authors)}
      </select>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

AuthorSelect.propTypes = {
  author: shape({
    id: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  authors: array.isRequired,
  disabled: bool,
  onChange: func.isRequired,
}

export default AuthorSelect
