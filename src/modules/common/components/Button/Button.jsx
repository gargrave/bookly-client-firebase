// @flow
import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'

import { buildClass } from '../../../../utils/cssHelpers'

import styles from './Button.css'

export const POSITIONS = ['left', 'right']

export const TYPES = [
  'success',
  'secondary',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
]

type Props = {
  canSubmit?: boolean,
  disabled?: boolean,
  onClick: Function,
  position?: string,
  text: string,
  type?: string,
}

const Button = ({
  canSubmit,
  disabled,
  onClick,
  position = '',
  text,
  type = '',
}: Props) => (
  <button
    className={buildClass(
      styles.button,
      { [styles[position]]: !!position },
      'button',
      { [`button-${type}`]: !!type },
    )}
    disabled={disabled || false}
    onClick={onClick}
    type={canSubmit ? 'submit' : 'button'}
  >
    {text}
  </button>
)

Button.propTypes = {
  canSubmit: bool,
  disabled: bool,
  onClick: func.isRequired,
  position: oneOf(POSITIONS),
  text: string.isRequired,
  type: oneOf(TYPES),
}

export default Button
