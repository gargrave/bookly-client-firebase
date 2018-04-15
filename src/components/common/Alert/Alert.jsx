// @flow
import React from 'react';
import { any, oneOf, string } from 'prop-types';

import { buildClasses } from '../../../globals/utils/cssHelpers';

type Props = {
  children?: any,
  message: string,
  type: string,
};

const Alert = ({
  children,
  message,
  type,
}: Props) => (
  <div className={buildClasses('alert', ['alert', `alert-${type}`])}>
    {message}
    {children}
  </div>
);

Alert.propTypes = {
  children: any,
  message: string.isRequired,
  type: oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ]).isRequired,
};

export default Alert;
