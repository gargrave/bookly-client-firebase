// @flow
import React from 'react';
import { oneOf, string } from 'prop-types';

import { buildClasses } from '../../../globals/utils/cssHelpers';

type Props = {
  message: string,
  type: string,
};

const Alert = ({
  message,
  type,
}: Props) => (
  <div className={buildClasses('alert', ['alert', `alert-${type}`])}>
    {message}
  </div>
);

Alert.propTypes = {
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
