// @flow
import React from 'react';
import { oneOf } from 'prop-types';

import { buildClasses } from '../../../../utils/cssHelpers';

import './styles.css';

type Props = {
  size?: string,
};

const CardSpacer = ({
  size = 'medium',
}: Props) => {
  return (
    <div className={buildClasses(`card__spacer--${size}`)} />
  );
};

CardSpacer.propTypes = {
  size: oneOf(['small', 'medium', 'large']),
};

export default CardSpacer;
