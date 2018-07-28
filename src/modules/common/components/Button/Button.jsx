// @flow
import React from 'react';
import { bool, func, oneOf, string } from 'prop-types';

import {
  POSITIONS,
  TYPES,
} from './constants';

import {
  buildClassList,
} from './helpers';

import './Button.css';

type Props = {
  canSubmit?: boolean,
  classes?: string,
  disabled?: boolean,
  onClick: Function,
  position?: string,
  text: string,
  type?: string,
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
      className={buildClassList(
        type || '', position, classes
      )}
      disabled={disabled || false}
      onClick={onClick}
      type={canSubmit ? 'submit' : 'button'}>
      {text}
    </button>
  );
};

Button.propTypes = {
  canSubmit: bool,
  classes: string,
  disabled: bool,
  onClick: func.isRequired,
  position: oneOf(POSITIONS),
  text: string.isRequired,
  type: oneOf(TYPES),
};

export default Button;
