// @flow
import React from 'react';
import { array, object, oneOfType } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './ButtonRow.css';

type Props = {
  children?: any,
};

const ButtonRow = ({
  children,
}: Props) => {
  return (
    <div className={buildClasses('button-row')}>
      {children}
    </div>
  );
};

ButtonRow.propTypes = {
  children: oneOfType([array, object]),
};

export default ButtonRow;
