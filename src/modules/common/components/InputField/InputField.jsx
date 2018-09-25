// @flow
import React from 'react'
import { bool, func, number, oneOf, string } from 'prop-types'
import styled from 'react-emotion'

import { colors } from '../../../../styles'
import { clamp } from '../../../../utils/mathHelpers'

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

const acceptableTypes = ['email', 'password', 'search', 'text']

const StyledInput = styled('input')`
  border-color: ${props => props.invalid && colors.error} !important;
`

const StyledError = styled('p')`
  color: ${colors.error};
`

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

      <StyledInput
        disabled={disabled || false}
        id={name}
        invalid={!!error}
        maxLength={clamp(maxLength, 1, 255)}
        name={name}
        onChange={onInputChange}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={boundValue}
      />

      {error && <StyledError className="error">{error}</StyledError>}
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
