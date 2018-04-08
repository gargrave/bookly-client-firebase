// @flow
import React from 'react';
import { bool, func, oneOf, string } from 'prop-types';

import { buildClasses } from '../../../utils/cssHelpers';

import './styles.css';

type Props = {
  canSubmit?: boolean,
  classes?: string,
  disabled?: boolean,
  onClick: Function,
  position?: string,
  text: string,
  type?: string,
};

const acceptableTypes = [
  'success',
  'secondary',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
];

const acceptablePositions = [
  'left',
  'right',
];

const buttonClass = (type: string) => {
  if (acceptableTypes.includes(type)) {
    return `button-${type}`;
  }
  return '';
};

const positionClass = (position: string) => {
  if (acceptablePositions.includes(position)) {
    return `button--${position}`;
  }
  return '';
};

const buildClassList = (
  type: string,
  position: string,
  classes: string,
) => {
  return buildClasses(
    ['button', positionClass(position)],
    [buttonClass(type), ...classes.split(' ')],
  );
};

const Button = ({
  canSubmit,
  classes = '',
  disabled,
  onClick,
  position = '',
  text,
  type,
}: Props) => {
  return (
    <button
      className={buildClassList(type || '', position, classes)}
      disabled={disabled || false}
      onClick={onClick}
      type={canSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  canSubmit: bool,
  classes: string,
  disabled: bool,
  onClick: func.isRequired,
  position: oneOf(acceptablePositions),
  text: string.isRequired,
  type: oneOf(acceptableTypes),
};

export default Button;
