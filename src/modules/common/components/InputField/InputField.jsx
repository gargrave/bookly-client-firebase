// @flow
import React from 'react'
import { bool, func, number, oneOf, string } from 'prop-types'

import { buildClass } from '../../../../utils/cssHelpers'
import { clamp } from '../../../../utils/mathHelpers'

import styles from './InputField.css'

type Props = {
  boundValue: string,
  disabled?: boolean,
  error?: string,
  label?: string,
  maxLength?: number,
  name: string,
  onInputChange: Function,
  placeholder?: string,
  type?: string,
}

type InputFieldErrorProps = {
  error?: string,
}

const acceptableTypes = ['email', 'password', 'search', 'text']

export const InputFieldError = ({ error }: InputFieldErrorProps) => (
  <p className={styles.error}>{error}</p>
)

const InputField = ({
  boundValue,
  disabled,
  error,
  label,
  maxLength = 255,
  name,
  onInputChange,
  placeholder,
  type,
}: Props) => {
  return (
    <div className="input-field">
      {label && <label htmlFor={name}>{label}:</label>}

      <input
        className={buildClass({ [styles.invalid]: !!error })}
        disabled={disabled || false}
        id={name}
        maxLength={clamp(maxLength, 1, 255)}
        name={name}
        onChange={onInputChange}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={boundValue}
      />

      {error && <InputFieldError error={error} />}
    </div>
  )
}

InputField.propTypes = {
  boundValue: string.isRequired,
  disabled: bool,
  error: string,
  maxLength: number,
  label: string,
  name: string.isRequired,
  onInputChange: func.isRequired,
  placeholder: string,
  type: oneOf(acceptableTypes),
}

export default InputField
