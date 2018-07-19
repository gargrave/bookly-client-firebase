// @flow
import React from 'react';
import { func } from 'prop-types';

import { buildClasses } from '../../../../../globals/utils/cssHelpers';

import './ModalBackdrop.css';

type Props = {
  onClick: Function,
};

const ModalFooter = ({
  onClick,
}: Props) => {
  return (
    <div
      className={buildClasses(['modal__backdrop'])}
      onClick={onClick}
    >
    </div>
  );
};

ModalFooter.propTypes = {
  onClick: func,
};

export default ModalFooter;