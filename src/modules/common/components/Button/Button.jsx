// @flow
import React from 'react'
import { bool, func, oneOf, string } from 'prop-types'
import styled from 'react-emotion'

import { buildClass } from '../../../../utils/cssHelpers'

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

const StyledButton = styled('button')`
  height: 2.15rem;
  line-height: 2rem;
  margin-left: 10px;
  padding: 0 8px;

  &.left {
    margin-left: 0;
  }

  &.right {
    margin-left: auto;
  }
`

const Button = ({
  canSubmit,
  disabled,
  onClick,
  position = '',
  text,
  type = '',
}: Props) => (
  <StyledButton
    className={buildClass('button', position, { [`button-${type}`]: !!type })}
    disabled={disabled || false}
    onClick={onClick}
    type={canSubmit ? 'submit' : 'button'}
  >
    {text}
  </StyledButton>
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
