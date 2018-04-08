// @flow
import React from 'react';
import { bool, func, oneOf, string } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import './styles.css';

type Props = {
  boundValue: string,
  disabled?: boolean,
  error?: string,
  label?: string,
  name: string,
  onInputChange: Function,
  placeholder?: string,
  type?: string,
};

const acceptableTypes = [
  'email',
  'password',
  'search',
  'text',
];

const InputField = ({
  boundValue,
  disabled,
  error,
  label,
  name,
  onInputChange,
  placeholder,
  type,
}: Props) => {
  return (
    <div className={buildClasses(['input-field'], ['input-field'])}>
      {label && <label htmlFor={name}>{label}:</label>}

      <input
        className={buildClasses(['input-field__input', !!error ? 'input-field__input--invalid' : ''])}
        disabled={disabled || false}
        id={name}
        name={name}
        onChange={onInputChange}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={boundValue}
      />

      {error &&
        <p className={buildClasses(['input-field__error'])}>
          {error}
        </p>
      }
    </div>
  );
};

InputField.propTypes = {
  boundValue: string.isRequired,
  disabled: bool,
  error: string,
  label: string,
  name: string.isRequired,
  onInputChange: func.isRequired,
  placeholder: string,
  type: oneOf(acceptableTypes),
};

export default InputField;
